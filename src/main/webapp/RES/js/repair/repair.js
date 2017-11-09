Repair = function(){

	var thisObj = this;
	
	this.constant = {
		resContext : "",
		context : ""
	};
	
	this.setOverallVeriable = function(resContext,context){
		thisObj.constant.resContext = resContext;
		thisObj.constant.context = context;
	};
	
	this.init = function(resContext,context){
		thisObj.setOverallVeriable(resContext,context);
	};
	
	// 全院报修初始化
	this.listAllInit = function(resContext,context){
	
		thisObj.setOverallVeriable(resContext,context);
		
		// 默认展示全部
		thisObj.queryAllRepairList();
	
		$("#allSearchBtn").unbind("click").bind("click",function(){
			thisObj.queryAllRepairList();
		});
	};
	
	// 全院报修列表查询 
	this.queryAllRepairList = function(){
		var requestUrl = thisObj.constant.context + "/repair/queryAllRepairList";
		var paramArray = {};
//wangxuan 2014-12-9
		paramArray['applayTime_S'] = $("#applayTime_S").val();
	 	paramArray['applayTime_E'] = $("#applayTime_E").val();
	 	paramArray['satisfaction'] = $("#satisfaction").val();
	 	paramArray['bxlx'] = $("#bxlx").val();
	 	paramArray['departNo'] = $("#departNo").val();	
	 	paramArray['repairStatus'] = $("#repairStatus").val();
	 	paramArray['applayContent'] = $("#repairContent").val() == '报修内容' ? "" : $.trim($("#repairContent").val());
	 	paramArray['pageSize'] = 10;
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		$.page.loadData(requestUrl,1,param,'grid',10);
	};
	
	
	
	// 我的任务初始化
	this.myApproveInit = function(resContext,context){
	
		thisObj.setOverallVeriable(resContext,context);
		
		// 默认展示全部
		thisObj.queryMyApproveRepairList();
		
		$("#allSearchBtn").unbind("click").bind("click",function(){
			thisObj.queryMyApproveRepairList();
		});
	};
	
	// 我的任务列表查询
	this.queryMyApproveRepairList = function(){
		var requestUrl = thisObj.constant.context + "/repair/queryMyApproveRepairList";
		var paramArray = {};
	 	//paramArray['applayContent'] = $("#repairContent").val() == '报修内容' ? "" : $.trim($("#repairContent").val());
	 	paramArray['pageSize'] = 10;
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		$.page.loadData(requestUrl,1,param,'grid',10);
	};
	
	// 审批报修任务
	this.approveRepairTask = function(type){
		
		if(!confirm("是否确定提交？")){
		
			return false;
		}
		
		var assigneeStaffNo = "";
		var assigneeStaffPosition = "";
		
		if(type == '2'){
			var assigneeStaffInfo = $("#assigneeStaffInfo").val();
			var arrs = assigneeStaffInfo.split("#");
			assigneeStaffNo = arrs[0];
			assigneeStaffPosition = arrs[1];
			
		}
	
		var params = {
			turnType : type,
			id : $("#repairId").val(),
			applayRespnse : $("#applayRespnse").val(),
			assigneeStaffNo : assigneeStaffNo,
			assigneeStaffPosition : assigneeStaffPosition,
			acceptTime:$("#acceptTime").val(),
			acceptBxlx:$("#bxlx").val()
		};
		$("input").attr("disabled", true);
		$.ajax({
			url: thisObj.constant.context + '/repair/approveRepairTask',
			type: 'POST',
			async: false,
			dataType: "json",
			data: params,
			success: function(data){
				if(data.flag){
					alert("操作成功");
					window.location.href = thisObj.constant.context + '/repair/forward?pageName=myApproveTask';
				} else {
					alert(data.message);
				}
				$("input").removeAttr("disabled");
			},
			error: function(){
				alert("对不起，您的操作失败，请重新操作！");
				$("input").removeAttr("disabled");
				return false;
			}
		});	
	};

	// 我的报修
	this.queryList = function(){
		
		var requestUrl = thisObj.constant.context + "/repair/queryList";
		var paramArray = {};
	 	paramArray['applayTime_S'] = $("#applayTime_S").val();
	 	paramArray['applayTime_E'] = $("#applayTime_E").val();
	 	paramArray['applayContent'] = $.trim($("#applayContent").val()) == '键入查询内容' ? "" : $.trim($("#applayContent").val());
	 	paramArray['repairStatus'] = $("#repairStatus").val();	 	
	 	paramArray['pageSize'] = 10;
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		
		$.page.loadData(requestUrl,1,param,'grid',10);
	};
	
	// 我的已完成
	this.queryFinishTaskList = function(){
		
		var requestUrl = thisObj.constant.context + "/repair/lmdFinishTaskqueryList";
		var paramArray = {};
	 	paramArray['applayTime_S'] = $("#applayTime_S").val();
	 	paramArray['applayTime_E'] = $("#applayTime_E").val();
	 	paramArray['applayContent'] = $.trim($("#applayContent").val()) == '键入查询内容' ? "" : $.trim($("#applayContent").val());
	 	paramArray['repairStatus'] = $("#repairStatus").val();	 	
	 	paramArray['pageSize'] = 10;
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		
		$.page.loadData(requestUrl,1,param,'grid',10);
	};
	
	// 左侧菜单数量统计
	this.queryMenuCount = function(){

		$.ajax({
			url: thisObj.constant.context + "/repair/leftMenuCount",
			type: 'POST',
			async: true,
			dataType: "json",
			success: function(data){
				if(data.flag){
				//wangxuan 2014-12-9 未评价的
					$("#myUnRemark")l(data.myUnRemark);
					$("#myApplayRepair")l(data.myApplayRepair);
					$("#myFinishedTask")l(data.myFinishedTask);
					$("#myUnfinishedTask")l(data.myUnfinishedTask);
					$("#allApplayRepair")l(data.allApplayRepair);
				}
			},
			error: function(){
				return false;
			}
		});	
	};
};

var repair = new Repair();