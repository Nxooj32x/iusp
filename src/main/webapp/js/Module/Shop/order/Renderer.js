Ext.define('Module.Shop.order.Renderer', {
	singleton: true,

	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.Shop.order.Tools',
		'Module.YB.order.model.OrderModel'
	],

	//订单状态
	translateOrderStatus : function(v) {
		var status = ORDER_DATA.state[v];
		if(status){
			return status;
		}
		return v;
	},

	translateOrderIsCashed : function(v) {
		var status = ORDER_DATA.isCashed[v];
		if(status){
			return status;
		}
		return v;
	},
	
	//订单付款方式
	translateOrderPayWay : function(v) {
		var payWay = ORDER_DATA.payWay[v];
		if(payWay){
			return payWay;
		}
		return v;
	}
	
	
	
	
});