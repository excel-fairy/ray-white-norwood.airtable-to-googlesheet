var DATA_SHEET = {
    name: 'Data',
    sheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data'),
    apiKeyCell: 'B2',
    trafficLightDraftIdCell: 'B4',
    trafficLightDraftTableNameCell: 'C4',
    trafficLightDraftViewNameCell: 'D4',
    hotListAccuracyIdCell: 'B5',
    hotListAccuracyTableNameCell: 'C5',
    hotListAccuracyViewNameCell: 'D5'
};

var TRAFFIC_LIGHT_DRAFT_SHEET = {
    name: 'Traffic light draft',
    sheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Traffic light draft'),
    topLeftImportCell: 'A2'
};

var HOT_LIST_ACCURACY_SHEET = {
    name: 'Hot list accuracy',
    sheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hot list accuracy'),
    topLeftImportCell: 'A2'
};

