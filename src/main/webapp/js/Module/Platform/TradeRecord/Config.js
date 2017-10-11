Ext.define('Module.Platform.TradeRecord.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
		this.COMBO_DATA.busType = Soul.util.RendererUtil.buildComBo(TRADE_RECORD_DATA.busType);
		this.COMBO_DATA.payType = Soul.util.RendererUtil.buildComBo(TRADE_RECORD_DATA.payType);
		this.COMBO_DATA.payWay = Soul.util.RendererUtil.buildComBo(TRADE_RECORD_DATA.payWay);
		this.COMBO_DATA.status = Soul.util.RendererUtil.buildComBo(TRADE_RECORD_DATA.status);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});