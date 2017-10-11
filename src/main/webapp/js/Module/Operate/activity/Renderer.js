Ext.define('Module.Operate.activity.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Operate.activity.Tools',
 		'Module.Operate.activity.model.ActivityModel'
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

	translateBanner : function(v){
		if(v == null){
			return "";
		}
		v=v+"?imageView2/1/w/100/h/50/format/jpg";
		return "<img src="+v+" ></img>";
	},
	
	translateActivityStatus : function(v){
		if(v == 'proceed'){
			return ACTIVITY_LABEL.proceed;
		}else if(v == 'close'){
			return ACTIVITY_LABEL.close;
		}else{
			return ACTIVITY_LABEL.unknown;
		}
	}
});