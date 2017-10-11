Ext.define('Module.Operate.article.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Operate.article.Tools',
 		'Module.Operate.article.model.ArticleModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return ACTIVITY_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return ACTIVITY_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},

	translateArticleStatus : function(v){
		if(v == 'open'){
			return ARTICLE_LABEL.open;
		}else if(v == 'close'){
			return ARTICLE_LABEL.close;
		}else{
			return ARTICLE_LABEL.unknown;
		}
	}
});