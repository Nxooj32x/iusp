Term = function(){

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
		thisObj.queryList();
		
		$("#systemSearch").bind("click",function(){
			thisObj.querySoftwareList();
		});
		
		$("#delArticleBtn").bind("click",function(){
			thisObj.deleteSoftware();
		});
	};
	
	// 查询列表信息
	this.queryList = function(){
		
		var requestUrl = thisObj.constant.context + "/admin/term/queryList.htm";
		
		var paramArray = {};
	 	paramArray['gold'] = $("#gold").val();
	 	paramArray['pvalue'] = $("#pvalue").val();
	 	paramArray['pageSize'] = 10;
	 	 
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		
		$.page.loadData(requestUrl,1,param,'grid',10);
	};
	
	this.fun_delete = function(){
		
		var checkedObj = $("input[name='osCheck']:checked");
		
		if(checkedObj.length <= 0){
			alert("请选择需要删除的信息！");
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
		
		if(confirm("确认删除选中的信息吗？")){
			$.ajax({
				url: thisObj.constant.context + '/term/delete.htm',
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

var term = new Term();