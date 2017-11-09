WorkingLog = function(){

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
	this.init = function(resContext,context,sessionId){
		thisObj.setOverallVeriable(resContext,context,sessionId);
	};
	
	// 日报填写初始化
	this.dailyInit = function(){
	
		$("#dailySubmit").unbind("click").bind("click",function(){
		
			var logTime = $("#logTime").val();
			if(iuspUtil.isEmpty(logTime)){
				$("#msgPanel").css("color","red").html("请选择日报时间！");
				return false;
			}
			
			var nowWorkInfo = $("#nowWorkInfo").val();
			if(iuspUtil.isEmpty(nowWorkInfo)){
				$("#msgPanel").css("color","red").html("请填写日报内容！");
				return false;
			}
			
			thisObj.submitWorkingLog('01',"02");
		});
		
		$("#dailySaveDraft").unbind("click").bind("click",function(){
			thisObj.saveDraft();
		});
	};

	this.weeklyInit = function(){
	
		$("#weeklySubmit").unbind("click").bind("click",function(){
		
			var year = $("#year").val();
			if(iuspUtil.isEmpty(year)){
				$("#msgPanel").css("color","red").html("年份不能为空！");
				return false;
			}
			
			var term = $("#term").val();
			if(iuspUtil.isEmpty(term)){
				$("#msgPanel").css("color","red").html("学期不能为空！");
				return false;
			}
			
			var week = $("#week").val();
			if(iuspUtil.isEmpty(week)){
				$("#msgPanel").css("color","red").html("请选择周！");
				return false;
			}
			
			var nowWorkInfo = $("#nowWorkInfo").val();
			if(iuspUtil.isEmpty(nowWorkInfo)){
				$("#msgPanel").css("color","red").html("请填写本周工作情况！");
				return false;
			}
			
			var nextWorkInfo = $("#nextWorkInfo").val();
			if(iuspUtil.isEmpty(nextWorkInfo)){
				$("#msgPanel").css("color","red").html("请填写下周工作计划！");
				return false;
			}
			
			thisObj.submitWorkingLog('02',"02");
		});
		
		$("#weeklySaveDraft").unbind("click").bind("click",function(){
			thisObj.saveDraft();
		});
	};
	
	
	this.monthlyInit = function(){
	
		$("#monthlySubmit").unbind("click").bind("click",function(){
		
			var logTime = $("#logTime").val();
			if(iuspUtil.isEmpty(logTime)){
				$("#msgPanel").css("color","red").html("请选择月报时间！");
				return false;
			}
			
			var nowWorkInfo = $("#nowWorkInfo").val();
			if(iuspUtil.isEmpty(nowWorkInfo)){
				$("#msgPanel").css("color","red").html("请填写本月工作情况！");
				return false;
			}
			
			var nextWorkInfo = $("#nextWorkInfo").val();
			if(iuspUtil.isEmpty(nextWorkInfo)){
				$("#msgPanel").css("color","red").html("请填写下月工作计划！");
				return false;
			}
			
			thisObj.submitWorkingLog('03',"02");
		});
		
		$("#monthlySaveDraft").unbind("click").bind("click",function(){
			thisObj.saveDraft();
		});
	};
	
	// 提交周报日报月报
	this.submitWorkingLog = function(logType,logStatus){
	
		var params = {};
		if(logType == "02"){
			params = {
				year:$("#year").val(),
				term:$("#term").val(),
				week:$("#week").val(),
				id:$("#logId").val(),
				logType:logType,
				logStatus:logStatus,
				nowWorkInfo:$("#nowWorkInfo").val(),
				nextWorkInfo:$("#nextWorkInfo").val(),
				question:$("#question").val()
			};
		} else {
			params = {
				logTime:$("#logTime").val(),
				id:$("#logId").val(),
				logType:logType,
				logStatus:logStatus,
				nowWorkInfo:$("#nowWorkInfo").val(),
				nextWorkInfo:$("#nextWorkInfo").val(),
				question:$("#question").val()
			};
		}
		
		$.ajax({
			url: thisObj.constant.context + '/workingLog/submitWorkingLog.htm',
			type: 'POST',
			async: false,
			dataType: "json",
			data: params,
			success: function(data){
				if(data.flag){
					$("#msgPanel").css("color","green").html("提交成功");
					alert("提交成功");
					window.history.back();
				} else {
					$("#msgPanel").css("color","red").html(data.message);
					return false;
				}
			},
			error: function(){
				$("#msgPanel").css("color","red").html("对不起，您的操作失败，请重新操作！");
				return false;
			}
		});	
		
	};
	
	// 保存草稿
	this.saveDraft = function(){
		var logType = $("#logType").val();
		var params = {};
		if(logType == '02'){
			 params = {
				id:$("#logId").val(),
				year:$("#year").val(),
				term:$("#term").val(),
				week:$("#week").val(),
				logType:logType,
				logStatus:"01",
				nowWorkInfo:$("#nowWorkInfo").val(),
				nextWorkInfo:$("#nextWorkInfo").val(),
				question:$("#question").val()
			};
		} else {
			params = {
				logTime:$("#logTime").val(),
				id:$("#logId").val(),
				logType:logType,
				logStatus:"01",
				nowWorkInfo:$("#nowWorkInfo").val(),
				nextWorkInfo:$("#nextWorkInfo").val(),
				question:$("#question").val()
			};
		}
		
		$.ajax({
			url: thisObj.constant.context + '/workingLog/saveDraft.htm',
			type: 'POST',
			async: false,
			dataType: "json",
			data: params,
			success: function(data){
				if(data.flag){
					$("#msgPanel").css("color","green").html("草稿保存成功");
					thisObj.queryMyLogCount();
				} else {
					$("#msgPanel").css("color","red").html(data.message);
					return false;
				}
			},
			error: function(){
				$("#msgPanel").css("color","red").html("对不起，您的操作失败，请重新操作！");
				return false;
			}
		});	
	};
	
	// 草稿箱初始化
	this.draftInit = function(){
		thisObj.queryMyWorkLogList();
		$("#draftSearch").bind("click",function(){
			thisObj.queryMyWorkLogList();
		});
		$("#pTabDiv").find("td[mark='tab']").unbind("click").bind("click", function(){
			$("#pTabDiv").find("td[mark='tab']").removeClass("ptab").addClass("ptabn");
			$(this).removeClass("ptabn").addClass("ptab");
			$("#logType").val($(this).attr("logType"));
			thisObj.queryMyWorkLogList();
		});
	};
	
	this.myWorkingListInit = function(){
		thisObj.queryMyWorkLogList();
		
		$("#mySearch").bind("click",function(){
			thisObj.queryMyWorkLogList();
		});
		
		$("#pTabDiv").find("td[mark='tab']").unbind("click").bind("click", function(){
			$("#pTabDiv").find("td[mark='tab']").removeClass("ptab").addClass("ptabn");
			$(this).removeClass("ptabn").addClass("ptab");
			$("#logType").val($(this).attr("logType"));
			thisObj.queryMyWorkLogList();
		});
	};
	
	// 
	this.viewApprovedWorkingLogInit = function(){
		thisObj.queryMyWorkLogList();
		$("#logSearch").bind("click",function(){
			thisObj.queryMyWorkLogList();
		});
	};
	
	// 员工查询自己的周报日报月报
	this.queryMyWorkLogList = function(){
		
		var requestUrl = thisObj.constant.context + "/workingLog/queryMyWorkingLogList.htm";
		var paramArray = {};
	 	paramArray['logStatus'] = $("#logStatus").val();
	 	paramArray['logType'] = $("#logType").val();
	 	

	 	paramArray['week']=$("#week").val();

	 	///*******日志的开始与结束时间******/

	 	paramArray['logTimeBegin'] = $("#logTimeBegin").val();
	 	paramArray['logTimeEnd'] = $("#logTimeEnd").val();
	 	
	   ///********日志提交的开始时间与结束时间******/
	 	paramArray['fillTimeBegin'] = $("#fillTimeBegin").val();
	 	paramArray['fillTimeEnd'] = $("#fillTimeEnd").val();
	 	///********日志得分******/
	 	paramArray['score'] = $("#score").val();
	 	///********审核人******/
	 	paramArray['approverName'] = $("#approver").val() == '审核人' ? "" : $.trim($("#approver").val());
	    ///*********关键字***********************/
	    
	 	paramArray['keyWords'] = $("#keywords").val() == '关键字' ? "" : $.trim($("#keywords").val());
	 	
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		
		$.page.loadData(requestUrl,1,param,'logGrid',10);
	};

	// 员工查询需要自己审核/退回，的日报，月报和周报
	this.queryMyCheckLogCount = function(){
		$.ajax({
			url: thisObj.constant.context + '/workingLog/queryMyCheckLogCount.htm',
			type: 'POST',
			async: false,
			dataType: "json",
			success: function(data){
				if(data.flag){
					$("#checkDayCount").html(data.dailyCheckCount);
					$("#checkDeekCount").html(data.weekCheckyCount);
					$("#checkMonthCount").html(data.monthCheckCount);
					
					$("#retDayCount").html(data.returnDailyCheckCount);
					$("#retDeekCount").html(data.returnWeekCheckyCount);
					$("#retMonthCount").html(data.retMonthCount);
				}
			},
			error: function(){
				return false;
			}
		});	
	};
	
		
	this.deptInit = function(){
		thisObj.queryWorkLogList();
		$("#deptSearch").bind("click",function(){
			thisObj.queryWorkLogList();
		});
	};
	
	this.presidentInit = function(){
		thisObj.queryWorkLogPresidentList();
		$("#presidentSearch").bind("click",function(){
			thisObj.queryWorkLogPresidentList();
		});
	};
	
	// 院领导数量统计
	this.queryPresidentLogCount = function(){
		$.ajax({
			url: thisObj.constant.context + '/workingLog/queryPresidentLogCount.htm',
			type: 'POST',
			async: false,
			dataType: "json",
			success: function(data){
				if(data.flag){
					$("#checkDayCount").html(data.dailyCheckCount);
					$("#checkDeekCount").html(data.weekCheckyCount);
					$("#checkMonthCount").html(data.monthCheckCount);
					
					$("#deptDayCount").html(data.deptDailyCheckCount);
					$("#deptDeekCount").html(data.deptWeekCheckyCount);
					$("#deptMonthCount").html(data.deptMonthCheckCount);
					
					$("#approvingLogAllCount").html(Number(data.dailyCheckCount) + Number(data.weekCheckyCount) + Number(data.monthCheckCount));
				}
			},
			error: function(){
				return false;
			}
		});	
	};
	
	// 院领导查询分管部门部门负责人周报日报月报
	this.queryWorkLogPresidentList = function(){
		var requestUrl = thisObj.constant.context + "/workingLog/presidentLogQueryList.htm";
		var paramArray = {};
	 	paramArray['logStatus'] = $("#logStatus").val();
	 	paramArray['logType'] = $("#logType").val();
	 	paramArray['staffNo'] = $("#staffNo").val() == '查询工号' ? "" : $.trim($("#staffNo").val());
	 	paramArray['staffName'] = $("#staffName").val() == '查询姓名' ? "" : $.trim($("#staffName").val());
	 	paramArray['keyWords'] = $("#keywords").val() == '关键字' ? "" : $.trim($("#keywords").val());
	 	paramArray['deptCode'] = $("#deptCode").val();
	 	paramArray['week'] = $("#week").val();
	 	
	 	paramArray['logTimeBegin'] = $("#logTimeBegin").val();
	 	paramArray['logTimeEnd'] = $("#logTimeEnd").val();
	 	paramArray['fillTimeBegin'] = $("#fillTimeBegin").val();
	 	paramArray['fillTimeEnd'] = $("#fillTimeEnd").val();
	 	paramArray['logStatus'] = $("#logStatus").val();
	 	paramArray['score'] = $("#score").val();
	 	/*将评审人改为按名字查询by mazy*/
	 	paramArray['approverName'] = $("#approver").val() == '审核人' ? "" : $.trim($("#approver").val());
	 	
	 	paramArray['pageSize'] = 10;
	 	 
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		
		$.page.loadData(requestUrl,1,param,'logGrid',10);
	};
	
	// 领导查询教职工周报日报月报
	this.queryWorkLogList = function(){
		var requestUrl = thisObj.constant.context + "/workingLog/queryWorkingLogList.htm";
		var paramArray = {};
	 	paramArray['logStatus'] = $("#logStatus").val();
	 	paramArray['logType'] = $("#logType").val();
	 	paramArray['staffNo'] = $("#staffNo").val() == '查询工号' ? "" : $.trim($("#staffNo").val());
	 	paramArray['staffName'] = $("#staffName").val() == '查询姓名' ? "" : $.trim($("#staffName").val());
	 	paramArray['keyWords'] = $("#keywords").val() == '关键字' ? "" : $.trim($("#keywords").val());
	 	paramArray['deptCode'] = $("#deptCode").val();
	 	paramArray['week']=$("#week").val();
	 	
	 	paramArray['logTimeBegin'] = $("#logTimeBegin").val();
	 	paramArray['logTimeEnd'] = $("#logTimeEnd").val();
	 	paramArray['fillTimeBegin'] = $("#fillTimeBegin").val();
	 	paramArray['fillTimeEnd'] = $("#fillTimeEnd").val();
	 	paramArray['logStatus'] = $("#logStatus").val();
	 	paramArray['score'] = $("#score").val();
	 	/*将评审人改为按名字查询by mazy*/
	 	paramArray['approverName'] = $("#approver").val() == '审核人' ? "" : $.trim($("#approver").val());
	 	
	 	paramArray['isDept'] = $("#isDept").val();
	 
	 	paramArray['pageSize'] = 10;
	 	 
	 	var params = $.parseJSON(JSON.stringify(paramArray).replace(/\'/g,"\""));
		param=$.extend({},params,{});
		
		$.page.loadData(requestUrl,1,param,'logGrid',10);
	};
	
	
	this.approveWorkingLog = function(logStatus){
		
		if(confirm("是否确定" + (logStatus == '03' ? "审核通过" : "退回") + "?")){
			var params = {
				id:$("#logId").val(),
				comment:$("#comment").val(),
				score:$("#score").val(),
				logStatus:logStatus
			};
		
			$.ajax({
				url: thisObj.constant.context + '/workingLog/submitApproveWorkingLog.htm',
				type: 'POST',
				async: false,
				dataType: "json",
				data: params,
				success: function(data){
					if(data.flag){
						if(logStatus == '03'){
							alert("审核成功");
						} else if(logStatus == '04'){
							alert("退回成功");
						}
						window.history.back();
					} else {
						alert(data.message);
						return false;
					}
				},
				error: function(){
					alert("对不起，您的操作失败，请重新操作！");
					return false;
				}
			});	
		}
	};
	
	this.queryMyLogCount = function(){
		$.ajax({
			url: thisObj.constant.context + '/workingLog/queryMyLogCount',
			type: 'GET',
			async: false,
			dataType: "json",
			success: function(data){
				if(data.flag){
					$("#returnLogCount").html(data.returnLogCount);
					$("#approvingLogCount").html(data.approvingLogCount);
					//add wangxuan 已审核所有
					$("#approvedLogCount").html(data.approvedMonthCount+data.approvedWeeklyCount+data.approvedDailyCount);
					$("#approvedMonthCount").html(data.approvedMonthCount);
					$("#approvedWeeklyCount").html(data.approvedWeeklyCount);
					$("#approvedDailyCount").html(data.approvedDailyCount);
					$("#draftCount").html(data.draftCount);
					//王璇 教职工 查看已审核的本部门汇报
					$("#deptDailyAllCount").html(data.approvedDailyCount);
					$("#deptMonthAllCount").html(data.approvedMonthCount);
					$("#deptWeekAllCount").html(data.approvedWeeklyCount);
				}
			},
			error: function(){
				return false;
			}
		});	
	};
	
	this.queryWorkingLogCount = function(){
		$.ajax({
			url: thisObj.constant.context + '/workingLog/queryWorkingLogCount.htm',
			type: 'POST',
			async: false,
			dataType: "json",
			success: function(data){
				if(data.flag){
					$("#returnLogAllCount").html(data.returnLogAllCount);
					$("#approvingLogAllCount").html(data.approvingLogAllCount);
					//add wangxuan 已审核所有
					$("#approvedAllCount").html(data.approvedMonthAllCount+data.approvedWeeklyAllCount+data.approvedDailyAllCount);
					$("#approvedMonthAllCount").html(data.approvedMonthAllCount);
					$("#approvedWeeklyAllCount").html(data.approvedWeeklyAllCount);
					$("#approvedDailyAllCount").html(data.approvedDailyAllCount);
					$("#approvingLogDailyCount").html(data.approvingLogDailyCount);
					$("#approvingLogWeekCount").html(data.approvingLogWeekCount);
					$("#approvingLogMonthCount").html(data.approvingLogMonthCount);
					
					
					$("#deptDailyAllCount").html(data.deptDailyAllCount);
					$("#deptMonthAllCount").html(data.deptMonthAllCount);
					$("#deptWeekAllCount").html(data.deptWeekAllCount);
					
					
				}
			},
			error: function(){
				return false;
			}
		});	
	};
	
	this.queryHintMyLogCount = function(){
		$.ajax({
			url: thisObj.constant.context + '/workingLog/queryMyLogCount.htm',
			type: 'POST',
			async: false,
			dataType: "json",
			success: function(data){
				if(data.flag){
					var approvedMonthCount = Number(data.approvedMonthCount);
					var approvedWeeklyCount = Number(data.approvedWeeklyCount);
					var approvedDailyCount = Number(data.approvedDailyCount);
					$("#hintreturnLogCount").html(data.returnLogCount);
					$("#hintapprovingLogCount").html(data.approvingLogCount);
					$("#hintapprovedCount").html(approvedMonthCount + approvedWeeklyCount + approvedDailyCount);
				}
			},
			error: function(){
				return false;
			}
		});	
	};
	
	this.queryHintWorkingLogCount = function(){
		$.ajax({
			url: thisObj.constant.context + '/workingLog/queryWorkingLogCount.htm',
			type: 'POST',
			async: false,
			dataType: "json",
			success: function(data){
				if(data.flag){
					$("#hintapprovingLogAllCount").html(data.approvingLogAllCount);
					var approvedMonthCount = Number(data.approvedMonthAllCount);
					var approvedWeeklyCount = Number(data.approvedWeeklyAllCount);
					var approvedDailyCount = Number(data.approvedDailyAllCount);
					var total = Number(approvedMonthCount + approvedWeeklyCount + approvedDailyCount);
					$("#hintapprovedAllCount").html(data.approvedAllCount);
				}
			},
			error: function(){
				return false;
			}
		});	
	};
	
	this.queryHintPresidentWorkingLogCount = function(){
		$.ajax({
			url: thisObj.constant.context + '/workingLog/queryHintPresidentLogCount.htm',
			type: 'POST',
			async: false,
			dataType: "json",
			success: function(data){
				if(data.flag){
					$("#hintapprovingLogAllCount").html(data.approvingLogAllCount);
					$("#hintapprovedAllCount").html(data.approvedLogAllCount);
				}
			},
			error: function(){
				return false;
			}
		});	
	};
	
	this.queryOrgsByOrgType = function(obj){
	
		var orgType = $(obj).val();
		
		if(iuspUtil.isEmpty(orgType)){
			$("#deptCode").html("<option value=''>查询部门</option>");
		} else {
			$.ajax({
				url: thisObj.constant.context + '/workingLog/queryOrgsByOrgType.htm',
				type: 'POST',
				async: false,
				dataType: "json",
				data: {orgType : orgType},
				success: function(data){
					if(data.flag){
						var htmlStr = "<option value=''>查询部门</option>";
						var orgs =  eval("(" + data.data + ")");
						$.each(orgs, function(index,org){
							htmlStr += "<option value='"+org.orgCode+"'>"+org.orgName+"</option>";
						});
						$("#deptCode").html(htmlStr);
					}
				},
				error: function(){
					return false;
				}
			});	
		}
	};
	
	this.gotoPage = function(url){
		url = url + "&m=" + $("#menuName").val(); 
		window.location.href=url;
	};
	this.gotoEditPage = function(url){
		url = url + "&m=" + $("#menuName").val(); 
		window.location.href=url;
	};
		
};

var workingLog = new WorkingLog();