Ext.define('ExtJSExcercise.view.people.FieldSet', {
    extend: 'Ext.form.FieldSet',
    xtype: 'people-fieldset',

    requires: [
        'Ext.form.*',
        'Ext.layout.container.Column',
        'ExtJSExcercise.model.Person'
    ],

    defaultType: 'textfield',

    items: [{
        fieldLabel: 'Name',
        name: 'name',
        allowBlank: false
    }, {
        fieldLabel: 'Nickname',
        name: 'nickname',
        allowBlank: false
    }, {
        xtype: 'datefield',
        anchor: '100%',
        fieldLabel: 'Birth Date',
        name: 'birthdate',
        maxValue: new Date(),
        format: 'Y-m-d',
        allowBlank: false
    }, {
        xtype: 'fieldcontainer',
        // fieldLabel: '',
        defaultType: 'checkboxfield',
        items: [{
            boxLabel  : 'Is Employee',
            name      : 'isEmployee',
            inputValue: '1',
            handler: function (field, value) {
                var fieldset = this.up('people-fieldset');
                fieldset.displayJobFields(value);
            }
        }]
    }, {
        xtype: 'datefield',
        anchor: '100%',
        fieldLabel: 'Start Date',
        name: 'startdate',
        maxValue: new Date(),
        format: 'Y-m-d',
        disabled: true
    }, {
        fieldLabel: 'Job Title',
        name: 'jobtitle',
        disabled: true
    }],

    displayJobFields: function (value) {
        var jobfields = this.query('[name=startdate], [name=jobtitle]');
        if (value) {
            jobfields.forEach(function (c) {
                c.setDisabled(false);
                c.allowBlank = false;
            });
        } else {
            jobfields.forEach(function (c) {
                c.setDisabled(true);
                c.setValue('');
                c.allowBlank = true;
            });
        }
    }

});