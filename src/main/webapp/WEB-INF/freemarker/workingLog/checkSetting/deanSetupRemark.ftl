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
				});
		 </script>
	</head>
<body>


<#include "/include/header.ftl"/>
  <!-- wangxuan 2014-12-11 -->
<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
	<a href="${base}/index"><img style="vertical-align:middle;" src="${resRoot}/images/fz.png" /></a>
	<span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/workingLog/daily">工作汇报</a>&gt;默认评语</span>
				
</div>  
<div class="colum-wrap clearfix" >
<hr width=100% style="border:1px solid #D8D8D8; border-left:0px;border-bottom:0px;margin-bottom:0px;" > 
	<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
		<div class="leftdiv"> <!---王璇  2014-12-4 -->
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
    <p></p>   
    	<table  border="1px" bordercolor="#D8D8D8" class="ctab">

            <tr  style="background-color:#dff1fd;height:30px;">
            	<td >&nbsp;&nbsp;日报评语</td>
            </tr>
            <tr style="height:100px;">
            	<td>
                	 <div id="remarkd" style="color:#ccc">
                     <textarea type="text" id="rb_comment" style="height:100px; width:770px;resize: none;max-height: 100px;max-width: 770px;"><#if rb_workingLog!=null> ${rb_workingLog.comment}</#if></textarea>
                    </div>
            	</td>
            </tr>
            <!---wangxuan  修改样式--->
            <tr>
            <td style="border-left:hidden;border-right:hidden;">
            <span  style=" float:left; margin-top:5px; margin-bottom:5px;"> 
    		<input type="button" value="&nbsp;保存设置&nbsp;" style="border:0px; background-color:#50bdfd; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;"  onclick="return save();"/>
          <input type="button" value="&nbsp;取消设置&nbsp;" style="border:0px; background-color:#50bdfd; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;" onclick="cancel('rb_comment')"/>
    		</span>
    		</td>
    		</tr>
            
            <tr style="background-color:#dff1fd; height:30px;">
            	<td>&nbsp;&nbsp;周报评语</td>
            </tr>
            <tr >
            	<td >
                 <div id="remarkw" style="color:#ccc">
                 <textarea type="text" id="zb_comment" style="height:100px; width:770px;resize: none;max-height: 100px;max-width: 770px;"><#if zb_workingLog!=null>${zb_workingLog.comment}</#if></textarea>
                  </div>
                </td>
            </tr>
            <!---wangxuan  修改样式--->
            <tr>
            <td style="border-left:hidden;border-right:hidden;">
            <span  style=" float:left; margin-top:5px; margin-bottom:5px;"> 
    		<input type="button" value="&nbsp;保存设置&nbsp;" style="border:0px; background-color:#50bdfd; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;"  onclick="return save();"/>
           	<input type="button" value="&nbsp;取消设置&nbsp;" style="border:0px; background-color:#50bdfd;height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;"onclick="cancel('zb_comment')" />
    		</span>
    		</td>
    		</tr>
            <tr style="background-color:#dff1fd; height:30px;">
            	<td>&nbsp;&nbsp;月报评语</td>
            </tr>
            <tr style="height:100px;">
            	<td>
                 <div id="remarkm" style="color:#ccc">
                 <textarea type="text" id="yb_comment" style="height:100px; width:770px;resize: none;max-height: 100px;max-width: 770px;overflow:hidden"><#if yb_workingLog!=null>${yb_workingLog.comment}</#if></textarea>
                    </div>
                </td>
            </tr>
            <!---wangxuan  修改样式--->
            <tr>
            <td style="border-left:hidden;border-right:hidden;border-bottom:hidden;">
            <span  style=" float:left; margin-top:5px; margin-bottom:5px;"> 
    		<input type="button" value="&nbsp;保存设置&nbsp;" style="border:0px; background-color:#50bdfd;  height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;"  onclick="return save();"/>
           	<input type="button" value="&nbsp;取消设置&nbsp;" style="border:0px; background-color:#50bdfd; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;" onclick="cancel('yb_comment')"/>
    		</span>
    		</td>
    		</tr>
        </table>
    	<!--<span  style=" float:right; margin-top:10px; "> 
    	<input type="button" value="&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;" style="border:0px; background-color:#63ACD9; width:100px; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;"  onclick="return save();"/>
           	<input type="button" value="&nbsp;&nbsp;取&nbsp;消&nbsp;&nbsp;" style="border:0px; background-color:#CCC; width:100px; height:30px; color:#FFF;font-family:'微软雅黑'; font-size:16px;"/>
    </span>-->
    </div>
</div>
</div>
</div>
<script type="text/javascript">

 function cancel(id){
 
  	 if(window.confirm("确定要取消吗？")){


		document.getElementById(id).value="";
	}
 }


 //王璇 2014-12-5 去掉前后空格
   String.prototype.trim=function() {

    return this.replace(/(^\s*)|(\s*$)/g,'');
}
     function  save(){
    	var rb_comment = $('#rb_comment').val();
    	var zb_comment = $('#zb_comment').val();
    	var yb_comment = $('#yb_comment').val();
    	  //王璇 2014-12-5 注释
     /*	if(rb_comment==""){ 
         	 alert('请填写日报默认评语！');
         	 return false;
         }
     	if(zb_comment==""){ 
       	   alert('请填周报默认评语！');
       	   return false;
         }
      	if(yb_comment==""){ 
       	   alert('请填写月报默认评语！');
       	   return false;
         } */
         //王璇 2014-12-5 去掉前后空格
 		rb_comment=rb_comment.trim();
 		zb_comment=zb_comment.trim();
 		yb_comment=yb_comment.trim();
		$.ajax({
			url: '${base}/workingLog/saveWkConf',
			type: 'POST',
			async: false,
			dataType: "json",
			data: {"rb_comment" : rb_comment,"zb_comment":zb_comment,"yb_comment":yb_comment},
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
 
</script>
<#include "/include/footer.ftl"/>
</body>