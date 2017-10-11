Ext.define('Module.YB.message.Config', {
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
		this.COMBO_DATA.type = Soul.util.RendererUtil.buildComBo(MESSAGE_DATA.type);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});