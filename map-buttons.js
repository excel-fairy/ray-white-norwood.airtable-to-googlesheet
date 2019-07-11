function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Run scripts')
        .addItem('Import all tables', 'importAllTables')
        .addItem('Import "Traffic light draft" table', 'importTrafficLightDraft')
        .addItem('Import "Hot list accuracy" table', 'importHotListAccuracy')
        .addToUi();
}
