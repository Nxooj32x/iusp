<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	 	<meta name="description" content="南航金城学院信息户服务平台" />
	    <meta name="keywords" content="南航金城学院信息户服务平台" />
	    <!-- IE8 兼容 -->
		
	    <link href="${resRoot}/css/base.css"  rel="stylesheet" type="text/css" />
	    <link href="${resRoot}/css/day.css" rel="stylesheet" type="text/css" />
	    <link href="${resRoot}/css/page.css" rel="stylesheet" type="text/css" />
	    <title>南航金城学院信息化服务平台 - 工作日志</title>
	    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
	    <script type="text/javascript" src="${resRoot}/js/workingLog/workingLog.js"></script>
	    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
	     <script language="javascript" type="text/javascript" src="${resRoot}/js/utils/My97DatePicker/WdatePicker.js"></script>
	     <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/page.js"></script>
	     <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/setup.js"></script>
	    
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
	<a href="${base}/index"><img style="vertical-align:middle;" src="${resRoot}/images/fz.png" /></a>
	<span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/workingLog/daily">工作汇报</a>&gt;定时审核</span>
				
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
   <table  style="float:left; margin-top:10px; margin-left:10px;" border="1px" bordercolor="#D8D8D8">
    <tr>
    	<td width="30px;" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
        </td>
    	<td style="border-bottom:hidden;font-size:15px; color:#666;border-color:D8D8D8; border-width:1px; height:30px">	
        &nbsp;&nbsp;&nbsp;设&nbsp;置&nbsp;&nbsp;&nbsp;
    	</td>
    	<td width="660px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">

        </td>
    </tr>
    </table>
    <div style="padding-top:50px;">
    	<div style="font-size:13px; color:#999; margin-left:10px; margin-bottom:10px;">自动审核天数：如负责人有X天没审批，系统将自动进行审核</div>  
    	<table border="1px" bordercolor="#D8D8D8" class="ctabset">
    		<tr style="background-color:#4cc1fc; color:#FFF;"><td>&nbsp;&nbsp;&nbsp;类型</td><td>状态</td><td>自动审核天数</td><td>评分</td><td>操作</td></tr>
        	<tr style="height:40px;">
            	<td >&nbsp;&nbsp; 日报</td>
            	<td>
            	<div style="padding-left:50px">
            	<span id="sleBG">   
				<span id="sleHid"> 
                <select name="rb_yn" id="rb_yn" class="select">
                        <option value="y" <#if rb_workingLog !=null && rb_workingLog.autoCheckflg=="y">selected</#if>>&nbsp;打开</option>
                        <option value="n" <#if  rb_workingLog !=null &&  rb_workingLog.autoCheckflg!="y">selected</#if> >&nbsp;关闭</option>
                </select>  
                </span>   
				</span>
				</div>
                </td>
            	<td >
                  <div id="setday">
                	<input  type="number"  id="rb_cnt" 
                	 style="border:1px solid #D8D8D8; width:80px;height:25px" value="<#if rb_workingLog!=null> ${rb_workingLog.autoCheckCnt}</#if>"  />
                  </div>
                </td>
            
            	<td >
            	<div style="padding-left:50px">
            	<span id="sleBG">   
				<span id="sleHid"> 
                <select name="rb_score" id="rb_score" class="select">
					<option value="合格" <#if  rb_workingLog !=null && rb_workingLog.score=="合格">selected</#if> >合格</option>
					<option value="优良" <#if  rb_workingLog !=null && rb_workingLog.score=="优良">selected</#if> >优良</option>
					<option value="不合格" <#if rb_workingLog !=null &&  rb_workingLog.score=="不合格">selected</#if> >不合格</option>
                </select>  
                </span>   
				</span>
				</div>
                </td>    
                <td>
                <input type="button" value="&nbsp;保存设置&nbsp;" style="border:0px; background-color:#50bdfd;  height:30px; color:#FFF;font-family:'微软雅黑'; font-size:14px;"  onclick="save()">&nbsp;&nbsp;&nbsp;&nbsp;
             <input type="button" value="&nbsp;取消设置&nbsp;" style="border:0px; background-color:#50bdfd; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:14px;"  onclick="cancel('rb_yn')">
                </td>           
            </tr>
            <tr style="height:40px;">
            	<td >&nbsp;&nbsp; 周报</td>
            	<td >
            	<div style="padding-left:50px">
            	<span id="sleBG">   
				<span id="sleHid"> 
                <select name="rb_yn" id="zb_yn" class="select">
                        <option value="y" <#if  zb_workingLog !=null &&  zb_workingLog.autoCheckflg=="y">selected</#if>>&nbsp;打开</option>
                        <option value="n" <#if  zb_workingLog !=null && zb_workingLog.autoCheckflg!="y">selected</#if> >&nbsp;关闭</option>
                </select>
                </span>   
				</span>
				</div>
                </td>
            	<td >
                  <div id="setday">
                	<input  type="number"  id="zb_cnt" 
                    style="border:1px solid #D8D8D8; width:80px;height:25px" value="<#if zb_workingLog!=null>${zb_workingLog.autoCheckCnt}</#if>"/>
                  </div>
               </td>
             	
            	<td >
            	<div style="padding-left:50px">
            	<span id="sleBG">   
				<span id="sleHid"> 
                <select name="zb_score" id="zb_score" class="select">
					<option value="合格" <#if  zb_workingLog !=null &&  zb_workingLog.score=="合格">selected</#if> >合格</option>
					<option value="优良" <#if  zb_workingLog !=null && zb_workingLog.score=="优良">selected</#if> >优良</option>
					<option value="不合格" <#if zb_workingLog !=null &&  zb_workingLog.score=="不合格">selected</#if> >不合格</option>                
				</select>  
				</span>   
				</span>
				</div>
                </td>  
                 <td>
                <input type="button" value="&nbsp;保存设置&nbsp;" style="border:0px; background-color:#50bdfd; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:14px;"  onclick="save()">&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" value="&nbsp;取消设置&nbsp;" style="border:0px; background-color:#50bdfd;  height:30px; color:#FFF;font-family:'微软雅黑'; font-size:14px;"  onclick="cancel('zb_yn')">
                </td>           
            </tr>
            <tr style="height:40px;">
            	<td >&nbsp;&nbsp; 月报</td>
            	<td >
            	<div style="padding-left:50px">
            	<span id="sleBG">   
				<span id="sleHid"> 
                <select name="rb_yn" id="yb_yn"  class="select">
                        <option value="y" <#if  yb_workingLog !=null &&  yb_workingLog.autoCheckflg=="y">selected</#if> >&nbsp;打开</option>
                        <option value="n" <#if  yb_workingLog !=null && yb_workingLog.autoCheckflg!="y">selected</#if>>&nbsp;关闭</option>
                </select> 
                </span>   
				</span>
				</div> 
                </td>
            	<td >
                  <div id="setday">
                	<input  type="number"  id="yb_cnt" 
                    style="border:1px solid #D8D8D8; width:80px;height:25px" value="<#if yb_workingLog!=null>${yb_workingLog.autoCheckCnt}</#if>"/>
                  </div>
               </td>
            
            	<td >
            	<div style="padding-left:50px">
            	<span id="sleBG">   
				<span id="sleHid"> 
                <select name="yb_score" id="yb_score" class="select">
					<option value="合格" <#if  yb_workingLog !=null && yb_workingLog.score=="合格">selected</#if> >合格</option>
					<option value="优良" <#if  yb_workingLog !=null && yb_workingLog.score=="优良">selected</#if> >优良</option>
					<option value="不合格" <#if yb_workingLog !=null && yb_workingLog.score=="不合格">selected</#if> >不合格</option>  
                </select> 
                </span>   
				</span>
				</div> 
                </td>
                 <td>
                <input type="button" value="&nbsp;保存设置&nbsp;" style="border:0px; background-color:#50bdfd;  height:30px; color:#FFF;font-family:'微软雅黑'; font-size:14px;"  onclick="save()">&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" value="&nbsp;取消设置&nbsp;" style="border:0px; background-color:#50bdfd; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:14px;"  onclick="cancel('yb_yn')">
                </td>   
            </tr>
        </table>
      <!--  <span  style=" float:right; margin-top:10px; ">         
    		<input type="button" value="&nbsp;保存设置&nbsp;;" style="border:0px; background-color:#50bdfd; width:100px; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;"  onclick="save()">
            <input type="button" value="&nbsp;取消设置&nbsp;" style="border:0px; background-color:#50bdfd; width:100px; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;"  onclick="window.location=''">
    </span>-->
    </div>
