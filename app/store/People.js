// TODO: find a better way to refresh the grid on store update.
//       this is necessary because the grid grows outside the container
//       if a rows height expands.

Ext.define('ExtJSExercise.store.People', {
    extend: 'Ext.data.Store',
    model: 'ExtJSExercise.model.Person',
    autoLoad: true,
    autoSync: true,
    pageSize: 10,

    onCreateRecords: function(records, operation, success) {
        var gridpanel = Ext.ComponentQuery.query('people-gridpanel');
        if (gridpanel.length) {
            gridpanel[0].getView().refresh();
        }
    },

    onUpdateRecords: function(records, operation, success) {
        var gridpanel = Ext.ComponentQuery.query('people-gridpanel');
        if (gridpanel.length) {
            gridpanel[0].getView().refresh();
        }
    },

    onDestroyRecords: function(records, operation, success) {
        var gridpanel = Ext.ComponentQuery.query('people-gridpanel');
        if (gridpanel.length) {
            gridpanel[0].getView().refresh();
        }
    }

});