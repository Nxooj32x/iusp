Ext.define('Module.CustomModule.modulemanager.model.ModuleModel', {
    extend : 'Ext.data.Model',
    fields : [{
        name : 'id',
        mapping : 'id'
    },{
        name : 'name',
        mapping : 'name'
    },{
        name : 'code',
        mapping : 'code'
    },{
        name : 'logo',
        mapping : 'logo'
    },{
        name : 'type',
        mapping : 'type'
    },{
        name : 'defaultBillingWay',
        mapping : 'defaultBillingWay.id'
    },{
        name : 'useNum',
        mapping : 'useNum'
    },{
        name : 'utime',
        mapping : 'utime'
    },{
        name : 'ctime',
        mapping : 'ctime'
    },{
        name : 'status',
        mapping : 'status'
    },{
        name : 'createUserId',
        mapping : 'createUserId'
    },{
        name : 'description',
        mapping : 'description'
    },{
        name : 'showInShop',
        mapping : 'showInShop'
    }]
});

