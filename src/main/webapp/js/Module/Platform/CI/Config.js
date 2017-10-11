Ext.define('Module.Platform.CI.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],

	showProperties : ['id','ciType','name','address','contacts',
	                  'phone','mobile','qq','wechat','aliww','status','soId','commerceId','commerceName'],

	getRendererConfig : function() {
		var renderer = Module.Platform.CI.Renderer;
		var ret = renderer.config;
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});