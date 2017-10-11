Ext.define('Module.Store.storemanager.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],

	showProperties : ['name', 'status'],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {

		};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
		this.COMBO_DATA.source = Soul.util.RendererUtil.buildComBo(STORE_COMBO.source);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});