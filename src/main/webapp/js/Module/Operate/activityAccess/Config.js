Ext.define('Module.Operate.activityAccess.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['voucherName', 'voucherStatus'],

	getRendererConfig : function() {
		var ret = {
			//voucherStatus : Module.Operate.activityAccess.Renderer.translateVoucherStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});