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
			repair.listAllInit('${resRoot}','${base}');
		});
	 </script>
</head>
<body>

	<#include "/include/header.ftl"/>
	<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
		 <img style="vertical-align:middle;" src="${resRoot}/images/fz.png"/><a style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/index">&nbsp;首页</a>&nbsp;/&nbsp;<a href="/iusp-web/repair/forward?pageName=allRepair">后勤报修</a>&nbsp;</a>
	</div>  
    <hr width=100% style="border:1px solid #D8D8D8; border-left:0px;border-bottom:0px;margin-bottom:0px;" >           
	<div class="colum-wrap clearfix" >
	<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
	<div class="leftdiv"> 
        <#include "/include/repairMenu.ftl"/>
		<input type="hidden" id="module" value="${menuName}"/>
    </div>
    
	<div class="rightdiv" >
	 	<table width="780" border="1px" bordercolor="#D8D8D8"  style="float:left; margin-top:10px; margin-left:10px;">
		    <tr>
		    	<td width="30px;" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
		        </td>
		    	<td style="text-align:center;border-bottom:hidden;width:120px;font-size:15px;border-top:1px solid #D8D8D8;border-width:1px; height:30px ; border-left:1px solid #D8D8D8;border-right:1px solid #D8D8D8; ">	
		       	 	报修详情
		    	</td>
		    	<td width="680px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
				<span  style="float:left;margin-left:150px; margin-top:3px;"></span> <td width="650px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;vertical-align:middle;"">
					<div style="float:right; margin-left:2px; vertical-align:bottom;line-height:30px;" >
		           </div>
		            <div style="margin-left:10px; float:right;line-height:30px; vertical-align:middle;font-size:12px;" >
                        报修类别:&nbsp;&nbsp;&nbsp;&nbsp;${repair.bxlx} 
       					</div> 
		            </div>
			    </td>
		        </td>
		    </tr>
	    </table>
	    <div style="padding-top:50px;">
	    	<#if repair??>
		    	<table border="1" style="border:1px solid #D8D8D8;width:780px;float:left; margin-top:10px; margin-left:10px;">
		        	<tr align="center"  class="tt">
		        		<td  style="border:1px solid #D8D8D8;background-color:#F5F5F5;">报修时间</td>
		        		<td style="border:1px solid #D8D8D8;" >${repair.applayTime?string('yyyy-MM-dd')}</td>
		        		<td style="border:1px solid #D8D8D8;background-color:#F5F5F5;" >部门</td>
		        		<td style="border:1px solid #D8D8D8;" >${repair.departName}</td>
		        		<td style="border:1px solid #D8D8D8;background-color:#F5F5F5;" >报修人</td>
		        		<td style="border:1px solid #D8D8D8;" >${repair.applayStaffName}</td>
		        	</tr>
					<tr align="center"  class="tt">
						<td style="border:1px solid #D8D8D8;background-color:#F5F5F5;"  >报修人手机号码</td>
						<td style="border:1px solid #D8D8D8;"  >
							<#if repair.applayStaffInfo ??>
								${repair.applayStaffInfo.telephone}
							</#if>
						</td>
						<td style="border:1px solid #D8D8D8;background-color:#F5F5F5;">当前受理人</td>
						<td style="border:1px solid #D8D8D8;"  >
							<#if repair.handleStaffInfo ??>
								${repair.handleStaffInfo.realName}
							</#if>
						</td>
						<td style="border:1px solid #D8D8D8;background-color:#F5F5F5;" >当前受理人号码</td>
						<td style="border:1px solid #D8D8D8;"  >
							<#if repair.handleStaffInfo ??>
								${repair.handleStaffInfo.telephone}
							</#if>
						</td>
					</tr>
					<tr align="center"  class="tt">
						<td style="border:1px solid #D8D8D8;background-color:#F5F5F5;"  >状态</td>
						<td style="border:1px solid #D8D8D8;" >
							<#if repair.repairStatus = '1'>
								申请中
							<#elseif repair.repairStatus = '2'>
								受理中
							<#elseif repair.repairStatus = '3'>
								完成
							</#if>
						</td>
						<td style="background-color:#F5F5F5;">完成时间</td>
						<td style="border:1px solid #D8D8D8;"  >
							<#if repair.completeTime??>
								${repair.completeTime?string('yyyy-MM-dd')}
							</#if>
						</td>
						<td style="border:1px solid #D8D8D8;background-color:#F5F5F5;" >满意度</td>
						<td style="border:1px solid #D8D8D8;"  >
							<#--0不满意，1满意，2比较满意，3非常满意-->
							<#if repair.satisfaction = '0'>
								不满意
							<#elseif repair.satisfaction = '1'>
								满意
							<#elseif repair.satisfaction = '2'>
								比较满意
							<#elseif repair.satisfaction = '3'>
								非常满意
							</#if>
						</td>
					</tr>
					<tr align="center"  class="tt">
						<td style="border:1px solid #D8D8D8;background-color:#F5F5F5; height:200px;"  >报修内容</td>
						<td colspan="5" style="border:1px solid #D8D8D8;" >
							${repair.applayContent}
						</td>
					</tr>
					<tr align="center"  class="tt" colpan="2">
						<td style="border:1px solid #D8D8D8;background-color:#F5F5F5;height:200px; ">报修回复</td>
						<td colspan="5" style="border:1px solid #D8D8D8;" >
							${repair.applayRespnse } 
						</td>
					</tr>
					<tr align="center"  class="tt" colpan="2">
						<td style="border:1px solid #D8D8D8;background-color:#F5F5F5; height:100px;" >意见与建议</td>
						<td colspan="5" style="border:1px solid #D8D8D8;" >
							${repair.suggestions}
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
	    
	    <!--全院报修时候查看流程-->
	     <#if menuName == 'mar'>
		    <div class="pass-portrait-clearfix"></div>
		    <!--流程图部分-->
		    <div class="workflow">
		    	<#if repairAccepts?? && repairAccepts?size gt 0>
		    		<#assign modCount = 0/>
		    		<#list repairAccepts as accept>
		    			<#if accept_index gt 0 &&  accept_index % 3 == 0>
				    		<#assign modCount = modCount + 1/>
				    	</#if>
		    			<#if modCount gt 0 && accept_index % 3 == 0 && modCount % 2 == 0>
				    		<div class="leftDownArrow" style="text-align:left;padding-left:100px;">↓</div>
				    	<#elseif modCount gt 0 && accept_index % 3 == 0 && modCount % 1 == 0>	
				    		<div class="leftDownArrow" style="text-align:right;padding-right:50px;">↓</div>
				    	</#if>
				    	
				    	<div class="flowDiv" <#if accept_index gt 0 && modCount % 2 == 1> style="float:right" </#if>>
				    		<#if accept_index == 0>
					    		<table cellpadding="0" cellspacing="0">
					    			<colgroup>
						    				<col width="35%"/>
						    				<col width="65%"/>
						    			</colgroup>
					    			<tr>
					    				<th>报修人:</th>
					    				<td>${repair.applayStaffName}</td>
					    			</tr>
					    			<tr>
					    				<th>
					    					报修时间:
					    				</th>
					    				<td>
					    					<#if repair.applayTime??>
												${repair.applayTime?string('yyyy-MM-dd HH:mm:ss')}
											</#if>
										</td>
					    			</tr>
					    		</table>
						    <#else>
						    	<#if repair.satisfaction != 'N' && (accept_index+1) == repairAccepts?size>
						    		<table cellpadding="0" cellspacing="0">
						    			<colgroup>
						    				<col width="35%"/>
						    				<col width="65%"/>
						    			</colgroup>
						    			<tr>
						    				<th>评价人:</th>
						    				<td>${repair.applayStaffName}</td>
						    			</tr>
						    			<tr>
						    				<th>
						    					评价时间:
						    				</th>
						    				<td>
						    					<#if repair.appraisalTime??>
													${repair.appraisalTime?string('yyyy-MM-dd HH:mm:ss')}
												</#if>
											</td>
						    			</tr>
						    			<tr>
						    				<th>
						    					满意度:
						    				</th>
						    				<td>
						    					<#--0不满意，1满意，2比较满意，3非常满意-->
												<#if repair.satisfaction = '0'>
													不满意
												<#elseif repair.satisfaction = '1'>
													满意
												<#elseif repair.satisfaction = '2'>
													比较满意
												<#elseif repair.satisfaction = '3'>
													非常满意
												</#if>
											</td>
						    			</tr>
						    		</table>
						    	<#else>
						    		<table cellpadding="0" cellspacing="0">
						    			<colgroup>
						    				<col width="35%"/>
						    				<col width="65%"/>
						    			</colgroup>
						    			<tr>
						    				<th>
						    					${accept.assigneePosition}:
						    				</th>
						    				<td>
						    					<#if accept.assigneeStaffInfo ??>
													${accept.assigneeStaffInfo.realName}
												</#if>
											</td>
						    			</tr>
						    			<tr>
						    				<th>
						    					受理时间:
						    				</th>
						    				<td>
						    					<#if accept.acceptTime??>
													${accept.acceptTime?string('yyyy-MM-dd HH:mm:ss')}
												</#if>
											</td>
						    			</tr>
						    			<tr>
						    				<th>
						    					完成时间:
						    				</th>
						    				<td>
						    					<#if accept.completedTime??>
													${accept.completedTime?string('yyyy-MM-dd HH:mm:ss')}
												</#if>
											</td>
						    			</tr>
						    			<tr>
						    				<th>
						    					处理意见:
						    				</th>
						    				<td>
												${accept.handleSuggestion}
											</td>
						    			</tr>
						    		</table>
						    	</#if>
				    		</#if>
					    </div>
				    	<#if (accept_index+1) % 3 != 0>
				    		<#if (accept_index+1) != repairAccepts?size>
					    		<div class="<#if accept_index gt 0 && modCount % 2 == 1>rightArrow<#else>leftArrow</#if>">
					    			<#if accept_index gt 0 && modCount % 2 == 1>
					    				←
					    			<#else>
					    				→
					    			</#if>
					    		</div>
				    		</#if>
				    	</#if>
			    	</#list>
			    	<div class="pass-portrait-clearfix"></div>
		    	</#if>
		    </div>
	    </#if>
	  </div>
	</div>
	</div>
</div>
<#include "/include/footer.ftl"/>
</body>