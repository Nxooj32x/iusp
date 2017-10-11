Ext.define('Module.YB.promotion.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['appId'],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
		this.COMBO_DATA.proStatus = Soul.util.RendererUtil.buildComBo(PROMOTION_DATA.proStatus);
		this.COMBO_DATA.proItemType = Soul.util.RendererUtil.buildComBo(PROMOTION_DATA.proItemType);
		this.COMBO_DATA.proType = Soul.util.RendererUtil.buildComBo(PROMOTION_DATA.proType);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});