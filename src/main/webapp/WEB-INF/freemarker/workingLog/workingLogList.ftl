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
					workingLog.deptInit();
					//workingLog.approveWorkingLogBatchInit();
				});
		 </script>
	</head>
<body>


<#include "/include/header.ftl"/>
<!-- wangxuan 2014-12-11 -->
<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
	<a href="${base}/index"><img style="vertical-align:middle;" src="${resRoot}/images/fz.png" /><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;">首页></span></a>
	<span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/workingLog/daily">工作汇报</a>><#if logStatus=='02'>待审核<#if Dsh=='01'>日报<#elseif Dsh=='02'>周报<#elseif Dsh=='03'>月报</#if><#elseif logStatus=='03'>部门<#if Dsh=='01'>日报<#elseif Dsh=='02'>周报<#elseif Dsh=='03'>月报</#if></#if></span>
				<input type="hidden" id="logStatus" value="${logStatus}"/>
				<input type="hidden" id="logType" value="${logType}"/>
				<input type="hidden" id="isDept" value="${isDept}"/>
				<input type="hidden" id="Dsh" value="${Dsh}"/>
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
		<div class="rightdiv" >
		   <table width="760" bordercolor="#D8D8D8"  style="float:left; margin-top:10px; margin-left:10px; border:0px;font-size:10px;">
		   <form>
		   <#if logStatus != '02'>
			   <#if sessionUser.positionCode=='001' ||  sessionUser.positionCode=='002' || sessionUser.positionCode=='003'>
			   <tr>
				    	<td width="30px;" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
				        </td>
				    	<td style="font-size:15px; color:#666;border:1px #D8D8D8 solid; border-bottom:0;border-bottom:hidden;height:30px;text-align:center">	
				    		<#if logType=='01'>日报<#elseif logType=='02'>周报<#elseif logType=='03'>月报</#if>
				    	</td>
				    	<td width="650px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
							
				        </td>
				    </tr>
			   	  	<tr >
				    	<td colspan='3' width="650px" style="border-right:hidden;border-top:hidden;border:0;padding-top:5px;padding-bottom:10px">
							<!--部门负责人或者部门副职直接查询自己部门教职工的日志-->
							<#if sessionUser.positionCode=='001' ||  sessionUser.positionCode=='002'>
								<div style="margin-left:10px; float:right;" >         		
									<select style="height:25px; width:90px;" id="deptCode"><!--修改样式-->
										<option value="">部门</option>
						            </select>  
					            </div>
					        	<div style="margin-left:10px; float:right;" >         		
									<select style="height:25px; font-size:11px;" id="orgType" onchange="workingLog.queryOrgsByOrgType(this)">
										<option value="">部门属性</option>
						            	<option value="01">领导层</option>
						                <option value="02">行政部门</option>
						                <option value="03">直属部门</option>
						                <option value="04">教学部门</option>
						            </select> 
					 			</div>
				            </#if>
				            <#if sessionUser.positionCode='003'>
				            	<div style="margin-left:5px; float:right; " >         		
									<select style="height:27px; border:1px solid #CCC;" id="deptCode">
										<#list depts as data>
						            		<option value="${data.orgCode}">${data.orgName}</option>
						                </#list>
						            </select> 
					 			</div>
				            </#if>
				        </td>
				    </tr>
				    </#if>
			 	  	<tr>
				    	<td colspan='3' width="650px;" style="border-right:hidden;border-top:hidden;border:0;padding-top:10px;padding-bottom:5px;font-size:14px;">
							<div style="float:right; margin-left:5px; margin-bottom:15px;">
					           日志时间：
					         <!--许昆20141211修改 日期查询的加入了 结束时间不能小于开始时间，开始时间不能大于结束的控制，月报的改成按照月查询-->
					         <#if logType=='02'>
					             <select id="week" style="width:80px;border-color:#D8D8D8;height:22px;vertical-align:middle;">
					             	<option value="">周数</option>
					             	<#list 1..weekCount as week><option value="${week}">第${week}周</option></#list>
					             </select>
				             <#elseif logType=='03'>
				              	从
					            <input readonly type="text" class="Wdate dateStyle" style="width:80px;font-size:9px;border-color:#D8D8D8;" id="logTimeBegin" onfocus="WdatePicker({dateFmt:'yyyy-MM',maxDate:'#F{$dp.$D(\'logTimeEnd\')}'})"/>月
					                        至
					            <input readonly type="text" class="Wdate dateStyle" style="width:80px;font-size:9px;border-color:#D8D8D8;" id="logTimeEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'logTimeBegin\')}'})"/>月
							 <#else> 
					                        从
					            <input readonly type="text" class="Wdate dateStyle" style="width:80px;font-size:9px;border-color:#D8D8D8;"  id="logTimeBegin" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'logTimeEnd\')}'})"/>
					           	至
					            <input readonly type="text" class="Wdate dateStyle" style="width:80px;font-size:9px;border-color:#D8D8D8;"  id="logTimeEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'logTimeBegin\')}'})"/>
							 </#if>
					            <!--  提交时间
					            <input readonly type="text" class="Wdate" id="fillTimeBegin" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" style="width:82px;border-color:#D8D8D8;font-size:10px;" />
					            	至
					            <input readonly type="text" class="Wdate" id="fillTimeEnd" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" style="width:82px;border-color:#D8D8D8;font-size:10px;" />
				           		-->
				           		
								<input type="text" id="staffNo" value="查询工号" onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}" style="color:#999999;vertical-align:middle;height:22px;margin-left:5px" size="8">
					            <input type="text" id="staffName" value="查询姓名" onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}" style="color:#999999;vertical-align:middle;height:22px;" size="6">
					             <!--02：已提交，03：审批通过，04：审批不通过（退回）状态：-->
					             <!-- 王璇 查看本部门工作汇报去掉状态--->
					             <!--
					             <select id="logStatus" style="height:24px; font-size:10px;vertical-align:bottom;">
					             	<option value="" selected="selected" disabled="disabled">状态</option>
					             	<option value="02">已提交</option>
					             	<option value="03">审批通过</option>
					             	<option value="04">退回</option>
					             </select>
					             -->
					               <!--02：已提交，03：审批通过，04：审批不通过（退回）-->
					             <select id="score" style="height:25px; font-size:10px;vertical-align:middle;">
					             	<option value="" selected="selected" disabled="disabled">评分</option>
					             	<option value="合格">合格</option>
							     	<option value="优良">优良</option>
							     	<option value="不合格">不合格</option>
					             </select>
					             <!-- 王璇 2014-12-1  --->
							      <!--<input type="text" id="approver" value="审核人" onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}" style="color:#999999;vertical-align:bottom;height:20px;" size="6">
							      -->
					             <input type="text" id="keywords" value="关键字" onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}" style="color:#999999;vertical-align:middle;height:22px;" size="10">
					             <input id="deptSearch"  type="button" style="border:none; background-image:url(${base}/RES/images/check.png);height:24px;width:43px;vertical-align:middle;">
					             <input  value="重置" type="reset" style="padding-left:8px;padding-right:8px;vertical-align:middle; border:none; background-color:#4cc1fc; color:#FFF; height:24px;margin-right:8px;">
				            </div>
				        </td>
				    </tr>    
			    <#else>
			    	<tr>
				    	<td width="30px;" style="border-left:hidden;border-top:hidden; border-bottom:1px solid #D8D8D8;">
				        </td>
				    	<td style="font-size:15px; color:#666;border:1px #D8D8D8 solid; border-bottom:0;border-bottom:hidden;height:30px;text-align:center">	
				    		<#if logType=='01'>日报<#elseif logType=='02'>周报<#elseif logType=='03'>月报</#if>
				    	</td>
				    	<td width="650px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
							<!-- 王璇 2014-12-1 --->
						<!--	<div style="float:right; margin-left:5px;">
					            <input type="text" id="staffNo" value="查询工号" onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}" style="color:#999999;vertical-align:bottom;height:20px;" size="8">
					            <input type="text" id="staffName" value="查询姓名" onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}" style="color:#999999;vertical-align:bottom;height:20px;" size="8">
					            <input id="deptSearch" value="查询" type="submit" style=" padding:4px; border:none; background-color:#00a0ef; color:#FFF; height:24px">
					            <input  value="重置" type="reset" style=" padding:4px;vertical-align:bottom; border:none; background-color:#00a0ef; color:#FFF; height:24px">
					            
				            </div>-->
								<!--部门负责人或者部门副职直接查询自己部门教职工的日志-->
							<#if sessionUser.positionCode=='001' ||  sessionUser.positionCode=='002'>
								<div style="margin-left:10px; float:right;" >         		
									<select style="height:27px; border:1px solid #CCC;" id="deptCode">
										<option value="">部门</option>
						            </select>  
					            </div>
					            
					        	<div style="margin-left:5px; float:right; " >         		
									<select style="height:27px; border:1px solid #CCC;" id="orgType" onchange="workingLog.queryOrgsByOrgType(this)">
										<option value="">部门属性</option>
						            	<option value="01">领导层</option>
						                <option value="02">行政部门</option>
						                <option value="03">直属部门</option>
						                <option value="04">教学部门</option>
						            </select> 
					 			</div>
				            </#if>
				            <#if sessionUser.positionCode=='003'>
				            	<div style="margin-left:5px; float:right; " >         		
									<select style="height:27px; border:1px solid #CCC;" id="deptCode">
										<#list depts as data>
						            		<option value="${data.orgCode}">${data.orgName}</option>
						                </#list>
						            </select> 
					 			</div>
				            </#if>
				            <span  style="float:right;margin-left:50px; margin-top:3px;"></span>
				        </td>
				    </tr>
			    </#if>
			    </form>
		    </table>
		   
		    <div id="logGrid" class="grid"></div>
		    <!--王璇 2014-12-1 -->
		  <#if Session["sessionUser"].getIsManager()=="Y" && logStatus == '02'>
				<table border="0"  style="margin-left:20px; margin-top:30px;">
				<tr><td>
				 &nbsp;&nbsp; 
				  评语：</td>
				  <td>
						<textarea heigh="40px" style="width:500px; height:60px;" id="comment" name="comment" value="" ></textarea>
				  </td>
				  </tr> 
				  <tr><td height="40px">
				  &nbsp;&nbsp; 评分：</td>
				  <td>
					 <select id="approveScore" name="score">
						 <option value="合格">合格</option>
						 <option value="优良">优良</option>
						 <option value="不合格">不合格</option>
				     </select>
				     </td>
				 </tr>
				   </td></tr>
				   
				   <tr>
				   <td colspan="2">
				  &nbsp;&nbsp;<input type="button" class="btn btn-primary" name="checkall" value="批量审核" />
				   </td>
				   </tr>
				 </table> 
		    </#if>
		</div>
	</div>
</div>
<#include "/include/footer.ftl"/>
</body>