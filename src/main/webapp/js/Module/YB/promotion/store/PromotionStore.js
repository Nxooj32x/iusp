Ext.define('Module.YB.promotion.store.PromotionStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.YB.promotion.model.PromotionModel'
    ],
    
    model     : 'Module.YB.promotion.model.PromotionModel',
    storeId   : 'Module.YB.promotion.store.PromotionStore',
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
        	read: '/api/admin/promotion/'
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
    }
});

