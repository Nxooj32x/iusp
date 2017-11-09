<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 
    <meta name="description" content="南航金城学院信息户服务平台" />
    <meta name="keywords" content="南航金城学院信息户服务平台" />
    <!-- IE8 兼容 -->
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <link href="${resRoot}/css/base.css"  rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="${resRoot}/css/day.css" />
    <title>南航金城学院信息化服务平台</title>
   
    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
    
    <script type="text/javascript" language="javascript">

		function changePwd(){
		
			var oldPassword = $("#oldPassword").val();
			var password = $("#newPassword").val();
			var rePassword = $("#rePassword").val();
			
			if(iuspUtil.isEmpty(oldPassword)){
				alert("请输入原密码");
				return false;
			}
			
			if(iuspUtil.isEmpty(password)){
				alert("请输入新密码");
				return false;
			}
			
			if(iuspUtil.isEmpty(rePassword)){
				alert("请输入确认密码");
				return false;
			}
			
			if($.trim(password) != $.trim(rePassword)){
				alert("新密码与确认密码不一致");
				return false;
			}
			
			$.ajax({
				url: '${base}/user/changePassword',
				type: 'POST',
				async: false,
				dataType: "json",
				data: {"oldPassword" : oldPassword,"newPassword" : password},
				success: function(data){
					if(data.flag){
						alert("密码修改成功");
						$("#oldPassword").val("");
						$("#newPassword").val("");
						$("#rePassword").val("");
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
</head>
<body>

<#include "/include/header.ftl"/>

<div  id="edcontent" >
<div class="mod-setting clearfix"> 
	<div class="setting-title yahei">个人设置</div>
          <div class="setting-content clearfix"> 
      <div class="setting-menu"> 
      <div class="menu-title menu-profile-current active"> 
      		<h3>个人资料</h3>
      </div> 
          <ul class="menu-list"> 
              <li class="menu-item basic-link">
              <a href="${base}/user/modifyBasicInfo">基本资料</a> 
              </li>
               <li class="menu-split"> </li>
              <li class="menu-item space-link on" >
               	<a  href="${base}/user/changePwd">修改密码</a> 
               </li>
             </ul> 
           </div> 
           <div style="display: block;" class="setting-detail" id="stthld"> 
           		<div class="detail-bg"></div> 
           			<div class="plzhld clearfix">
           				<div style="display: block;" id="1000001" class="mod-setting-profile"> 
                   			<div class="setting-profile-title yahei">修改密码</div> 
                   			   <form id="profile" class="setting-profile-form" method="POST" action=""> 
	                               <table class="setting-profile-table"> 
	                                   <tbody> 
	                                   <tr>
		                                   <th>原密码</th>
	                                   	   <td>
			                                   <input type="password" id="oldPassword" class="mod-cus-input-242"  onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}" style="color:#999999">
			                               </td>
		                                   </tr>
	                                   <tr>
	                                   	   <th>新密码</th>
		                                   <td>
		                                   		<input type="password" id="newPassword" class="mod-cus-input-242"  onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}" style="color:#999999">
		                                   </td>
	                                   </tr>
	                                   <tr> 
	                                   <th>确认新密码:</th> 
		                                   <td class="line30"> 
		                                   		<input type="password" id="rePassword" class="mod-cus-input-242"  onFocus="if(value==defaultValue){value='';this.style.color='#000'}" onBlur="if(!value){value=defaultValue;this.style.color='#999'}" style="color:#999999">
		                                   </td>
	                                   </tr>
	                                   </tbody>
	                               </table> 
	                               <input class="setting-submit-btn setting-submit-ml100" value="确定" type="button" onclick="changePwd();">
                               </form>
                   		  	</div>
                  		 </div> 
                   </div>
             </div> 
        </div> 
 </div> 
 
 <script>
$(document).ready(function(){
  $("#menulist li").click(function(){
    $('ul',this).slideToggle();
  });
   $("#menulist li").hover(function(){
    $(this).addClass('lihov');
  },function(){
	  $(this).removeClass('lihov');
	  
  });
});
</script>
 
<#include "/include/footer.ftl"/>
</body>