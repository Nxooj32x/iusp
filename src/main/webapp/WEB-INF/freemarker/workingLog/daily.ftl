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
    <title>南航金城学院信息化服务平台 - 工作日志</title>
    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
    <script type="text/javascript" src="${resRoot}/js/workingLog/workingLog.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
     <script language="javascript" type="text/javascript" src="${resRoot}/js/utils/My97DatePicker/WdatePicker.js"></script>
    
    <script type="text/javascript" language="javascript">
			$(function(){
				workingLog.init('${resRoot}','${base}');
				workingLog.dailyInit();
			});
	 </script>
</head>
<body>

<#include "/include/header.ftl"/>
 <!-- wangxuan 2014-12-11 -->
<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
	<a href="${base}/index"><img style="vertical-align:middle;" src="${resRoot}/images/fz.png" /><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;">首页></span></a>
	<span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/workingLog/daily">工作汇报</a>&gt;写日报</span>
				
</div> 
<div class="colum-wrap clearfix" >
<hr width=100% style="border:1px solid #D8D8D8; border-left:0px;border-bottom:0px;margin-bottom:0px;" > 
<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
	<div class="leftdiv">
		<#if sessionUser.positionCode = '004' || sessionUser.positionCode = '005' || sessionUser.isManager = 'Y'>
			<#include "/workingLog/deptmenu.ftl"/>
		<#else>
			<#include "/workingLog/menu.ftl"/>
		</#if>
	</div>

	<div class="rightdiv" id="showPanel">
		
		
		<hr width="30px;"  align="left" style="margin-left:5px;margin-top:50px;border-left:0px; float:left;border:1px solid #D8D8D8;border-left:0px;border-bottom:0px; ">
		<div style="float:right; margin-top:19px; margin-right:50px; font-size:15px; color:#666;">日期
			<#if log.logStatus == '04'>
				${log.logTime}
				<input type="hidden" id="logTime" value="${log.logTime}"/>
			<#else>
				<input  type="text" class="Wdate" id="logTime" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" value="${log.logTime}" style="border-color:#D8D8D8;" readonly="readonly"/>
			</#if>
			<input type="hidden" id="logId" value="${log.id}"/>
			<input type="hidden" id="logStatus" value="${log.logStatus}"/>
			<input type="hidden" id="logType" value="01"/>
		</div>
		<table  style="float:left; margin-top:20px;" border="1px" bordercolor="#D8D8D8">
			<tr>
				<td mark="tab" logType="01" class="ptab" style="padding-left:10px;padding-right:10px">	
		    		日　报
		    	</td>
			</tr>
			</table>
			<hr  style="float:left;border:1px solid #D8D8D8;border-bottom:0px;border-left:0px;width:665px">
			<p></p>
			<table  border="1px" bordercolor="#D8D8D8" class="ctab">
		    	<tr  style="background-color:#F5F5F5;height:30px;"><td >&nbsp;&nbsp;今日工作情况</td></tr>
		        <tr style="height:200px;">
		        	<td style="text-align:center">
		        		<textarea style="width:750px;height:195px;border:0;margin-top:5px" id="nowWorkInfo">${log.nowWorkInfo}</textarea>
		        	</td>
		        </tr>
		        <tr style="background-color:#F5F5F5; height:30px;"><td>&nbsp;&nbsp;意见与建议</td></tr>
		        <tr style="height:100px;">
			        <td style="text-align:center">
			        	<textarea style="width:750px;height:85px;border:0;margin-top:5px" id="question">${log.question}</textarea>
			        </td>
		        </tr>
		    </table>
		    <span style="float:left;margin-left:45px; margin-top:20px;color:green" id="msgPanel"></span>
		    <span  style=" float:right; margin-right:5px; margin-top:20px; ">
		    	<input type="button" id="dailySubmit" value="&nbsp;&nbsp;提 &nbsp;交&nbsp;&nbsp;" style="border:0px; background-color:#63ACD9; width:100px; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;">&nbsp;&nbsp;
		        <input type="button" id="dailySaveDraft" value="保存草稿" style=" background-color:#E3E3E3; width:100px; height:30px; border:0px;font-family:'微软雅黑';font-size:16px; color:#666" >&nbsp;&nbsp;
		        <input type="button" onclick="window.location.href='${base}/workingLog/index'" value="&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;" style="border:0px; background-color:#E3E3E3; width:100px; height:30px;font-family:'微软雅黑';font-size:16px; color:#666"  >
		    </span>
		</div>
	</div>
</div>
</div>

<#include "/include/footer.ftl"/>

</body>
