Ext.define('Module.Shop.distributor.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Shop.distributor.Tools',
 		'Module.Shop.distributor.model.ShopModel'
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
  	
	translateCtime : function(v){
		if (v == null || v == '')
			return '';
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},

	translateDate : function(v){
		if (v == null || v == '')
			return '';
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},

	translateStatus : function(v){
		if (v == Module.Shop.distributor.model.ShopModel.OPEN)
			return SHOP_MANAGE_LABEL.open;
		else if (v == Module.Shop.distributor.model.ShopModel.CLOSE)
			return SHOP_MANAGE_LABEL.close;
		else
			return SHOP_MANAGE_LABEL.unknown;
	},


	isPermitOk : function(item, columnIndex, v){
		var permitOk = true;
		var operation = v.panel.columns[columnIndex].operation;
		if (item.links[operation] == null)
			permitOk = false;
		return permitOk;
	},

	translateIsValid : function(val, u,r, rowIndex, columnIndex, s, v){
		if (val == 0) {
			return BULLETIN_MANAGE_LABEL.invalid;
		}else if (val == 1) {
			return BULLETIN_MANAGE_LABEL.valid;
		}else {
			return BULLETIN_MANAGE_LABEL.unknownStatus;
		}
	},

	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Shop.distributor.model.ShopStore;
   	}
});