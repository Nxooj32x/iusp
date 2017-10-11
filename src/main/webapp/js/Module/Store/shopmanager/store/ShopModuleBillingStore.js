Ext.define('Module.Store.shopmanager.store.ShopModuleBillingStore', {
    singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [],
    model     : 'Module.Store.shopmanager.model.ShopModelBilling',
    storeId   : 'Module.Store.shopmanager.store.ShopModuleBillingStore',
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