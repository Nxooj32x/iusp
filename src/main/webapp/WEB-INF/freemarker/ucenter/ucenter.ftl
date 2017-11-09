<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 
    <meta name="description" content="南航金城学院信息户服务平台" />
    <meta name="keywords" content="南航金城学院信息户服务平台" />
    <!-- IE8 兼容 -->
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <link href="${resRoot}/css/base.css"  rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="${resRoot}/css/day.css" />
    <title>南航金城学院信息化服务平台</title>
   
    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
    <script type="text/javascript" src="${resRoot}/js/workingLog/workingLog.js"></script>
    <script type="text/javascript" src="${resRoot}/js/repair/repair.js"></script>
    <script type="text/javascript" src="${resRoot}/js/login/login.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
    
    <script type="text/javascript" language="javascript">
			$(function(){
				//wangxuan 2014-12-9 后勤报修统计
				repair.init('${resRoot}','${base}');
				repair.queryMenuCount();
				workingLog.init('${resRoot}','${base}');
				login.setOverallVeriable('${resRoot}','${base}');
				if('${sessionUser.positionCode}' == '001' || '${sessionUser.positionCode}' == '002' || '${sessionUser.positionCode}' == '003'){
					workingLog.queryHintPresidentWorkingLogCount("wi");
				} else if('${sessionUser.positionCode}' != '001' && '${sessionUser.positionCode}' != '002' && '${sessionUser.positionCode}' != '003'){
					workingLog.queryHintWorkingLogCount("wi");
					workingLog.queryHintMyLogCount("wi");
				} 
			});
	</script>
	        <style> 
        .black_overlay{ 
            display: none; 
            position: absolute; 
            top: 0%; 
            left: 0%; 
            width: 100%; 
            height: 100%;  
            z-index:1001; 
            -moz-opacity: 0.8; 
            opacity:.80; 
            filter: alpha(opacity=88); 
        } 
        .white_content { 
            display: none; 
            position: absolute; 
            top: 40%; 
            left: 45%; 
            width: 400px; 
            height: 220px; 
            padding-top: 20px; 
            padding-left: 6px; 
             padding-right: 6px; 
              padding-bottom: 15px; 
            border: 1px solid #63acd9; 
            background-color: white; 
            z-index:1002; 
        } 
    </style> 
</head>
<body>

<#include "/include/header.ftl"/>

<div class="colum-wrap2 clearfix" >
<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
<div class="leftdiv">
	<p class="pdro" style="color:#666;margin-top:10px">个人信息</p>
    <hr  width="94%;" style="border:1px solid #D8D8D8; margin-left:3px; border-bottom:0px; border-left:0px;" >
	<div style="width:90%;min-height:25px;line-height:25px;margin:10px auto;font-size:12px">
		<img src="${resRoot}/images/people.png" alt=""/>
		<br/>
		<#if sessionUser.roleCode == '1'>
			姓　名：${sessionUser.realName}<br/>
			学　号：${sessionUser.userName}
			<br/>
			职　位：${sessionUser.positionName}
			<br/>
			院　系：${sessionUser.orgName}
		<#elseif sessionUser.roleCode == '2'>
			姓　名：${sessionUser.realName}<br/>
			工　号：${sessionUser.userName}
			<br/>
			职　位：${sessionUser.positionName}
			<br/>
			部　门：${sessionUser.orgName}
		<#elseif sessionUser.roleCode == '3'>
			用户名：${sessionUser.userName}
			<br/>
			角　色：管理员
		</#if>
	</div>
	<hr  width="94%;" style="border:1px solid #D8D8D8; margin-left:3px; border-bottom:0px; border-left:0px;" >
	<div style="width:90%;height:25px;line-height:25px;margin:5px auto;" >
		<a href="${base}/user/modifyBasicInfo"><font style="color:#4ebdfc;">个人资料</font></a>&nbsp;&nbsp;
		<a href="${base}/user/changePwd"><font style="color:#4ebdfc;">修改密码</font></a>
	</div>
	<hr  width="94%;" style="border:1px solid #D8D8D8; margin-left:3px; border-bottom:0px; border-left:0px;" >
   <!-- 王涛2014-11-23-->
	<div style="width:100%;min-height:20px;line-height:20px;margin:8px auto;font-size:12px">
		<span >在线人数：<font style="color:red;">${sessionCount}人</font></span></br>
		<#include "/ucenter/orgTree.ftl"/>
	</div>
