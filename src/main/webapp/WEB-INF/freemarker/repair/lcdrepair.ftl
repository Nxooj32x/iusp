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
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/page.js"></script>
    <script type="text/javascript" src="${resRoot}/js/repair/repair.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
    <script language="javascript" type="text/javascript" src="${resRoot}/js/utils/My97DatePicker/WdatePicker.js"></script>
    
    <script type="text/javascript" language="javascript">
			$(function(){
				repair.init('${resRoot}','${base}');
				repair.queryList();   
			});
		</script>
		
</head>
<body>
<#include "/include/header.ftl"/>
<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
	 <img style="vertical-align:middle;"src="${resRoot}/images/fz.png"/><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/index">&nbsp;首页</a>&nbsp;/&nbsp;<a href="/iusp-web/repair/forward?pageName=allRepair">后勤报修</a>&nbsp;/&nbsp;我要报修&nbsp;</span>
</div>   
<hr width=100% style="border:1px solid #D8D8D8; border-left:0px;border-bottom:0px;margin-bottom:0px;" >  
<div class="colum-wrap clearfix" >
<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
	<div class="leftdiv"> 
		<#include "/include/repairMenu.ftl"/>
		<input type="hidden" id="module" value="mlcdr"/>
    </div>
<div class="rightdiv" >
 <table width="760" border="1px" bordercolor="#D8D8D8"  style="float:left; margin-top:10px; margin-left:10px;">
    <tr>
    	<td width="30px;" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
        </td>
    	<td style="border-bottom:hidden;font-size:15px;border-top:1px solid #D8D8D8;border-width:1px; height:30px ; border-left:1px solid #D8D8D8;border-right:1px solid #D8D8D8; ">	
        <a href="">&nbsp;&nbsp;我要报修&nbsp;&nbsp;</a>
    	</td>
    	  <td width="650px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;vertical-align:middle;"">
					<!-- 王璇 2014-12-09 增加查询条件--->
<div style="float:right; margin-left:2px; vertical-align:bottom;line-height:30px;" >
		           </div>
		            <div style="margin-left:10px; float:right;line-height:30px; vertical-align:middle;font-size:12px;" >
                        报修类别:&nbsp;
                        <!--
                         <select name="departNo" id="departNo" style="height:24px; width:110px;vertical-align:middle;">
							<option value="">部门</option>
						<#list queryOrg as data>
						      	<option value="${data.orgCode}">${data.orgName}</option>
						 </#list>
                		</select>  
                		 --> 
                          <select name="bxlx" id="bxlx" style="height:24px; width:80px;vertical-align:middle;">
                          	<option value="" selected>种类</option>
							<#list Bxlx as data>
						      	<option value="${data.bxlx}">${data.bxlx}</option>
							 </#list>
                		</select>     
                         
       					</div> 
		            </div>
			    </td>
    </tr>
    </table>
    <div style="padding-top:50px;">
    	   <table  border="1px" border-color="#D8D8D8" class="ctab">
                    <tr  style="background-color:#F5F5F5;height:30px;">
                        <td style="text-align:center;">报修内容:</td>
                    </tr> 
		  <tr style="height:300px;">
                        <td>
                        <textarea id="applayContent" style="border-color:0px solid #D8D8D8;height:300px; width:760px;padding-top:10px;text-indent:10px;font-size:15px;">
                        </textarea>
                        </td>
                    </tr></table>
	           <div style="float:left;margin-left:250px;"><button onclick="return save();" style="width:80px ;height:25px" >报修</button><button onclick="return cancle();"  style="margin-left:180px;width:80px ;height:25px" >取消</button>
			   </div>
    </div>
  </div>
</div>
</div>
</div>
<script type="text/javascript" language="javascript">
	 $(function(){
		$('#applayContent').val('');
	 });
				
     function  save(){
    	var applayContent = $('#applayContent').val();
    	var bxlx = $('#bxlx').val();
     	if(iuspUtil.isEmpty(applayContent)){ 
         	 alert('请填写报修内容！');
         	 return false;
         }
         if(iuspUtil.isEmpty(bxlx)){ 
         	 alert('请选择报修类型！');
         	 return false;
         }
 		$.ajax({
			url: '${base}/repair/saveRepair',
			type: 'POST',
			async: false,
			dataType: "json",
			data: {"applayContent" : applayContent,"submitFlag":${submitFlag},"bxlx":bxlx},
			success: function(data){
				if(data.flag){
					alert(data.message);
				} else {
					alert(data.message);
					return false;
				}
				repair.queryMenuCount();
				//将内容清空
				var context = document.getElementById("applayContent").value="";
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