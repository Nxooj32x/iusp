Ext.define('Module.Operate.isay.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Operate.isay.Tools',
 		'Module.Operate.isay.model.ISayTopicModel'
  	],

	translateIsayTopicSource : function(v){
		return ISAY_TOPIC_COMBO.source[v];
	}
});