</div>

<div class="rightdiv" style="font-size:12px">
	<p class="pdro" style="padding-left:13px;margin-top:8px">首页</p>
    <hr  width="730px;" style="border:1px solid #D8D8D8; border-bottom:0px; border-left:0px;" >
    <div class="hint" >
    	提醒事项
    </div>
    <#if sessionUser.roleCode != '4'>
     <#if sessionUser.positionCode == '006'>
     	  <div style="width:95%;height:35px;line-height:35px;border-bottom:1px #EEE solid;margin:5px auto;">
		      <div style="width:45.5%;" class="approvaling-bg">
		    	<span style="margin-left:25px;"><a href="${base}/workingLog/myWorkingLog?logType=01&logStatus=02" style="color:green">您的工作日志等待审核（<span style="color:red"><span id="hintapprovingLogCount">0</span>条</span>）</a></span>
		      </div>
	    	  <#if lastDailySubmited == 'N'>
		    	  <div style="width:45.5%;" class="warning-right" >
			  		<span style="margin-left:25px;color:green">您昨天工作日报未提交</span>
			      </div>
		      <#else>
		      	 <div style="width:45.5%;" class="approvaled-right">
			     	<span style="margin-left:25px;color:green">您昨天的工作日报已提交</span>
			     </div>
		       </#if>
	     </div>
    <#elseif sessionUser.positionCode == '004' || sessionUser.positionCode == '005'>
	     <div style="width:95%;height:35px;line-height:35px;border-bottom:1px #EEE solid;margin:5px auto;">
		      <div style="width:50%;" class="approvaling-bg">
		      	  <span style="margin-left:25px;"><a href="${base}/workingLog/workingLogs?logType=01&logStatus=02" style="color:green">等待您审核的工作日志（<span style="color:red"><span id="hintapprovingLogAllCount">0</span> 条</span>）</a></span>
		      </div>
		      
		      <#if lastDailySubmited == 'N'>
		    	  <div style="width:45.5%;" class="warning-right" >
			    		<span style="margin-left:25px;color:green">您昨天的工作日报未提交</span>
			      </div>
		      <#else>
		      	 <div style="width:45.5%;" class="approvaled-right">
			    		<span style="margin-left:25px;color:green">您昨天工作日报已提交</span>
			      </div>
		       </#if>
	     </div>
    </#if>
    
     <#if sessionUser.positionCode != '001' && sessionUser.positionCode != '002' && sessionUser.positionCode != '003'>
     	  <div style="width:95%;height:35px;line-height:35px;border-bottom:1px #EEE solid;margin:5px auto;">
		      <div style="width:50%;" class="approvaled-bg">
		      	  <span style="margin-left:25px"><a href="${base}/workingLog/myWorkingLog?logType=01&logStatus=03" style="color:green">您的工作日志已通过审核（<span style="color:red"><span id="hintapprovedCount">0</span> 条</span>）</a></span>
		      </div>
		      
		      <#if nowDailySubmited == 'N'>
		    	  <div style="width:45.5%;" class="warning-right" >
			    		<span style="margin-left:25px;color:green">您今日工作日报未提交</span>
			      </div>
		      <#else>
		      	<div style="width:45.5%;" class="approvaled-right">
			    		<span style="margin-left:25px;color:green">您今日工作日报已提交</span>
			      </div>
		       </#if>
	     </div>
	     
	     <div style="width:95%;height:35px;line-height:35px;border-bottom:1px #EEE solid;margin:5px auto;">
		      <div style="width:40%;" class="return-bg">
		    		<span style="margin-left:25px;"><a href="${base}/workingLog/myWorkingLog?logType=01&logStatus=04" style="color:green">退回工作日志（<span style="color:red"><span id="hintreturnLogCount">0</span> 条</span>）</a></span>
		      </div>
		      
		      <#if nowWeeklySubmited != 'Y'>
		    	  <div style="width:45.5%;" class="warning-right" >
			    		<span style="margin-left:25px;color:green">您本周工作日报未提交</span>
			      </div>
		      <#else>
		      	 <div style="width:45.5%;" class="approvaled-right">
			    		<span style="margin-left:25px;color:green">您本周工作日报已提交</span>
			      </div>
		       </#if>
	     </div>
	 <#elseif sessionUser.positionCode == '001' || sessionUser.positionCode == '002' || sessionUser.positionCode == '003'>
	 	  <div style="width:95%;height:35px;line-height:35px;border-bottom:1px #EEE solid;margin:5px auto;">
		 	  	<div style="width:40%;" class="approvaling-bg">
		    		<span style="margin-left:25px;"><a href="${base}/workingLog/presidentLogs?logType=01&logStatus=02" style="color:green">等待您审核的工作日志（<span style="color:red"><span id="hintapprovingLogAllCount">0</span> 条</span>）</a></span>
		      	</div>
		      	 <div style="width:45.5%;" class="warning-right">
			    		<span style="margin-left:25px"><a href="${base}/repair/forward?pageName=myApproveTask" style="color:green">等待您审批的后勤任务(<span class="color1" id = "myUnfinishedTask">0</span>)</a></span>
			     </div>
	       </div>
	       <div style="width:95%;height:35px;line-height:35px;border-bottom:1px #EEE solid;margin:5px auto;">
			 	 <div style="width:40%;" class="approvaled-bg">
			    		<span style="margin-left:25px;"><a href="${base}/workingLog/presidentLogs?logType=01&logStatus=03" style="color:green">您已审批通过的工作日志（<span style="color:red"><span id="hintapprovedAllCount">0</span> 条</span>）</a></span>
			     </div>
	       </div>
	 <#else>
	 	<div style="width:95%;height:35px;line-height:35px;border-bottom:1px #EEE solid;margin:5px auto;">
	 	  	<div style="width:40%;" class="approvaling-bg">
	    		<span style="margin-left:25px;"><a href="${base}/workingLog/workingLogs?logType=01&logStatus=02" style="color:green">等待您审核的工作日志（<span style="color:red"><span id="approvingAllCount">0</span> 条</span>）</a></span>
	      	</div>
      	</div>
       	<div style="width:95%;height:35px;line-height:35px;border-bottom:1px #EEE solid;margin:5px auto;">
		 	<div style="width:40%;" class="approvaled-bg">
		    	<span style="margin-left:25px;"><a href="${base}/workingLog/workingLogs?logType=01&logStatus=03" style="color:green">您已审批通过的工作日志（<span style="color:red"><span id="approvedAllCount">0</span> 条</span>）</a></span>
		    </div>
      	</div>
 	</#if>
 </#if>
