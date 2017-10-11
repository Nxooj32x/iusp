Ext.define('Module.Store.StoreOwner.store.StoreOwnerStore', {
    extend    : 'Ext.data.Store',
    requires  : [
        ''
    ],

    model     : 'Module.Store.StoreOwner.model.StoreOwnerModel',
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
            read: '/storeapi/server/'
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