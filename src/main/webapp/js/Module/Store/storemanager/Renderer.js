Ext.define('Module.Store.storemanager.Renderer', {
	singleton: true,
	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.Store.storemanager.Tools',
		'Module.Store.storemanager.model.StoreOwnerModel'
	],

	translateIsayTopicSource : function(v){
		return STORE_COMBO.source[v];
	}
});