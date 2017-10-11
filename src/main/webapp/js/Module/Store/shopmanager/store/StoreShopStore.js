Ext.define('Module.Store.shopmanager.store.StoreShopStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Store.shopmanager.model.StoreShopModel',
    ],
    
    model     : 'Module.Store.shopmanager.model.StoreShopModel',
    storeId   : 'Module.Store.shopmanager.store.StoreShopStore',
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
        	read: '/storeapi/server/shop/'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty : 'total'
        },
        listeners:{
            exception:function( theproxy, response, operation, options ){
            	//Soul.util.MessageUtil.parseResponse(response);
            }
        }
    },
    remoteSort: true,
    listeners:{}
});