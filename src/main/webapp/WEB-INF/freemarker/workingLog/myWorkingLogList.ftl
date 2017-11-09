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
					workingLog.myWorkingListInit();
				});
		 </script>
	</head>
<body>


<#include "/include/header.ftl"/>
<!-- wangxuan 2014-12-11 -->
<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
	<a href="${base}/index"><img style="vertical-align:middle;" src="${resRoot}/images/fz.png" /><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;">首页></span></a>
	<span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/workingLog/daily">工作汇报</a>><#if logStatus=='02'>我的待审核<#if logType=='01'>日报<#elseif logType=='02'>周报<#elseif logType=='03'>月报</#if><#elseif logStatus=='03'>我的<#if ysh='01'>已审核</#if><#if logType=='01'>日报<#elseif logType=='02'>周报<#elseif logType=='03'>月报</#if><#elseif logStatus=='04'><#if wd='01'>我的</#if>退回</#if></span>
				<input type="hidden" id="logStatus" value="${logStatus}"/>
				<#if sessionUser.positionCode != '006'>
					<input type="hidden" id="logType" value="01"/>
				<#else>
					<input type="hidden" id="logType" value="${logType}"/>
				</#if>
</div>
<div class="colum-wrap clearfix" >
<!-- wangxuan 2014-12-11 -->
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
		<form>
		    <table id="pTabDiv" width="760" border="0" bordercolor="#D8D8D8"  style="float:left;  margin-left:10px; padding-bottom:10px;">
		    	<tr>
			    	<td colspan="5" style="border-right:hidden;border-top:hidden;border:0;padding-top:5px;padding-bottom:5px;font-size:13px">
			    	<#if logStatus!='02' && logStatus!='04'>
						<div style="float:right; margin-left:5px;padding-bottom:10px; padding-top:10px;">
				              日志时间：
				             <!--许昆20141211修改 日期查询的加入了 结束时间不能小于开始时间，开始时间不能大于结束的控制，月报的改成按照月查询-->
					         <#if logType=='02'>
					             <select id="week" style="width:80px;border-color:#D8D8D8;height:22px;vertical-align:middle;">
					             	<option value="">周数</option>
					             	<#list 1..weekCount as week><option value="${week}">第${week}周</option></#list>
					             </select>
				             <#elseif logType=='03'>
				              	
					            <input readonly type="text" class="Wdate dateStyle" style="width:80px;font-size:9px;border-color:#D8D8D8;" id="logTimeBegin" onfocus="WdatePicker({dateFmt:'yyyy-MM',maxDate:'#F{$dp.$D(\'logTimeEnd\')}'})"/>
					                        至
					            <input readonly type="text" class="Wdate dateStyle" style="width:80px;font-size:9px;border-color:#D8D8D8;" id="logTimeEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'logTimeBegin\')}'})"/>
							 <#else> 
					                        
					            <input readonly type="text" class="Wdate dateStyle" style="width:80px;font-size:9px;border-color:#D8D8D8;"  id="logTimeBegin" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'logTimeEnd\')}'})"/>
					           	至
					            <input readonly type="text" class="Wdate dateStyle" style="width:80px;font-size:9px;border-color:#D8D8D8;"  id="logTimeEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'logTimeBegin\')}'})"/>
							 </#if>
				              &nbsp;提交时间：
				            <input readonly type="text" class="Wdate" id="fillTimeBegin" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" style="width:80px;border-color:#D8D8D8;font-size:9px;height:22px;vertical-align:middle;" />
				            至
				            <input readonly type="text" class="Wdate" id="fillTimeEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" style="width:80px;border-color:#D8D8D8;font-size:9px;height:22px;vertical-align:middle;" />
				            
				            <select id="score" style="height:24px; font-size:10px;vertical-align:middle;">
				             	<option value="" selected>评分</option>
				             	<option value="合格">合格</option>
						     	<option value="优良">优良</option>
						     	<option value="不合格">不合格</option>
				             </select>
				            <!-- 王璇 2014-12-1
				            <input type="text" id="approver" value="审核人" onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}"
				             style="color:#999999;vertical-align:middle;height:20px;" size="5"> -->
			    		 	<input type="text" id="keywords" value="关键字" onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}"
			    		 	 style="color:#999999;vertical-align:middle; height:20px;" size="6">
			             	<input id="mySearch" value="查询" type="button" style="padding:4px; border:none; background-color:#00a0ef; color:#FFF; height:24px;vertical-align:middle;">
			             	<input  value="重置" type="reset" style=" padding:4px;vertical-align:bottom; border:none; background-color:#00a0ef; color:#FFF; height:24px;vertical-align:middle;">
			            </div>
			            </#if>
			        </td>
			    </tr>
			    <tr>
			    	<td width="30px" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
			        </td>
			        <#if logStatus = '03' >
			        <#if logType='01'>
			        <td mark="tab" logType="01" class="ptab" width="30px">	
			    		日报
			    	</td>
			    	<#elseif logType='02'>
			    	<td mark="tab" logType="02" class="ptab" width="30px">	
			    		周报
			    	</td>
			    	<#elseif logType='03'>
			    	<td mark="tab" logType="03" class="ptab" width="30px">	
			    		月报
			    	</td>
			    	<#elseif ysh='01'>
			    	<td mark="tab" logType="01" class="ptab">	
			    		日报
			    	</td>
			    	<td mark="tab" logType="02" class="ptabn">	
			    		周报
			    	</td>
			    	<td mark="tab" logType="03" class="ptabn">	
			    		月报
			    	</td>
			    	</#if>
			    	<td width="470px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;text-align:right">		 
			        </td>
			        <#elseif logStatus = '04' || logStatus = '02'>
			    	<td mark="tab" logType="01" class="ptabn">	
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
			    	<#else>
				        <#if logType = '01'>
					    	<td mark="tab" logType="01" class="ptab">	
					    		日报
					    	</td>
				    	</#if>
				    	<#if logType = '02'>
					    	<td mark="tab" logType="02" class="ptabn">	
					    		周报
					    	</td>
				    	</#if>
				    	<#if logType = '03'>
					    	<td mark="tab" logType="03" class="ptabn">	
					    		月报
					    	</td>
				    	</#if>
				    	<td width="670px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;text-align:right">		 
			        	</td>
			    	</#if>
			    </tr>
			    <tr style="height:10px"><td></td></tr>
			</table>
			</form>
		    <div id="logGrid" class="grid"></div>
		</div>
	</div>
</div>
<#include "/include/footer.ftl"/>
</body>