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
		
		$("#systemSearch").bind("click",function(){
			thisObj.queryArticleList();
		});
		
		$("#delArticleBtn").bind("click",function(){
			thisObj.deleteArticle();
		});
	};
	
	// 查询文章列表信息
	this.queryArticleList = function(){
		
		var requestUrl = thisObj.constant.context + "/admin/article/queryArticleList.htm";
		
		var paramArray = {};
	 	paramArray['gold'] = $("#gold").val();
	 	paramArray['type'] = $("#type").val();
	 	paramArray['pvalue'] = $("#pvalue").val();
	 	paramArray['pageSize'] = 10;
	 	 
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		
		$.page.loadData(requestUrl,1,param,'grid',10);
	};
	
	this.deleteArticle = function(){
		
		var checkedObj = $("input[name='osCheck']:checked");
		
		if(checkedObj.length <= 0){
			alert("请选择需要删除的文章！");
			return false;
		}
		
		var ids = "";
		var index = 0;
		checkedObj.each(function(){
			if(checkedObj.length == index + 1){
				ids += $(this).val();
			} else {
				ids += $(this).val() + ",";
			}
			index ++;
		});
		
		if(confirm("确认删除选中的文章吗？")){
			$.ajax({
				url: thisObj.constant.context + '/outerSystem/deleteArticle.htm',
				type: 'POST',
				cache: false,
				dataType: "json",
				data: {"ids" :ids},
				success: function(data){
					if(data.flag){
						alert("删除成功！");
						// 查询
						thisObj.queryArticleList();
					} else {
						alert("删除失败，请稍后重新操作！");
					}
				},
				error: function(){
					alert("对不起，您的操作失败，请重新操作！");
				}
			});	
		}
	};
};

var article = new Article();