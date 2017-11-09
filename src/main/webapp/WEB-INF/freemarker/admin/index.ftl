<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>南航金城学院信息户服务平台 - 后台管理</title>
		<link href="${resRoot}/admin/css/admin.css" rel="stylesheet" type="text/css"/>
		<link href="${resRoot}/admin/css/header_menustyle.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" language="javascript" src="${resRoot}/admin/js/jquery.js"></script>
		<script type="text/javascript" language="javascript">
			function changeStyleForTopMenu(obj){
				 $(".current")[0].className = "dolphinnav";
		         obj.className = "current";
			}
		</script>
	</head>
	<body style="background-color: #fff">
		<div class="admin_container">
			<div class="admin_header">
				<div
					style="color: #333; font-size: 18px; font-weight: bold; height: 60px; line-height: 60px;" class="adminBg">
					<img src="${resRoot}/admin/images/navlogo.png" style="float: left;width:500px;margin-top:5px" />
					<span
						style="float: right; font-size: 12px; font-weight: normal; margin-right: 30px;color: #FFF">
						<#if adminUser?exists>
							您好！<span style="font-size: 13px; font-weight: 600; color: #FFF">${adminUser.userName}</span>
							[<a href="${base}/admin/logout" style="color: #FFF">退出</a>] [<a href="${base}/" target="_blank" style="color: #FFF">前台页面</a>] 
						</#if>
					</span>
				</div>
				<div id="dolphincontainer">
					<div class="dolphinnav">
						<ul>
							<li>
								<a href="${base}/admin/article/toArticleSetPage?type=01" class="current" target="contentFrame" onclick="changeStyleForTopMenu(this);">
									<span>最新热点</span>
								</a>
							</li>
							<li>
								<a href="${base}/admin/article/toArticleSetPage?type=02" onclick="changeStyleForTopMenu(this);" target="contentFrame">
									<span>通知公告</span>
								</a>
							</li>
							<li>
								<a href="${base}/admin/article/toArticleSetPage?type=03" onclick="changeStyleForTopMenu(this);" target="contentFrame">
									<span>办事指南</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
			<div class="admin_content">
				<iframe src="${base}/admin/article/toArticleSetPage?type=01" width="100%" height="550" scrolling="no" frameborder="0" name="contentFrame"></iframe>
			</div>
			
			<div class="admin_footer">
				<span class="copyright" style="margin-top:10px;">南航金城学院信息户服务平台 &copy;2014 All rights reserved.</span>
				<span class="copyright">Powered by 华内斯.</span>
			</div>
		</div>
	</body>
</html>