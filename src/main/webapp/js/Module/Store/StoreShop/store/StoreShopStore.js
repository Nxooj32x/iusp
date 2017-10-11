Ext.define('Module.Store.StoreShop.store.StoreShopStore', {
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Store.StoreShop.model.StoreShopModel',
    ],
    
    model     : 'Module.Store.StoreShop.model.StoreShopModel',
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