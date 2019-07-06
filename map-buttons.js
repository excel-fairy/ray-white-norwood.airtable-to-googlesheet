function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Run scripts')
        .addItem('Import tables', 'importTables')
        .addToUi();
}
