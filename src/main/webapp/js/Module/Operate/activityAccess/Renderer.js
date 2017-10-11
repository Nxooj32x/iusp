Ext.define('Module.Operate.activityAccess.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Operate.activityAccess.Tools',
 		'Module.Operate.activityAccess.model.ActivityAccessModel'
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
		v=v+"?imageView2/1/w/80/h/40/format/jpg";
		return "<img src="+v+" ></img>"	;
	},
	

	translateActivityAccessIsopen : function(v){
		if(v == '0'){
			return ACTIVITYACCESS_LABEL.hide;
		}else if(v == '1'){
			return ACTIVITYACCESS_LABEL.show;
		}else{
			return ACTIVITYACCESS_LABEL.unknown;
		}
		
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