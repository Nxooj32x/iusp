Ext.define('Module.Store.StoreShop.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil', 'Module.Store.StoreShop.Renderer' ],
	
	/**
	 * 基础属性显示
	 */
	showProperties : [ 'name', 'ctime', 'status', 'code', , 'appId', 'storeOwnerId'],

	getRendererConfig : function() {
		var renderers = Module.Store.StoreShop.Renderer; 
	
		var ret = {
			status : renderers.translateShopStatus,
	
			logo : renderers.translateBanner,
	
			ctime : Soul.util.RendererUtil.getDateInfo2,
	
			utime : Soul.util.RendererUtil.getDateInfo2
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});