<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="${resRoot}/admin/css/admin.css" rel="stylesheet" type="text/css"/>
		<script type="text/javascript" language="javascript" src="${resRoot}/admin/js/jquery.js"></script>
		<script type="text/javascript" language="javascript">
			function changeStyle(obj,url){
				 $(".leftmenuBgcolor")[0].className = "left_menu";
		         obj.className = "leftmenuBgcolor";
		         window.mainFrame.location.href = url;
			}
		</script>
	</head>
	<body style="background-color: white">
		<table style="width: 100%; border: 0" cellpadding="0" cellspacing="0">
			<tr>
				<td style="width: 180px;">
					<div class="admin_left">
						<div class="left_menu">
							<span class="leftmenuBgcolor" onclick="changeStyle(this,'${base}/admin/article/toListArticlePage?type=${type}');" 
								style="margin-top: 5px">
								<img src="${resRoot}/admin/images/bg_repno.gif" width="8" height="8" style="border: 0; margin-right: 2px;" /> 
								<#if type='01'>
									热点列表
								<#elseif type='02'>
									公告列表
								<#elseif type='03'>
									办事指南列表
								</#if>
							</span>
							<span onclick="changeStyle(this,'${base}/admin/article/toAddArticlePage?type=${type}');">
								<img src="${resRoot}/admin/images/bg_repno.gif" width="8" height="8" style="border: 0; margin-right: 2px;" /> 
								添加
							</span>
						</div>
					</div>
				</td>
				<td>
					<div class="admin_right">
						<iframe src="${base}/admin/article/toListArticlePage?type=${type}" width="100%" height="550" scrolling="no" frameborder="0" name="mainFrame"></iframe>
					</div>
				</td>
			</tr>
		</table>
	</body>

</html>