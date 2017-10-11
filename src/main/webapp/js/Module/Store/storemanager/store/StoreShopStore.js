Ext.define('Module.Store.storemanager.store.StoreshopStore', {
    singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
        'Module.Store.storemanager.model.StoreShopModel',
    ],

    model     : 'Module.Store.storemanager.model.StoreShopModel',
    storeId   : 'Module.Store.storemanager.store.StoreshopStore',
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
            read: ''
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
    listeners:{
        load : function(store, records, successful, operation, eOpts){
            Ext.each(records, function(record, index, itself){
                var store = record.data;
                Module.Store.storemanager.Operation.getOperationForStore(store);
            });
        }
    }
});