<!-- 王璇 2014-12-09 后勤报修统计--->
 <div style="width:95%;height:35px;line-height:35px;border-bottom:1px #EEE solid;margin:5px auto;">
					 	 <div style="width:40%;" class="approvaled-bg">
					    		<span style="margin-left:25px;"><a href="${base}/repair/forward?pageName=lcd" style="color:green">您的未评价的后勤报修（<span style="color:red"><span id="myUnRemark">0</span> 条</span>）</a></span>
					     </div>
			      	
<!--员工可能会出现兼岗的情况，所以这里的判断需对登陆人每个岗位进行判断，有一个符合则显示-->
 <#assign isAllow = 'N' >
	  	<#if sessionUser.users?? && sessionUser.users?size gt 0>
	  		<#list sessionUser.users as data>
  				<#if (sessionUser.orgCode == '72' && sessionUser.positionCode == '007') || 
				  		(sessionUser.orgCode == '72' && sessionUser.isManager == 'Y') || 
				  		sessionUser.positionCode == '003' || sessionUser.positionCode == '001'>
				  	<#assign isAllow = 'Y' >
				</#if>
	  		</#list>
	  	</#if>
 <#if sessionUser.roleCode == '4' || isAllow == 'Y'>
   <#if sessionUser.positionCode != '001' && sessionUser.positionCode != '002' && sessionUser.positionCode != '003'>
					 	 <div style="width:45.5%;" class="warning-right">
					    		<span style="margin-left:25px"><a href="${base}/repair/forward?pageName=myApproveTask" style="color:green">等待您审批的后勤任务(<span class="color1" id = "myUnfinishedTask">0</span>)</a></span>
					     </div>
					     </#if>

