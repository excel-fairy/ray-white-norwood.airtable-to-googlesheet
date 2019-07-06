function importTables() {
    var airtableApiKey = DATA_SHEET.sheet.getRange(DATA_SHEET.apiKeyCell).getValue();
    var trafficLightDraftId = DATA_SHEET.sheet.getRange(DATA_SHEET.trafficLightDraftIdCell).getValue();
    var trafficLightDraftTableName = DATA_SHEET.sheet.getRange(DATA_SHEET.trafficLightDraftTableNameCell).getValue();
    var trafficLightDraftViewName = DATA_SHEET.sheet.getRange(DATA_SHEET.trafficLightDraftViewNameCell).getValue();

    // var Airtable = require('airtable');
    // var base = new Airtable({apiKey: airtableApiKey}).base(trafficLightDraftId);
    //
    // base('Database').select({
    //     view: 'All Agents'
    // }).all(function(err, records) {
    //     console.log("err: " + err);
    //     console.log("records: " + records);
    // });


    var url = 'https://api.airtable.com/v0/'
        + trafficLightDraftId + '/' + trafficLightDraftTableName
        + '?maxRecords=10'
        + '&view=' + encodeURIComponent(trafficLightDraftViewName);
    var options = {
        headers : {
            Authorization: "Bearer " + airtableApiKey
        }
    };

    var response = UrlFetchApp.fetch(url, options);
    console.log(response);
}
