Ext.define('Module.Platform.Statistics.store.RenewShopModuleStore', {
	extend	: 'Ext.data.Store',
	requires  : [
		'Module.Platform.Statistics.model.RenewShopModel'
	],
	model	 : 'Module.Platform.Statistics.model.RenewShopModel',
	initFilter : false,
	proxy: {
		type: 'rest',
		headers : {
			"Content-Type": "application/json; charset=utf-8", 
			Accept : 'application/json'
		},
		extraParams : {
			filter : {},
			minOrderNum : 1
		},
		api: {
			read: '/storeapi/statistics/shop/module'
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