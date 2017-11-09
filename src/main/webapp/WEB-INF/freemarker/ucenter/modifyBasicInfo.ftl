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
			$(function(){
			});
			
			function modifyBasicInfo(){
			
				var telephone = $("#telephone").val();
				var officePhone = $("#officePhone").val();
				var email = $("#email").val();
				
				if(iuspUtil.isEmpty(telephone)){
					alert("请输入手机号码");
					return false;
				}
				
				if(iuspUtil.isEmpty(officePhone)){
					alert("请输入办公号码");
					return false;
				}
				
				if(iuspUtil.isEmpty(email)){
					alert("请输入电子邮箱");
					return false;
				}
				
				$.ajax({
					url: '${base}/user/changeTeacherInfo',
					type: 'POST',
					async: false,
					dataType: "json",
					data: {"telephone" : telephone,"officePhone" : officePhone,"email" : email},
					success: function(data){
						if(data.flag){
							alert("基本信息修改成功");
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
              <li class="menu-item basic-link on">
              	<a href="${base}/user/modifyBasicInfo">基本资料</a> 
              </li>
              <li class="menu-split"> </li>
              <li class="menu-item space-link " >
               	<a  href="${base}/user/changePwd">修改密码</a> 
               </li>
             </ul> 
           </div> 
           <div style="display: block;" class="setting-detail" id="stthld"> 
           		<div class="detail-bg"></div> 
           			<div class="plzhld clearfix">
           				<div style="display: block;" id="1000001" class="mod-setting-profile"> 
           					<div class="setting-profile-title yahei">基本资料</div> 
                            	<form id="profile" class="setting-profile-form" method="POST"  action=""> 
                                   <table class="setting-profile-table"> 
	                                   <tbody> 
		                                   <tr>
		                                   		<th>姓名：</th>
			                                   <td>
			                                   		${sessionUser.realName}
			                                   </td>
		                                   </tr>
		                                   <tr>
		                                   		<th>工号：</th>
			                                   <td>
			                                   		${sessionUser.userName}
			                                   </td>
		                                   </tr>
		                                   <tr>
		                                   		<th>部门：</th>
			                                   <td>
			                                   		${sessionUser.orgName}
			                                   </td>
		                                   </tr>
		                                   <tr>
		                                   	   <th>职务：</th>
			                                   <td>
			                                   		${sessionUser.positionName}
			                                   </td>
		                                   </tr>
		                                   <tr> 
			                                   <th>办公号码:</th>
			                                   <td> 
			                                   		<input class="mod-cus-input-242" id="officePhone"  value="${teacher.officePhone}">
			                                   </td>
		                                   </tr>
		                                   <tr> 
			                                   <th>手机:</th>
			                                   <td> 
			                                   		<input class="mod-cus-input-242" id="telephone" value="${teacher.telephone}">
			                                   </td>
		                                   </tr>
		                                   <tr> 
			                                   <th>Email:</th>
			                                   <td> 
			                                   		<input class="mod-cus-input-242"  id="email" value="${teacher.email}">
			                                   </td>
		                                   </tr>
                                       </tbody>
                                  	</table> 
                                    <input class="setting-submit-btn setting-submit-ml100" value="保存" type="button" onclick="modifyBasicInfo();">
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