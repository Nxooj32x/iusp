Ext.define('Module.CustomModule.modulemanager.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],

	showProperties : ['voucherName', 'voucherStatus'],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {
			//voucherStatus : Module.Operate.isay.Renderer.translateVoucherStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
		this.COMBO_DATA.source = Soul.util.RendererUtil.buildComBo(MODULE_COMBO.source);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});