Ext.define('Module.Shop.order.Operation', {
	singleton : true,
	requires : ["Module.YB.order.Operation"],

	//订单详情
	detailOrderFunc : function(record, callbackFn) {
		Module.YB.order.Operation.detailOrderFunc(record, callbackFn);
	},

	//取消订单
	cancelOrderFunc : function(record, callbackFn) {
		Module.YB.order.Operation.cancelOrderFunc(record, callbackFn);
	},

	//订单生产
	produceOrderFunc : function(record, callbackFn) {
		Module.YB.order.Operation.produceOrderFunc(record, callbackFn);
	},

	//订单发货
	deliveryOrderFunc : function(record, callbackFn) {
		this.deliveryInfoFunc(record, callbackFn);
	},

	//编辑物流信息
	deliveryInfoFunc : function(record, callbackFn) {
		Module.YB.order.Operation.deliveryInfoFunc(record, callbackFn);
	},

	doExportExcelFuncForIDFunction : function(records,callbackFn){
		Module.YB.order.Operation.doExportExcelFuncForIDFunction(records, callbackFn);
	},
	
	doExportExcelDetailFuncForIDFunction : function(records,callbackFn){
		Module.YB.order.Operation.doExportExcelDetailFuncForIDFunction(records, callbackFn);
	},
	
	//编辑物流信息，共用(data不可为空，至少需要有id字段，即物流id)
	editDeliveryInfo : function(data, callbackFn) {
		Module.YB.order.Operation.editDeliveryInfo(data, callbackFn);
	}
});