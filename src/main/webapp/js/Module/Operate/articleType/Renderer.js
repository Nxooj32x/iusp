Ext.define('Module.Operate.articleType.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Operate.articleType.Tools',
 		'Module.Operate.articleType.model.ArticleTypeModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return ARTICLE_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return ARTICLE_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},

	translateModule : function(v){
		if (v == 'wiki'){
			return ARTICLE_LABEL.wiki;
		} else if(v == 'help'){
			return ARTICLE_LABEL.help;
		} else if (v == 'story') {
			return ARTICLE_LABEL.story;
		} else {
			return ARTICLE_LABEL.unknown;
		}
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