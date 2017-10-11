Ext.define('Module.YB.promotion.Renderer', {
	singleton: true,

	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.YB.promotion.Tools',
		'Module.YB.promotion.model.PromotionModel'
	],
	translateProStatus : function(v) {
		var status = PROMOTION_DATA.proStatus[v];
		if(status){
			return status;
		}
		return v;
	},
	translateProType : function(v) {
		var type = PROMOTION_DATA.proType[v];
		if(type){
			return type;
		}
		return v;
	},
	translateProItemType : function(v) {
		var type = PROMOTION_DATA.proItemType[v];
		if(type){
			return type;
		}
		return v;
	}
});