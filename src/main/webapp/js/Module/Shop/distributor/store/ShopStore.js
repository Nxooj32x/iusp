Ext.define('Module.Shop.distributor.store.ShopStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Shop.distributor.model.ShopModel',
    ],
    
    model     : 'Module.Shop.distributor.model.ShopModel',
    storeId   : 'Module.Shop.distributor.store.ShopStore',
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
               // Soul.util.MessageUtil.parseResponse(response);
            }
        }
    }, 
    remoteSort: true,
    listeners:{
        load : function(store, records, successful, operation, eOpts){
        	/*Ext.each(records, function(record, index, itself){
				var Dictionary = record.data;
				//Module.Shop.distributor.Operation.getOperationForDictionary(Dictionary);
			});*/
        }
    }
});