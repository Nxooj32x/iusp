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
	 <img style="vertical-align:middle;"  src="${resRoot}/images/fz.png"/><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/index">&nbsp;首页</a>&nbsp;/&nbsp;<a href="/iusp-web/repair/forward?pageName=allRepair">后勤报修</a>&nbsp;/&nbsp;评价与建议&nbsp;</span>
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
		    	<td style="border-bottom:hidden;width:120px;font-size:15px;border-top:1px solid #D8D8D8;border-width:1px; height:30px ; border-left:1px solid #D8D8D8;border-right:1px solid #D8D8D8; ">	
		        <a href="">&nbsp;&nbsp;报修详情&nbsp;&nbsp;</a>
		    	</td>
		    	<td width="680px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
				<span  style="float:left;margin-left:150px; margin-top:3px;"> </span>
		        </td>
		    </tr>
	    </table>
	    <div style="padding-top:50px;">
	    	<#if repair??>
		    	<table border="1" style="border:1px solid #D8D8D8;width:780px;float:left; margin-top:10px; margin-left:10px;">
		        	<tr align="center"  class="tt">
		        		<td  style="border:1px solid #D8D8D8;" height=30px width=150px>报修时间</td>
		        		<td style="border:1px solid #D8D8D8;" height=30px width=180px>${repair.applayTime?string('yyyy-MM-dd')}</td>
		        		<td style="border:1px solid #D8D8D8;" height=30px  width=200px>部门</td>
		        		<td style="border:1px solid #D8D8D8;" height=30px  width=100px>${repair.departName}</td>
		        		<td style="border:1px solid #D8D8D8;" height=30px width=150px>报修人</td>
		        		<td style="border:1px solid #D8D8D8;" height=30px width=180px>${repair.applayStaffName}</td>
		        	</tr>
					<tr align="center"  class="tt">
						<td style="border:1px solid #D8D8D8;" height=30px >报修人手机号码</td>
						<td style="border:1px solid #D8D8D8;" height=30px >
							<#if repair.applayStaffInfo ??>
								${repair.applayStaffInfo.telephone}
							</#if>
						</td>
						<td style="border:1px solid #D8D8D8;" height=30px >当前受理人</td>
						<td style="border:1px solid #D8D8D8;" height=30px >
							<#if repair.handleStaffInfo ??>
								${repair.handleStaffInfo.realName}
							</#if>
						</td>
						<td style="border:1px solid #D8D8D8;" height=30px >当前受理人号码</td>
						<td style="border:1px solid #D8D8D8;" height=30px >
							<#if repair.handleStaffInfo ??>
								${repair.handleStaffInfo.telephone}
							</#if>
						</td>
					</tr>
					<tr align="center"  class="tt">
						<td style="border:1px solid #D8D8D8;" height=30px >状态</td>
						<td style="border:1px solid #D8D8D8;" height=30px >
							<#if repair.repairStatus = '1'>
								申请中
							<#elseif repair.repairStatus = '2'>
								受理中
							<#elseif repair.repairStatus = '3'>
								完成
							</#if>
						</td>
						<td>完成时间</td>
						<td style="border:1px solid #D8D8D8;" height=30px >
							<#if repair.completeTime??>
								${repair.completeTime?string('yyyy-MM-dd')}
							</#if>
						</td>
						<td style="border:1px solid #D8D8D8;" height=30px >满意度</td>
						<td style="border:1px solid #D8D8D8;" height=30px >
		                <select name="satisfaction" id="satisfaction" style="height:100%; width:100%;">
							<option value="1">满意</option>
							<option value="2">比较满意</option>
							<option value="0">不满意</option>
							<option value="3">非常满意</option>
		                </select>  
						</td>
					</tr>
					<tr align="center"  class="tt">
						<td style="border:1px solid #D8D8D8;" height=30px width=122px >报修内容</td>
						<td colspan="5" style="border:1px solid #D8D8D8;" height=200px width=655px>
							${repair.applayContent}
						</td>
					</tr>
					<tr align="center"  class="tt" colpan="2">
						<td style="border:1px solid #D8D8D8;" height=200px width=122px>报修回复</td>
						<td colspan="5" style="border:1px solid #D8D8D8;" height=30px width=655px>
							${repair.applayRespnse}
						</td>
					</tr>
					<tr align="center"  class="tt" colpan="2">
						<td style="border:1px solid #D8D8D8;" height=200px width=122px>意见与建议</td>
						<td colspan="5" style="border:1px solid #D8D8D8;" height=200px width=655px>
                        <textarea id="suggestions" style="height:100%; width:100%;font-size:15px;">
                        </textarea>
						</td>
					</tr>
				</table>
				<br>
			   <div style="float:left;margin-left:250px;"><button onclick=" save();" style="width:80px ;height:25px" >提交</button>
			   </div>
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
</div>
<script type="text/javascript" language="javascript">
	 $(function(){
		$('#suggestions').val('');
	 });
				
     function  save(){
    	var suggestions = $.trim($('#suggestions').val());
    	var satisfaction = $.trim($('#satisfaction').val());
     	if(iuspUtil.isEmpty(suggestions)){ 
         	 alert('请填写意见与建议！');
         	 return false;
         }
     	if(iuspUtil.isEmpty(satisfaction)){ 
         	alert('请填写满意度！');
         	 return false;
         }         
 		$.ajax({
			url: '${base}/repair/submitCommentRepair',
			type: 'POST',
			async: false,
			dataType: "json",
			data: {"suggestions" : suggestions,"satisfaction":satisfaction,"id":${repair.id}},
			success: function(data){
				if(data.flag){
					alert(data.message);
				
				} else {
					alert(data.message);
						window.location.href ="${base}/repair/repairView?id=${repair.id}";
					return false;
				}
			},
			error: function(){
				alert("对不起，您的操作失败，请重新操作！");
				return false;
			}
		});	
     }
     
     function cancle(){
       $('#applayContent').val('');
     }
</script>
<#include "/include/footer.ftl"/>
</body>