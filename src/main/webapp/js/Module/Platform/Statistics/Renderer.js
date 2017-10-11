Ext.define('Module.Platform.Statistics.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Platform.Statistics.Tools'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return CASH_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	
  		//订单状态
	translateOrderStatus : function(v) {
		var status = ORDER_DATA.state[v];
		if(status){
			return status;
		}
		return v;
	},
	
	//订单付款方式
	translateOrderType : function(v) {
		var type = ORDER_DATA.type[v];
		if(type){
			return type;
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
	
	constructor : function() {
		this.config = {
			ctime : Soul.util.RendererUtil.getDateInfo2,
		};
		this.callParent(arguments);
	}

});