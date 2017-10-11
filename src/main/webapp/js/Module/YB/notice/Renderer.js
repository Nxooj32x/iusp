Ext.define('Module.YB.notice.Renderer', {
	singleton: true,
	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.YB.notice.Tools'
	],


	translateBanner : function(v){
		if(v == null){
			return "";
		}
		if(v.indexOf("http")>0){
			v=v+"?imageView2/1/w/100/h/50/format/jpg";
		}
		return "<img width='100px' height='50px' src="+v+" ></img>";
	},

	translateNoticeType : function(v){
		if(v == 'top'){
			return '首页置顶公告';
		}else if(v == 'pop'){
			return '功能更新公告';
		}else{
			return '未知类型';
		}
	},

	translateNoticeState : function(v){
		if(v == '1'){
			return "开启";
		}else if(v == '0'){
			return "关闭";
		}else{
			return "未知状态";
		}
	},



});