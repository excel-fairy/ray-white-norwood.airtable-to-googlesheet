/**
 * Import all tables
 */
function importAllTables() {
    importHotListAccuracy();
    importTrafficLightDraft();
}

/**
 * Import the hot list accuracy table
 */
function importHotListAccuracy() {
    importTable("hotListAccuracy")
}

/**
 * Import the hot list accuracy table
 */
function importTrafficLightDraft() {
    importTable("trafficLightDraft")
}

/**
 * Import a table
 * @param sourceName Name of the table as defined in the data sheet
 */
function importTable(sourceName) {
    var databaseId = DATA_SHEET.sheet.getRange(DATA_SHEET[sourceName].databaseIdCell).getValue();
    var tableName = DATA_SHEET.sheet.getRange(DATA_SHEET[sourceName].tableNameCell).getValue();
    var viewName = DATA_SHEET.sheet.getRange(DATA_SHEET[sourceName].viewNameCell).getValue();
    var topLeftCellCol = DATA_SHEET.sheet.getRange(DATA_SHEET[sourceName].topLeftCellCol).getValue();
    var topLeftCellRow = DATA_SHEET.sheet.getRange(DATA_SHEET[sourceName].topLeftCellRow).getValue();
    var importSheet = DATA_SHEET[sourceName].importSheet;


    var url = 'https://api.airtable.com/v0/'
        + databaseId + '/' + tableName
        + '?view=' + encodeURIComponent(viewName)
        + '&maxRecords=100'
        + '&pageSize=100';

    var records = [];

    var response = fetchData(url)
    do {
        records = records.concat(response.records);
        response = fetchData(url, response.offset);
        // Pause execution for 6 seconds (5 seconds API rate limitting)
        Utilities.sleep(6000);
    } while (response.offset);


    var dataToWrite = buildOutputTable(records);

    var topLeftCellColNumber = ColumnNames.letterToColumn(topLeftCellCol);

    // Empty all cells within the range starting from the top left cell for imports and ending 100 rows and 100 lines after end of range currently importing
    var cleanRange = importSheet.getRange(topLeftCellRow, topLeftCellColNumber, dataToWrite.length + 100, dataToWrite[0].length + 100);
    cleanRange.clear();

    var importRange = importSheet.getRange(topLeftCellRow, topLeftCellColNumber, dataToWrite.length, dataToWrite[0].length);
    importRange.setValues(dataToWrite);
}

/**
 * Fetch airtable table content
 * @param url request URL
 * @param offset Request offset
 * @returns {response: Array, offset: String}
 */
function fetchData(url, offset) {
    var airtableApiKey = DATA_SHEET.sheet.getRange(DATA_SHEET.apiKeyCell).getValue();
    var options = {
        headers: {
            Authorization: "Bearer " + airtableApiKey
        }
    };
    if(offset)
        url += "&offset=" + offset;
    var response = JSON.parse(UrlFetchApp.fetch(url, options));
    return response;
}

/**
 * Get columns of records (list of record)
 * @param records
 * @returns List of column names
 */
function getColumns(records) {
    var retVal = [];
    for (var i = 0; i < records.length; i++) {
        var keys = Object.keys(records[i].fields);
        for (var j = 0; j < keys.length; j++) {
            var key = keys[j];
            if(retVal.indexOf(key) === -1){
                retVal.push(key);
            }
        }
    }
    return retVal;
}

/**
 * Get te value of a field of a record
 * @param record
 * @param fieldName
 */
function getField(record, fieldName) {
    return record[fieldName];
}

/**
 * Build output table
 * @param records
 */
function buildOutputTable(records) {
    var retVal = [];
    var columns = getColumns(records);
    retVal[0] = columns;
    for(var i = 0; i < records.length; i++) {
        retVal[i+1] = [];
        var record = records[i].fields;
        for (var j = 0; j <columns.length; j++) {
            var column = columns[j];
            if (record.hasOwnProperty(column)) {
                retVal[i+1][getIndexOfKey(columns, column)] = getField(record, column);
            }
            else {
                retVal[i+1][getIndexOfKey(columns, column)] = null;
            }
        }
    }
    return retVal;
}

/**
 * Get the index of the column given it's name
 * @param columns
 * @param key column name
 * @returns {number}
 */
function getIndexOfKey(columns, key){
    return columns.indexOf(key);
}
