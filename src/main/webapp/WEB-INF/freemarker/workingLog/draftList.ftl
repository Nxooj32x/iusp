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
	    <link href="${resRoot}/css/page.css" rel="stylesheet" type="text/css" />
	    <title>南航金城学院信息化服务平台 - 工作日志</title>
	    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
	    <script type="text/javascript" src="${resRoot}/js/workingLog/workingLog.js"></script>
	    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
	     <script language="javascript" type="text/javascript" src="${resRoot}/js/utils/My97DatePicker/WdatePicker.js"></script>
	     <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/page.js"></script>
	    
	    <script type="text/javascript" language="javascript">
				$(function(){
					workingLog.init('${resRoot}','${base}');
					workingLog.draftInit();
				});
		 </script>
	</head>
<body>


<#include "/include/header.ftl"/>
<!-- wangxuan 2014-12-11 -->
<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
	<a href="${base}/index"><img style="vertical-align:middle;" src="${resRoot}/images/fz.png" /><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;">首页></span></a>
	<span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/workingLog/daily">工作汇报</a>>草稿箱</span>
	<input type="hidden" id="logStatus" value="01"/>
	<input type="hidden" id="logType" value="01"/>
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
		<div class="rightdiv" >  
		    <table id="pTabDiv" width="760" border="1px" bordercolor="#D8D8D8"  style="float:left; margin-top:10px; margin-left:10px;">
			    <tr>
			    	<td width="30px;" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
			        </td>
			    	<td mark="tab" logType="01" class="ptab">	
			    		日报
			    	</td>
			    	<td mark="tab" logType="02" class="ptabn">	
			    		周报
			    	</td>
			    	<td mark="tab" logType="03" class="ptabn">	
			    		月报
			    	</td>
			    	<td width="470px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;text-align:right">
			        </td>
			    </tr>
		    </table>
	  	    <div id="logGrid" class="grid"></div>
		</div>
	</div>
</div>
<#include "/include/footer.ftl"/>
</body>