</div>
</div>
</div>
<script type="text/javascript">
$(document).ready(function(){
  $(".ctab td input").click(function(){
    $('#set',this).slideToggle();
  });
   $(".ctab td input").hover(function(){
    $(this).addClass('lihov');
  },function(){
	  $(this).removeClass('lihov');
	  
  });
});  
     function  save(){
    	var rb_cnt = $('#rb_cnt').val();
    	var zb_cnt = $('#zb_cnt').val();
    	var yb_cnt = $('#yb_cnt').val();
     	var rb_yn = $('#rb_yn').val();
    	var zb_yn = $('#zb_yn').val();
    	var yb_yn = $('#yb_yn').val();   	

		var rb_score = $('#rb_score').val();
    	var zb_score = $('#zb_score').val();
    	var yb_score = $('#yb_score').val(); 
    	 
    	if(rb_yn=="n" && zb_yn=="n" && yb_yn=="n" ){
    	 	alert('请选择一项进行设置！');
    	 	return false;
    	 }
    	 
     	if(rb_yn=="y"&&rb_cnt==""  ){ 
         	 alert('请填写日报默认审核天数！');
         	 return false;
         }
     	if(zb_yn=="y"&&zb_cnt=="" ){ 
       	   alert('请填周报默认审核天数！');
       	   return false;
         }
      	if(yb_yn=="y"&&yb_cnt=="" ){ 
       	   alert('请填写月报默认审核天数！');
       	   return false;
         } 
         
       
 
		$.ajax({
			url: '${base}/workingLog/saveWkConf',
			type: 'POST',
			async: false,
			dataType: "json",
			data: {"rb_cnt" : rb_cnt,"zb_cnt":zb_cnt,"yb_cnt":yb_cnt,"rb_yn":rb_yn,"zb_yn":zb_yn,"yb_yn":yb_yn,"rb_score":rb_score,"zb_score":zb_score,"yb_score":yb_score},
			success: function(data){
				if(data.flag){
					alert(data.message);
				} else {
					alert(data.message);
					return false;
				}
			},
			error: function(){
				alert("对不起，您的操作失败，请重新操作！");
				return false;
			}
		});	
     }
     function cancel(id){
     if(document.getElementById(id).value=="n"){
     		alert('抱歉您还未开启！');
     
     }else{
  	 if(window.confirm("确定要取消吗？")){

		window.location=''
		//if(document.getElementById(id).value)="n";
	}
     }
     }
 
</script>
<#include "/include/footer.ftl"/>
</body>