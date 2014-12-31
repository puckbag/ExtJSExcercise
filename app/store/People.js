Ext.define('ExtJSExercise.store.People', {
    extend: 'Ext.data.Store',
    model: 'ExtJSExercise.model.Person',
    autoLoad: true,
    autoSync: true,
    pageSize: 10
});