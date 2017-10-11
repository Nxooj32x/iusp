Ext.define('Module.YB.order.Renderer', {
	singleton: true,

	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.YB.order.Tools',
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
	//订单付款方式
	translateOrderPayWay : function(v) {
		var payWay = ORDER_DATA.payWay[v];
		if(payWay){
			return payWay;
		}
		return v;
	},

	//cookbook 装订方式
	translateBookTexture : function(v) {
		var name = COOKBOOK_DATA.bookTexture[v];
		if(name){
			return name;
		}
		return v;
	},
	translateBookSize : function(v) {
		var name = COOKBOOK_DATA.bookSize[v];
		if(name){
			return name;
		}
		return v;
	},
	translateBookBinding : function(v) {
		var name = COOKBOOK_DATA.bookBinding[v];
		if(name){
			return name;
		}
		return v;
	},
	translateBookLeather : function(v) {
		var name = COOKBOOK_DATA.bookLeather[v];
		if(name){
			return name;
		}
		return v;
	},
});