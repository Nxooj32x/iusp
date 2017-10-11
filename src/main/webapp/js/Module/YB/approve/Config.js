Ext.define('Module.YB.approve.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : ['bookName','creator','orderId','goodsNum','price','status'],

	getRendererConfig : function() {//状态转换
		var ret = {
				printStatus: Module.YB.approve.Renderer.translatePrintStatus,
				status: Module.YB.approve.Renderer.translateStatus,
				postStatus: Module.YB.approve.Renderer.translatePostStatus,
				time : Module.YB.approve.Renderer.translatetime
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
