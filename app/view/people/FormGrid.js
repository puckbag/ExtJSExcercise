Ext.define('ExtJSExcercise.view.people.FormGrid', {
    extend: 'Ext.form.Panel',
    xtype: 'people-formgrid',
    
    requires: [
        'Ext.grid.*',
        'Ext.form.*',
        'Ext.layout.container.Column',
        'ExtJSExcercise.model.Person',
        'ExtJSExcercise.view.people.GridPanel',
        'ExtJSExcercise.view.people.Form'
    ],

    frame: true,
    title: 'People',
    autoScroll: true,
    // layout: 'column',

    initComponent: function () {
        Ext.apply(this, {
            items: [{
                xtype: 'people-form',
                bodyPadding: 5,
                columnWidth: 0.33
            }, {
                xtype: 'panel',
                bodyPadding: 5,
                columnWidth: 0.67,
                items: [{
                    xtype: 'people-gridpanel',
                    listeners: {
                        scope: this,
                        selectionchange: this.onSelectionChange
                    }
                }]
            }]
        });
        this.callParent();
    },

    onSelectionChange: function (model, records) {
        var peopleform = this.down('people-form');
        var form = peopleform.getForm();
        var formvalues = form.getFieldValues();
        var prop;
        var rec;
        if (records.length) {
            if (rec = records[0]) {
                form.loadRecord(rec);
                form.isValid();
                peopleform.showUpdateButtons();
            }
        } else {
            // necessary to reset to new because of trackResetOnLoad:true
            for (prop in formvalues) {
                formvalues[prop] = '';
            }
            rec = Ext.create('ExtJSExcercise.model.Person', formvalues);
            form.loadRecord(rec);
            form.reset();
            peopleform.showCreateButtons();
        }
    }

});
