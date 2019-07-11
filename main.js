var DATA_SHEET = {
    name: 'Data',
    sheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data'),
    apiKeyCell: 'B2',
    trafficLightDraft: {
        importSheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Traffic light draft'),
        databaseIdCell: 'B4',
        tableNameCell: 'C4',
        viewNameCell: 'D4',
        topLeftCellCol: 'E4',
        topLeftCellRow: 'F4'
    },
    hotListAccuracy: {
        importSheet: SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Hot list accuracy'),
        databaseIdCell: 'B5',
        tableNameCell: 'C5',
        viewNameCell: 'D5',
        topLeftCellCol: 'E5',
        topLeftCellRow: 'F5'
    }
};
