Ext.define('Module.Operate.vote.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['voucherName', 'voucherStatus'],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {
			//voucherStatus : Module.Operate.vote.Renderer.translateVoucherStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
		this.COMBO_DATA.source = Soul.util.RendererUtil.buildComBo(VOTE_TOPIC_COMBO.source);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});