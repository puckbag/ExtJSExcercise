Ext.define('ExtJSExcercise.store.People', {
    extend: 'Ext.data.Store',
    model: 'ExtJSExcercise.model.Person',
    autoLoad: true,
    autoSync: true,
    pageSize: 10
});