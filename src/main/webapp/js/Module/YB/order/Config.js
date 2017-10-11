Ext.define('Module.YB.order.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['code'],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
		this.COMBO_DATA.state = Soul.util.RendererUtil.buildComBo(ORDER_DATA.state);
		this.COMBO_DATA.type = Soul.util.RendererUtil.buildComBo(ORDER_DATA.type);
		this.COMBO_DATA.payType = Soul.util.RendererUtil.buildComBo(ORDER_DATA.payType);
		this.COMBO_DATA.payWay = Soul.util.RendererUtil.buildComBo(ORDER_DATA.payWay);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});