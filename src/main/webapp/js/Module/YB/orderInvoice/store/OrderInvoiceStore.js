Ext.define('Module.YB.orderInvoice.store.OrderInvoiceStore', {
	singleton : true,
	extend	: 'Ext.data.Store',
	requires  : [
		'Module.YB.orderInvoice.model.OrderInvoiceModel',
	],
	model	 : 'Module.YB.orderInvoice.model.OrderInvoiceModel',
	storeId   : 'Module.YB.orderInvoice.store.OrderInvoiceStore',
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
			read: '/api/admin/orderInvoice/'
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