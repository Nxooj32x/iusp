Ext.define('Module.Store.StoreOwner.Renderer', {
	singleton: true,
	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.Store.StoreOwner.Tools',
		'Module.Store.StoreOwner.model.StoreOwnerModel'
	],

	translateIsayTopicSource : function(v){
		return STORE_COMBO.source[v];
	}
});