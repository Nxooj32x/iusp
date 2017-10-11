Ext.define('Module.YB.invoice.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : [],

	getRendererConfig : function() {//状态转换
		var ret = {};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});