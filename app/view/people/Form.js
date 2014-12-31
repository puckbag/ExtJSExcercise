// TODO: use create/update cls selectors for buttons, rather than itemIds

Ext.define('ExtJSExercise.view.people.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'people-form',
    trackResetOnLoad: true,

    requires: [
        'Ext.form.*',
        'Ext.layout.container.Column',
        'ExtJSExercise.model.Person',
        'ExtJSExercise.view.people.FieldSet'
    ],

    items: [{
        xtype: 'people-fieldset',
        title: 'Form',
        layout: 'anchor'                    
    }],

    buttons: [{
        text: 'Create',
        hidden: false,
        itemId: 'create-button',
        handler: function () {
            var peopleform = this.up('people-form');
            var formgrid = this.up('people-formgrid');
            var form = peopleform.getForm();
            var grid = formgrid.down('people-gridpanel');
            var values = form.getFieldValues();
            var valid = form.isValid();
            if (valid) {
                // add new record to store
                grid.store.insert(0, 
                    Ext.create('ExtJSExercise.model.Person', values));
                grid.store.loadPage(1, {
                    scope: this,
                    callback: function (records, operation, success) {
                        var record = records[0];
                        Ext.Msg.alert('Create Status', 'New record created.');
                        // reload created record to form
                        form.loadRecord(record);
                        // select new record in grid
                        grid.getView().select(record, false, true);
                        // switch buttons
                        peopleform.showUpdateButtons();
                    }
                });
            }
        }
    }, {
        text: 'Update',
        hidden: true,
        itemId: 'update-button',
        handler: function () {
            var form = this.up('people-form').getForm();
            var record = form.getRecord();
            var valid = form.isValid();
            if (record && valid) {
                form.updateRecord(record);
                Ext.Msg.alert('Update Status', 'Existing record updated.');
            }
        }
    }, {
        text: 'Unload',
        hidden: true,
        itemId: 'unload-button',
        handler: function () {
            var formgrid = this.up('people-formgrid');
            var form = this.up('people-form').getForm();
            var grid = formgrid.down('people-gridpanel');
            grid.getSelectionModel().deselectAll();
        }
    }, {
        text: 'Delete',
        hidden: true,
        itemId: 'delete-button',
        handler: function () {
            var peopleform = this.up('people-form');
            var form = peopleform.getForm();
            var record = form.getRecord();
            if (record) {
                Ext.Msg.confirm(
                    'Delete Record',
                    'Are you sure you want to delete this record?',
                    function (buttonId, text, opt) {
                        if (buttonId == 'yes') {
                            peopleform.recordErase(record);
                        }
                    }
                );
            }
        }
    }, {
        text: 'Reset',
        itemId: 'reset-button',
        handler: function () {
            var form = this.up('people-form').getForm();
            form.reset();
        }
    }, {
        text: 'Validate',
        itemId: 'validate-button',
        handler: function () {
            var form = this.up('people-form').getForm();
            var valid = form.isValid();
            if (valid) {
                console.log(form.getFieldValues());
            }
        }
    }],

    getCreateButtons: function () {
        return this.query('#create-button');

    },

    getUpdateButtons: function () {
        return this.query('#unload-button, #delete-button, #update-button');
    },

    showCreateButtons: function () {
        var create = this.getCreateButtons();
        var update = this.getUpdateButtons();
        create.forEach(function(c){c.show();});
        update.forEach(function(c){c.hide();});
    },

    showUpdateButtons: function () {
        var create = this.getCreateButtons();
        var update = this.getUpdateButtons();
        create.forEach(function(c){c.hide();});
        update.forEach(function(c){c.show();});
    },

    recordErase: function (record) {
        var peopleform = this;
        record.erase({
            callback: function (records, operation, success) {
                var formgrid = peopleform.up('people-formgrid');
                var grid = formgrid.down('people-gridpanel');
                if (success) {
                    Ext.Msg.alert('Delete Status', 'Existing record deleted.');
                    grid.store.loadPage(grid.store.currentPage);
                } else {
                    Ext.Msg.alert('Delete Status', 'Existing record deletion failed.');
                }
            }
        });
    }

});