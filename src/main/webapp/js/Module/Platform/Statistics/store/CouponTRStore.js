Ext.define('Module.Platform.Statistics.store.CouponTRStore', {
	extend	: 'Ext.data.Store',
	requires  : [
		'Module.Platform.Statistics.model.CouponTRModel'
	],
	model	 : 'Module.Platform.Statistics.model.CouponTRModel',
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
			read: '/storeapi/statistics/coupontr/'
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