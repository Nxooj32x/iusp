Ext.define('Module.YB.printBook.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil', 'Module.YB.printBook.Renderer', 'Soul.util.ObjectView'],
	
	PROP : {},
	  	
	COMBO_CFG : {},
	
	getRendererConfig : function() {
		var renderer = Module.YB.printBook.Renderer;
		var ret = renderer.config;
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildPROP();
		this.buildCOMBOCFG();
	},
	
	buildCOMBOCFG : function(){
	},
	
	buildPROP : function(){
	}

});
