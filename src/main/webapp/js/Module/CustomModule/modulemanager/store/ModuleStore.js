Ext.define('Module.CustomModule.modulemanager.store.ModuleStore', {
    singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
        'Module.Operate.isay.model.ISayTopicModel'
    ],

    model     : 'Module.CustomModule.modulemanager.model.ModuleModel',
    storeId   : 'Module.CustomModule.modulemanager.store.ModuleStore',
    proxy: {
        type: 'rest',
        headers : {
            "Content-Type": "application/json; charset=utf-8",
            Accept : 'application/json'
        },
        extraParams : {
            filter : {}
        },
        api: {
            read: '/api/admin/module/'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty : 'total'
        },
        listeners:{
            exception:function( theproxy, response, operation, options ){
                Soul.util.MessageUtil.parseResponse(response);
            }
        }
    },
    remoteSort: true,
    listeners:{}
});