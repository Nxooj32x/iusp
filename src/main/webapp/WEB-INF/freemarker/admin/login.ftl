<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>南航金城学院信息户服务平台 - 后台管理 - 登录</title>
		<link href="${resRoot}/admin/css/admin.css" rel="stylesheet" />
		<link rel="stylesheet" href="${resRoot}/admin/css/header_menustyle.css" type="text/css" />
		<!-- 引用工具包 -->
		<script type="text/javascript" language="javascript" src="${resRoot}/admin/js/jquery.js"></script>
		<script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
		
		<script type="text/javascript" language="javascript">

			// 登录校验
			function checkLogin(){
				var userName = $("input[name='userName']").val();
				var password = $("input[name='password']").val();
				
				if(iuspUtil.isEmpty(userName)){
					alert("用户名不能为空！");
					return false;
				}
				
				if(iuspUtil.isEmpty(password)){
					alert("密码不能为空！");
					return false;
				}
				return true;
			}
		</script>
	</head>

	<body style="background-color: #00A0F0">
		<div class="admin_container" style="height: 0;min-height:100px">
			<div class="admin_header">
				<div style="width: 500px; margin: 0 auto; margin-top: 50px;">
					<!--margin-top:120px;-->
					<div style="width: 100%; margin: 0 auto; margin-top: 100px;">
						<img src="${resRoot}/admin/images/navlogo.png" style="width:500px"/>
						<form action="${base}/admin/login" method="post" onsubmit="return checkLogin();">
							<#if errorMsg??>
								<p style="color:red">${errorMsg}</p>
							</#if>
							<table style="width: 260px; margin-top: 5px;margin: 0 auto;">
								<colgroup>
									<col width="23%" />
									<col width="77%" />
								</colgroup>
								<tr>
									<td colspan="2" style="padding-left: 14px; color: red">
									</td>
								</tr>
								<tr>
									<td style="text-align: right">
										用户名：
									</td>
									<td>
										<input type="text" name="userName" style="width: 150px;" value="${userName}"/>
									</td>
								</tr>
								<tr>
									<td style="text-align: right">
										密码：
									</td>
									<td>
										<input type="password" name="password" style="width: 150px;"/>
									</td>
								</tr>
								<tr>
									<td colspan="2" style="text-align: center">
										<input type="submit" value="登 录"/>
										<input type="reset" value="重 置"/>
									</td>
								</tr>
							</table>
						</form>
						<div class="admin_footer" style="margin-top: 18px;text-align:center;border-top:1px #DDD solid">
							<span class="copyright" style="color:#FFF;margin-top:5px">南航金城学院信息户服务平台 &copy;2014 All rights reserved.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>