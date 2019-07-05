function onOpen() {
    MAIN_SHEET.sheet.getRange(MAIN_SHEET.exportButtonCell).setValue(false);
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Run scripts')
        .addItem('Import tables', 'importTables')
        .addToUi();
}
