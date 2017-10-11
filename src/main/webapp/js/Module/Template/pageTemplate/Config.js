Ext.define('Module.Template.pageTemplate.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : [ 'name'],

	getRendererConfig : function() {
		var ret = {
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
