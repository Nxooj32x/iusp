Ext.define('Module.CustomModule.modulemanager.Renderer', {
	singleton: true,
	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.CustomModule.modulemanager.Tools',
		'Module.CustomModule.modulemanager.model.ModuleModel'
	],

	translateIsayTopicSource : function(v){
		return MODULE_COMBO.source[v];
	}
});