</#if>
 </div>
     <!-- -->
    <div class="colum" style="width:94%;margin:0 auto;font-size:12px">
        <div class="hot" style="width:330px;margin-top:20px"">
            <h2 class="t">最新热点</h2>
            <#if newsList?? && newsList?size &gt; 0>
            <ul class="hot-list">
              <#list newsList as data>
	              <li class="clearfix">
	                    <div class="hot-l">
	                        <span class="num   num1 " style="font-size:11px">${data.createTime?string("dd")}</span><span class="date" style="font-size:11px">${data.createTime?string("yyyy-MM")}</span>
	                    </div>
	                    <div class="hot-r">
	                        <p class="title">
	                        	<a href="${base}/article?id=${data.id}" sub-line="1" target="_blank">
	                        		<#if data.title?length lt 15>   
			               				${data.title}
									<#else> 
									     ${data.title[0..15]}... 
									</#if>  
	                        	</a>
	                        </p>
	                        <div class="des" sub-line="2">
		                        <#if data.summary?length lt 60>   
		               				${data.summary}...
								<#else> 
								     ${data.summary[0..60]}... 
								</#if>                       
	                      	</div>
	                    </div>
	               </li>
              </#list>
            </ul>
          	<div style="margin-top: 13px;padding-left: 7px;">
           		 <a href="${base}/hot" tppabs="" style="color: #E74F26;font-family: '宋体';">详细 ></a>
          	</div>
          </#if>
        </div> 
         <!-- 前面规定图标，修改人:wangtao,修改时间：2014-11-24 -->
         <div class="hot" style="width:330px;float:right;margin-top:20px"">
          <h2 class="t">常用软件下载</h2>
                      <#if softList?? && softList?size &gt; 0>
            <ul class="hot-list">
              <#list softList as data>
	              <li class="clearfix">
	                    <div class="hot-l">
	                        <span class="num   num1 " style="font-size:11px">${data.createTime?string("dd")}</span><span class="date" style="font-size:11px">${data.createTime?string("yyyy-MM")}</span>
	                    </div>
	                    <div class="hot-r">
	                        <p class="title">
	                        	<a href="${base}/${data.downaddr}" sub-line="1" target="_blank">
	                        		<#if data.downName?length lt 15>   
			               				${data.downName}
									<#else> 
									     ${data.downName[0..15]}... 
									</#if>  
	                        	</a>
	                        </p>
	                        <div class="des" sub-line="2">
		                        <#if data.descinfo?length lt 15>   
		               				${data.descinfo}
								<#else> 
								     ${data.descinfo[0..15]}... 
								</#if>                       
	                      	</div>
	                    </div>
	               </li>
              </#list>
            </ul>
          	<div style="margin-top: 13px;padding-left: 7px;">
           		 <a href="${base}/soft" tppabs="" style="color: #E74F26;font-family: '宋体';">详细 ></a><!--//增加界面需求，修改人：王涛 -->
          	</div>
          </#if>
        </div>
       <div style="clear:both;width:100%"></div>
        <div class="notice" style="width:330px;float:left;margin-left:0;margin-top:20px">
           <h2 class="t">通知公告</h2>
            <#if announceList?? && announceList?size &gt; 0>
            <ul class="notice-list">
              <#list announceList as data>
            	 <li>
                 	<span class="time">${data.createTime?string("yyyy.MM")}</span>
                 	<a href="${base}/article?id=${data.id}" style="margin-left:10px" tppabs="" sub-line="1" target="_blank">
                 		<#if data.title?length lt 15>   
               				${data.title}
						<#else> 
						     ${data.title[0..15]}... 
						</#if>  
                 	</a>
                 </li>
              </#list>
          </ul>
       	  <div style="margin-top: 15px;padding-left: 7px;">
       		<a href="${base}/announcement"  style="color: #E74F26;font-family: '宋体';">详细 ></a>
       	  </div>   
       	  </#if>
        </div>
         <div class="notice" style="width:330px;float:right;margin-top:20px">
           <h2 class="t">办事指南</h2>
            <#if znList?? && znList?size &gt; 0>
            <ul class="notice-list">
              <#list znList as data>
            	 <li>
                 	<span class="time">${data.createTime?string("yyyy.MM")}</span>
                 	<a href="${base}/article?id=${data.id}" style="margin-left:10px" tppabs="" sub-line="1" target="_blank">
                 		<#if data.title?length lt 15>   
               				${data.title}
						<#else> 
						     ${data.title[0..15]}... 
						</#if>  
                 	</a>
                 </li>
              </#list>
          </ul>
       	  <div style="margin-top: 15px;padding-left: 7px;">
       		<a href="${base}/guide"  style="color: #E74F26;font-family: '宋体';">详细 ></a>
       	  </div>   
       	  </#if>
           
        </div>
  	</div>
  	</div>
	<div style="clear:both"></div>
</div>
</div>
</div>

<#include "/include/ucenterFooter.ftl"/>
</body>