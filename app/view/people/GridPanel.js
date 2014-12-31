Ext.define('ExtJSExercise.view.people.GridPanel', {
    extend: 'Ext.grid.Panel',
    xtype: 'people-gridpanel',
    allowDeselect: true,

    columns: [{
        text: 'ID',
        dataIndex: 'id'
    }, {
        text: 'Name<br><em>job title</em>',
        flex: 1,
        xtype: 'templatecolumn',
        tpl: '{name}<br><em>{jobtitle}</em>'
    }, {
        text: 'Nickname',
        dataIndex: 'nickname'
    }, {
        text: 'Birth Date',
        dataIndex: 'birthdate',
        xtype: 'datecolumn',
        format: 'Y-m-d'
    }, {
        text: 'Is Employee',
        dataIndex: 'isEmployee'
    }, {
        text: 'Start Date',
        dataIndex: 'startdate',
        xtype: 'datecolumn',
        format: 'Y-m-d'
    }],

    initComponent: function () {
        Ext.apply(this, {
            store: Ext.getStore('People'),
            dockedItems: [{
                xtype: 'pagingtoolbar',
                store: Ext.getStore('People'),
                dock: 'top',
                displayInfo: true
            }]
        });
        this.callParent();
    }

});