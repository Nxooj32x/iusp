<!DOCTYPE html>
<!-- 我的报修-->
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
    <title>南航金城学院信息化服务平台 - 后勤报修</title>
    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
    <script type="text/javascript" src="${resRoot}/js/repair/repair.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
    <script language="javascript" type="text/javascript" src="${resRoot}/js/utils/My97DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/page.js"></script>
    
    <script type="text/javascript" language="javascript">
		$(function(){
			repair.myApproveInit('${resRoot}','${base}');
		});
	 </script>
</head>
<body>

<#include "/include/header.ftl"/>
<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
	<img style="vertical-align:middle;" src="${resRoot}/images/fz.png"/><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/index">&nbsp;首页</a>&nbsp;/&nbsp;<a href="/iusp-web/repair/forward?pageName=allRepair">后勤报修</a>&nbsp;</span>
</div>
<div class="form">   
	<hr width=100% style="border:1px solid #D8D8D8; border-left:0px;border-bottom:0px;margin-bottom:0px;" >           
	<div class="colum-wrap clearfix" >
	<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
	<div class="leftdiv"> 
		<#include "/include/repairMenu.ftl"/>
		<input type="hidden" id="module" value="mma"/>
	</div>
	<div class="rightdiv" >
		<table width="760" border="1px" bordercolor="#D8D8D8"  style="float:left; margin-top:10px; margin-left:10px;">
		    <tr>
		    	<td width="30px;" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;"></td>
		    	<td style="border-bottom:hidden;font-size:15px; border-top:1px solid #D8D8D8;border-width:1px; height:30px ; border-left:1px solid #D8D8D8;border-right:1px solid #D8D8D8; ">	
		        <a href="">&nbsp;&nbsp;我的任务&nbsp;&nbsp;</a></td>
		    	<td width="650px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
			      </td>
		    </tr>
	    </table>
	    <div style="padding-top:50px;">
	    	<#if repair??>
		    	<table border="1" style="border:1px solid #D8D8D8;width:780px;float:left; margin-top:10px; margin-left:10px;">
		        	<tr align="center" class="tt">
		        		<td style="border:1px solid #D8D8D8;" height=30px width=150px>报修时间</td>
		        		<td style="border:1px solid #D8D8D8;" height=30px width=150px>
		        			${repair.applayTime?string('yyyy-MM-dd')}
		        			<input type="hidden" id="repairId" value="${repair.id}"/>
		        			<input type="hidden" id="acceptTime" value="${acceptTime}"/>
		        		</td>
		        		<td style="border:1px solid #D8D8D8;" height=30px  width=150px>部门</td>
		        		<td style="border:1px solid #D8D8D8;" height=30px  width=200px>${repair.departName}</td>
					</tr>
					<tr align="center" class="tt">
						<td style="border:1px solid #D8D8D8;" height=30px width=150px>报修人</td>
						<td style="border:1px solid #D8D8D8;">${repair.applayStaffName}</td>
						<td style="border:1px solid #D8D8D8;" height=30px >报修人手机号码</td>
						<td style="border:1px solid #D8D8D8;">
							<#if repair.applayStaffInfo ??>
								${repair.applayStaffInfo.telephone}
							</#if>
						</td>
					</tr>
					<#if sessionUser.roleCode == '4'>   
					<tr align="center" class="tt">
							<td style="border:1px solid #D8D8D8;" height=30px >报修种类</td>
							<td style="border:1px solid #D8D8D8;" height=30px colspan="1">	<!--	${repair.bxlx} -->
							<select name="bxlx" id="bxlx" style="height:24px; width:80px;vertical-align:middle;">
                          			<option value="" disabled="disabled" >种类</option>
									<#list bxlxList as data>
										<#if repair.bxlx==data.bxlx>
						      				<option value="${data.bxlx}" selected >${data.bxlx}</option>
						      			<#else>
						      				<option value="${data.bxlx}" >${data.bxlx}</option>
						      			</#if>
							 		</#list>
                		</select>
							</td>
							<td style="border:1px solid #D8D8D8;" height=30px colspan="2"></td>
					</tr>
					</#if>
					<tr align="center" class="tt">
						<td style="border:1px solid #D8D8D8;" height=30px >报修内容</td>
						<td style="border:1px solid #D8D8D8;" height=30px  colspan="3">
							${repair.applayContent}
						</td>
					</tr>
					<tr align="center" class="tt">
						<td style="border:1px solid #D8D8D8;" height=30px >报修回复</td>
						<td style="border:1px solid #D8D8D8;" height=30px colspan="3">
							<textarea class="replay" id="applayRespnse"></textarea>
						</td>
					</tr>

					<tr>
					 	<td style="border-top:0px;border-bottom:0px;" colspan="4"></td>
					</tr>
				 	<tr>
				 		<td style="height:60px;border-top:0px;border-bottom:0px;text-indent:12px;" colspan="4">
				 			
				 			<#if roleType == '1'><!-- 物管 --> 
				 				<select style="width:150px;float:left;margin-left:5px" id="assigneeStaffInfo">
				 					<#if logisticsDeptCharges?? || logisticsDeptCharges?size <= 0>
					 					<#list logisticsDeptCharges as data>
					 						<option value="${data.staffNo}#${data.positionName}">${data.positionName}</option>
					 					</#list>
				 					</#if>
			            		</select>
								<input type="button" class="btn" onclick="repair.approveRepairTask('2');" style="width:120px;height:25px;float:left" value="转向后勤主管"/>
				 			<#elseif roleType == '2'><!-- 后勤主管 --> 
			 					<input type="button" class="btn" onclick="repair.approveRepairTask('1');" style="width:120px;height:25px;float:left" value="转向物管"/>
								<input type="button" class="btn" onclick="repair.approveRepairTask('3');" style="width:120px;height:25px;float:left" value="转向后勤处长"/>
				 			<#elseif roleType == '3'><!-- 后勤处长 --> 
				 				<select style="width:150px;float:left;margin-left:5px" id="assigneeStaffInfo">
		                            <#if logisticsDeptCharges?? || logisticsDeptCharges?size <= 0>
					 					<#list logisticsDeptCharges as data>
					 						<option value="${data.staffNo}#${data.positionName}">${data.positionName}</option>
					 					</#list>
				 					</#if>
			            		</select>
								<input type="button" class="btn" onclick="repair.approveRepairTask('2');" style="width:120px;height:25px;float:left" value="转向后勤主管"/>
								<input type="button" class="btn" onclick="repair.approveRepairTask('4');" style="width:120px;height:25px;float:left" value="转向分管院领导"/>
				 			<#elseif roleType == '4'><!-- 后勤分管院长 --> 
				 				<input type="button" class="btn" onclick="repair.approveRepairTask('3');" style="width:120px;height:25px;float:left" value="转向后勤处长"/>
								<input type="button" class="btn" onclick="repair.approveRepairTask('5');" style="width:120px;height:25px;float:left" value="转向院长"/>
				 			<#elseif roleType == '5'><!-- 院长 --> 
				 				<input type="button" class="btn" onclick="repair.approveRepairTask('4');" style="width:120px;height:25px;float:left" value="转向下一级"/>
				 			</#if>
						
							<input type="button" class="btn" onclick="repair.approveRepairTask('0');" style="width:120px;height:25px;float:right;margin-right:30px" value="完成任务"/>
						</td>
					</tr>
		        </table>   
	        <#else>
				<table border="1" style="border:1px solid #D8D8D8;width:780px;float:left; margin-top:10px; margin-left:10px;">
		        	<tr align="center"  class="tt">
		        		<td style="border:1px solid #D8D8D8;color:red">无报修详情</td>
		        	</tr>
				</table>
			</#if>
	    </div>
	  </div>
	</div>
</div>
<#include "/include/footer.ftl"/>
</body>