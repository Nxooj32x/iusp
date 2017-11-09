Article = function(){

	var thisObj = this;
	
	this.constant = {
		resContext : "",
		context : ""
	};
	
	this.setOverallVeriable = function(resContext,context){
		thisObj.constant.resContext = resContext;
		thisObj.constant.context = context;
	};
	
	// 初始化
	this.init = function(resContext,context){
		
		thisObj.setOverallVeriable(resContext,context);
		
		// 查询
		thisObj.queryArticleList();
	};
	
	this.queryArticleList = function(){
		
		var requestUrl = thisObj.constant.context + "/queryHomeArticleList";
		
		var paramArray = {};
	 	paramArray['title'] = "";
	 	paramArray['type'] = $("#type").val();
	 	paramArray['pageSize'] = 10;
	 	 
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		
		$.page.loadData(requestUrl,1,param,'grid',10);
	};
};

var article = new Article();