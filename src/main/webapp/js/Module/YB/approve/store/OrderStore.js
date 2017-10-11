Ext.define('Module.YB.approve.store.OrderStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.YB.approve.model.OrderModel',
    ],
    
    model     : 'Module.YB.approve.model.OrderModel',
    storeId   : 'Module.YB.approve.store.OrderStore',
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
        	read: '/admin/order/'
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
        	/*Ext.each(records, function(record, index, itself){
				var user = record.data;
				Module.YB.template.Operation.getOperationForUser(user);
			});*/
        }
    }
});

