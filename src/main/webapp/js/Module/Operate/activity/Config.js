Ext.define('Module.Operate.activity.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['voucherName', 'voucherStatus'],

	getRendererConfig : function() {
		var ret = {
			//voucherStatus : Module.Operate.activity.Renderer.translateVoucherStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});