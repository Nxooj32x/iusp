Ext.define('Module.YB.message.store.MessageStore', {
	singleton : true,
	extend	: 'Ext.data.Store',
	requires  : [
		'Module.YB.message.model.MessageModel',
	],
	model	 : 'Module.YB.message.model.MessageModel',
	storeId   : 'Module.YB.message.store.MessageStore',
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
			read: '/api/admin/message/'
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