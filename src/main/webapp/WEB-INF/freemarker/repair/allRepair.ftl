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
	<img style="vertical-align:middle;" src="${resRoot}/images/fz.png"/><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/index">&nbsp;首页</a>&nbsp;/&nbsp;<a href="/iusp-web/repair/forward?pageName=allRepair">后勤报修</a>&nbsp;</span>
</div>   
<hr width=100% style="border:1px solid #D8D8D8; border-left:0px;border-bottom:0px;margin-bottom:0px;" >
<div class="form">   
	
	<div class="colum-wrap clearfix" >
	<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
	<div class="leftdiv"> 
		<#include "/include/repairMenu.ftl"/>
		<input type="hidden" id="module" value="mar"/>
    </div>

	<div class="rightdiv">
	<form>
	 	<table width="760" border="1px" bordercolor="#D8D8D8"  style="float:left; margin-top:10px; margin-left:10px; margin-bottom:10px;">
	 	<tr><td colspan="3" style="border-left:hidden;border-right:hidden; border-top:hidden;"><div style="margin-left:10px; float:right;line-height:30px; vertical-align:middle;font-size:13px;padding-right:107px;" >
	 	<span style="vertical-align:middle;"></span>	
						报修时间:从<input readonly type="text" class="Wdate" id="applayTime_S" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"
                         style="border-color:#D8D8D8; width:110px; height:21px; font-size:11px;vertical-align:middle; padding-top:2px;" />
          						至<input readonly type="text" class="Wdate" id="applayTime_E" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"
                         style="border-color:#D8D8D8; width:110px; height:21px; font-size:11px;vertical-align:middle; padding-top:2px;" /> 
                         
                          <select name="satisfaction" id="satisfaction" style="height:24px; width:80px;vertical-align:middle;">
							<option value="">满意度</option>
							<option value="0">不满意</option>
							<option value="1">满意</option>
							<option value="2">比较满意</option>
							<option value="3">非常满意</option>
                		</select> 
                		<select name="bxlx" id="bxlx" style="height:24px; width:80px;vertical-align:middle;">
                          	<option value="" selected>报修种类</option>
							<#list Bxlx as data>
						      	<option value="${data.bxlx}">${data.bxlx}</option>
							 </#list>
                		</select> 
                         </div>
                         </td>
                     
                         </tr>
		    <tr>
		    	<td width="30px;" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
		        </td>
		    	<td style="border-bottom:hidden;font-size:15px;border-top:1px solid #D8D8D8;border-width:1px; height:28px ; border-left:1px solid #D8D8D8;border-right:1px solid #D8D8D8; ">	
		        	<a href="">&nbsp;&nbsp;全院报修&nbsp;&nbsp;</a>
		    	</td>
			    <td width="650px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;vertical-align:middle;"">
					<!-- 王璇 2014-12-09 增加查询条件--->
<div style="float:right; margin-left:2px; vertical-align:bottom;line-height:30px;" >
		            	<input value="&nbsp;&nbsp;查询&nbsp;&nbsp;" id="allSearchBtn" type="button"  class="btn"/>
		            	<input value="&nbsp;&nbsp;重置&nbsp;&nbsp;" id="" type="reset"  class="btn" />
		           </div>
		            <div style="margin-left:10px; float:right;line-height:30px; vertical-align:middle;font-size:12px;" >
						<input type="text" id="repairContent" style="vertical-align:middle; height:21px; width:190px;" value="报修内容" onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}"/> 
                        
                         <select name="departNo" id="departNo" style="height:24px; width:110px;vertical-align:middle;">
							<option value="">部门</option>
						<#list queryOrg as data>
						      	<option value="${data.orgCode}">${data.orgName}</option>
						 </#list>
                		</select>   
                          <select name="repairStatus" id="repairStatus" style="height:24px; width:80px;vertical-align:middle;">
							<option value="">全部</option>
							<option value="1">申请中</option>
							<option value="2">受理中</option>
							<option value="3">完成</option>
                		</select>     
                         
       					</div> 
						
						     		
		            </div>
			    </td>
		    </tr>
	    </table>
	    </form>
	    <div style="padding-top:60px;" id="grid">
	    </div>
	  </div>
	</div>
	</div>
	<#include "/include/footer.ftl"/>
</div>
</body>