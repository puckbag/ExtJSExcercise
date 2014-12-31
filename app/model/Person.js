Ext.define('ExtJSExercise.model.Person', {
    extend: 'ExtJSExercise.model.Base',
    fields: [
        'name',
        'nickname',
        {name: 'birthdate', type: 'date'},
        'isEmployee',
        {name: 'startdate', type: 'date'},
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
