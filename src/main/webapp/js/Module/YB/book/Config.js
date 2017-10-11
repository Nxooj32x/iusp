Ext.define('Module.YB.book.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil', 'Module.YB.book.Renderer', 'Soul.util.ObjectView'],
	
	PROP : {},
	  	
	COMBO_CFG : {},
	
	getRendererConfig : function() {
		var renderer = Module.YB.book.Renderer;
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
		this.COMBO_CFG.type = Soul.util.RendererUtil.buildComBo(BOOK_TYPE);
		this.COMBO_CFG.status = Soul.util.RendererUtil.buildComBo(BOOK_STATUS);
	},
	
	buildPROP : function(){
	}

});
