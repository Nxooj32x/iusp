Ext.define('Module.Operate.article.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['voucherName', 'voucherStatus'],

	getRendererConfig : function() {
		var ret = {
			//voucherStatus : Module.Operate.article.Renderer.translateVoucherStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});