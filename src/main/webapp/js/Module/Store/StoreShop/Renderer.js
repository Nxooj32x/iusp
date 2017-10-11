Ext.define('Module.Store.StoreShop.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Store.StoreShop.Tools',
 		'Module.Store.StoreShop.model.StoreShopModel'
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
		return "<img height=40 width=80 src="+v+" ></img>"	;
	},
	

	
	translateShopStatus : function(v){
		if(v == 'inuse'){
			return "正常使用";
		}else if(v == 'delete'){
			return "已经删除";
		}else if(v == 'expire'){
			return "欠费";
		}else if(v == 'pause'){
			return "暂停";
		}else{
			return '未知';
		}
	},
	
	translateShopModuleStatus : function(v){
		if(v == 'online'){
			return "正常使用";
		}else if(v == 'delete'){
			return "已经删除";
		}else if(v == 'expire'){
			return "欠费";
		}else if(v == 'pause'){
			return "暂停";
		}else{
			return "未知";
		}
	},



	translateShopModuleBillingStatus : function(v){
		if(v == 'obsolete'){
			return "过期";
		}else if(v == 'online'){
			return "在线";
		}else if(v == 'unused'){
			return "未使用";
		}else{
			return "未知";
		}
	},
	translateShopModuleBillingTypeStatus : function(v){
		if(v == 'TIME'){
			return "按时";
		}else if(v == 'PPV'){
			return "按次";
		}else{
			return "未知";
		}
	},
});