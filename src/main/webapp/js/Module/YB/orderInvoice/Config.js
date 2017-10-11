Ext.define('Module.YB.orderInvoice.Config', {
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
		this.COMBO_DATA.state = Soul.util.RendererUtil.buildComBo(ORDER_INVOICE_DATA.state);
		this.COMBO_DATA.type = Soul.util.RendererUtil.buildComBo(ORDER_INVOICE_DATA.type);
		this.COMBO_DATA.category = Soul.util.RendererUtil.buildComBo(ORDER_INVOICE_DATA.category);
		this.COMBO_DATA.bool = Soul.util.RendererUtil.buildComBo(ORDER_INVOICE_DATA.bool);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});