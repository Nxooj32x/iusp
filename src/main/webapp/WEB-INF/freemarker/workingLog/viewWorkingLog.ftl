<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 
    <meta name="description" content="南航金城学院信息户服务平台" />
    <meta name="keywords" content="南航金城学院信息户服务平台" />
    <!-- IE8 兼容 -->
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <link href="${resRoot}/css/base.css"  rel="stylesheet" type="text/css" />
    <link href="${resRoot}/css/day.css" rel="stylesheet" type="text/css" />
    <title>南航金城学院信息化服务平台 - 查看工作汇报</title>
    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
    <script type="text/javascript" src="${resRoot}/js/workingLog/workingLog.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
     <script language="javascript" type="text/javascript" src="${resRoot}/js/utils/My97DatePicker/WdatePicker.js"></script>
    
    <script type="text/javascript" language="javascript">
		$(function(){
			workingLog.init('${resRoot}','${base}');
		});
	 </script>
</head>
<body>

<#include "/include/header.ftl"/>
  <!-- wangxuan 2014-12-11 -->
<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
	<a href="${base}/index"><img style="vertical-align:middle;" src="${resRoot}/images/fz.png" /><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;">首页></span></a>
	<span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/workingLog/daily">工作汇报</a>>查看工作汇报</span>
	<span style="float:right; margin-right:10px; color:#09F;margin-top:15px">查看<#if log.logType=='01'>日报<#elseif log.logType=='02'>周报<#elseif log.logType=='03'>月报</#if>>汇报人：${user.realName}</span>
	<input type="hidden" id="logStatus" value="01"/>
	<input type="hidden" id="logType" value="01"/>
</div>
<div class="colum-wrap clearfix" >
<hr width=100% style="border:1px solid #D8D8D8; border-left:0px;border-bottom:0px;margin-bottom:0px;" > 
	<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
		<div class="leftdiv"> 
			<#if sessionUser.positionCode == '001' || sessionUser.positionCode == '002' || sessionUser.positionCode == '003'>
				<#include "/workingLog/presidentMenu.ftl"/>
			<#elseif sessionUser.positionCode = '004' || sessionUser.positionCode = '005' || sessionUser.isManager = 'Y'>
				<#include "/workingLog/deptmenu.ftl"/>
			<#else>
				<#include "/workingLog/menu.ftl"/>
			</#if>
		</div>
	
		<div class="rightdiv">
			
			<span style="float:right;color: #09F">隶属【${user.orgTypeName}>${user.orgName}】</span>
			<div style="clear:both"></div>
			<table  style="float:left; margin-top:10px; margin-left:10px;" border="1px" bordercolor="#D8D8D8">
				<tr>
					<td width="30px;" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
					</td>
					<td style="font-size:15px; color:#666;border:1px #D8D8D8 solid; border-bottom:0;border-bottom:hidden;height:30px;text-align:center;padding-left:10px;padding-right:10px">	
			    		<#if log.logType=='01'>日报<#elseif log.logType=='02'>周报<#elseif log.logType=='03'>月报</#if>
			    	</td>
					<td width="675px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
						<div style="margin-left:510px">
							日志时间：
							<span ><#if log.logType=='01' || log.logType=='03'>${log.logTime}<#elseif log.logType=='02'>第${log.week}周</#if></span>
						</div>
					</td>
					
				</tr>
			</table>
			<div style="padding-top:50px;">
				<p></p>
				<table  border="1px" bordercolor="#D8D8D8" class="ctab" >
					<tr  style="background-color:#F5F5F5;height:30px;"><td >&nbsp;&nbsp;<#if log.logType=='01'>今日工作情况<#elseif log.logType=='02'>本周工作情况<#elseif log.logType=='03'>本月工作情况</#if></td></tr>
					<tr>
						<td style="text-align:center">
			        		<textarea style="width:750px;height:195px;border:0;margin-top:5px" readonly="readonly">${log.nowWorkInfo}</textarea>
			        	</td>
					</tr>
					<#if log.logType=='02' || log.logType=='03' >
					<tr style="background-color:#F5F5F5; height:30px;"><td>&nbsp;&nbsp;<#if log.logType=='02'>下周工作计划<#elseif log.logType=='03'>下月工作计划</#if></td></tr>
					<tr>
						<td>
							<textarea style="width:750px;height:195px;border:0;margin-top:5px" readonly="readonly">${log.nextWorkInfo}</textarea>
						</td>
					</tr>
					</#if>
					<tr style="background-color:#F5F5F5; height:30px;"><td>&nbsp;&nbsp;意见与建议</td></tr>
					<tr>
						<td>
							<textarea style="width:750px;height:95px;border:0;margin-top:5px" readonly="readonly">${log.question}</textarea>
						</td>
					</tr>
					<#if log.logStatus = '03' || log.logStatus = '04'>
						<tr style="background-color:#F5F5F5; height:30px;"><td>&nbsp;&nbsp;评语</td></tr>
						<tr style="height:100px;"><td  style="padding-left:10px;"><textarea style="width:690px;height:95px;border:0;margin-top:5px" readonly="readonly">${log.comment}</textarea></td></tr>
					</#if>
				</table>
				<#if log.logStatus = '03' || log.logStatus = '04'>
					<span style="float:left; margin-left:40px; margin-top:10px;">${log.score}</span>&nbsp;&nbsp;  
					<span style="float:left; margin-left:10px; color:#09F; margin-top:10px;">审核人：${log.approverName}</span> 
				</#if>
				<span  style=" float:right; margin-right:5px; margin-top:10px; "> 
					<input type="button" value="&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;" onclick="window.history.back();" style="border:0px; background-color:#63ACD9; width:100px; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;"  >
				</span>
			</div>
		</div>
	</div>
</div>

<#include "/include/footer.ftl"/>

</body>
