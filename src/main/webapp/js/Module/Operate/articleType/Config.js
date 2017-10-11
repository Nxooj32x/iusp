Ext.define('Module.Operate.articleType.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['voucherName', 'voucherStatus'],

	getRendererConfig : function() {
		var ret = {
			//voucherStatus : Module.Operate.articleType.Renderer.translateVoucherStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});