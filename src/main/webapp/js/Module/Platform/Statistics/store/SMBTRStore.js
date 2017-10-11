Ext.define('Module.Platform.Statistics.store.SMBTRStore', {
	extend	: 'Ext.data.Store',
	requires  : [
		'Module.Platform.Statistics.model.SMBTRModel'
	],
	model	 : 'Module.Platform.Statistics.model.SMBTRModel',
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
			read: '/storeapi/statistics/smbtr/'
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