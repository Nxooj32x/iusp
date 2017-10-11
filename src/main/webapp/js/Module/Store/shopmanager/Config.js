Ext.define('Module.Store.shopmanager.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['', ''],

	getRendererConfig : function() {
		var ret = {
			//voucherStatus : Module.Shop.channel.Renderer.translateVoucherStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});