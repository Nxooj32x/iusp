Ext.define('Module.Store.StoreOwner.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],

	showProperties : ['id','contacts', 'phone','ciId', 'status', 'storeNum'],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {
			status : function(v){
				return STORE_COMBO.status[v] || v;
			}
		};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
		this.COMBO_DATA.source = Soul.util.RendererUtil.buildComBo(STORE_COMBO.source);
		this.COMBO_DATA.status = Soul.util.RendererUtil.buildComBo(STORE_COMBO.status);
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});