Ext.define('Module.Store.StoreShop.store.ShopModuleBillingStore', {
    extend    : 'Ext.data.Store',
    requires  : [],
    model     : 'Module.Store.StoreShop.model.ShopModelBilling',
    storeId   : 'Module.Store.StoreShop.store.ShopModuleBillingStore',
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
            read: '/storeapi/shop/module/billing/'
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