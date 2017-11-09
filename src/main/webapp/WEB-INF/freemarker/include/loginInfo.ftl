<#if sessionUser?exists>
	<span style="color:#FFF">${sessionUser.userName}&nbsp;&nbsp;您好！</span><a  href="${base}/auth/logout" style="color:#FFF;float:right">点击注销</a>
<#else>
	<span class="user-box">
		<i></i><input type="text" id="userName" name="j_username" value="用户名">
	</span>
	<span class="password-box">
		<i></i>


		<!--<input type="text" value="密码" style="" id="pass-w"> -->
      <!--   <input style="display:none;" type="password" value="" name="password"  id="password">-->
      <div id="pwd_warpper"> 
      <input type="text" value="密码" id="password" name="j_password" onfocus="showpassword();" />
      </div>  

	</span>
	<a id="loginbutton">登录</a>
</#if>
<script type="text/javascript" language="javascript">
		function showtext() {  
   		 if($("#password").val()=="") {  
    		$("#pwd_warpper").html("<input type=\"text\" value=\"密码\" id=\"_password\" onfocus=\"showpassword();\" />");
   			 }  
		}

		function showpassword() {  
    	$("#pwd_warpper").html("<input type=\"password\" value=\"\" id=\"password\"  name=\"j_password\" onblur=\"showtext();\" />");
   	 		setTimeout(function(){  
    		$("#password").focus();  
    	},20);  
		}  
</script>