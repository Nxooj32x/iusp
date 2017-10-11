Ext.define('Module.YB.orderInvoice.Renderer', {
	singleton: true,

	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.YB.orderInvoice.Tools',
		'Module.YB.orderInvoice.model.OrderInvoiceModel'
	],

	//订单发票状态
	translateOrderInvoiceStatus : function(v) {
		var status = ORDER_INVOICE_DATA.state[v];
		if(status){
			return status;
		}
		return v;
	},

	//订单发票类型 : 个人 or 公司
	translateOrderInvoiceType : function(v) {
		var type = ORDER_INVOICE_DATA.type[v];
		if(type){
			return type;
		}
		return v;
	},

	//订单发票类别 : 普通 or 增值税
	translateOrderInvoiceCategory : function(v) {
		var category = ORDER_INVOICE_DATA.category[v];
		if(category){
			return category;
		}
		return v;
	}
});