Ext.define('Module.YB.order.store.OrderStore', {
	singleton : true,
	extend	: 'Ext.data.Store',
	requires  : [
		'Module.YB.order.model.OrderModel'
	],
	model	 : 'Module.YB.order.model.OrderModel',
	storeId   : 'Module.YB.order.store.OrderStore',
	initFilter : false,
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
			read: '/api/admin/order/'
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
			
		}
	}
});