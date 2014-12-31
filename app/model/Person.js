Ext.define('ExtJSExercise.model.Person', {
    extend: 'ExtJSExercise.model.Base',
    fields: [
        'name',
        'nickname',
        {name: 'birthdate', type: 'date', dateFormat: 'Y-m-d'},
        'isEmployee',
        {name: 'startdate', type: 'date', dateFormat: 'Y-m-d'},
        'jobtitle'
        ],
    proxy: {
        type: 'rest',
        url : '/api/people',
        reader: {
            rootProperty: 'rows',
            totalProperty: 'count'
        },
        writer: {
            writeAllFields: false
        }
    }
});
