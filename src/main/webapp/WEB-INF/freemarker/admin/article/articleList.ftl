<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="${resRoot}/admin/css/admin.css" rel="stylesheet" />
		<script type="text/javascript" language="javascript" src="${resRoot}/admin/js/jquery.js"></script>
		<script type="text/javascript" language="javascript" src="${resRoot}/admin/js/article/article.js"></script>
		<script type="text/javascript" language="javascript" src="${resRoot}/js/utils/page.js"></script>
		<script type="text/javascript" language="javascript">
			function confirmDelete(id,type){
				if(confirm("是否确定删除此记录？")){
					window.location.href = "${base}/admin/article/deleteArticle?id=" + id + "&type=" + type;
					return true;
				}
				return false;
			}
			
			$(function(){
				article.init('${resRoot}','${base}');
			});
		</script>
	</head>
	<body style="background-color: white">
			<table class="objectTable" cellpadding="0" cellspacing="0">
				<colgroup>
					<col width="500" />
					<col width="100" />
					<col width="150" />
					<col />
				</colgroup>
				<tr>
					<td colspan="4" class="objectTableTitle" style="border-bottom:1px #4c99c3 solid">
						<#if type='01'>
							热点列表
						<#elseif type='02'>
							公告列表
						<#elseif type='03'>
							办事指南列表
						</#if>
					</td>
				</tr>
				<tr>
					<td colspan="3" style="border-right:0;height:40px">
						标题：
						<input type="text" name="title" value="" style="width:320px;border:1px #999 solid;height:18px"/>&nbsp;
						<input type="hidden" id="type" value="${type}"/>
						&nbsp;
						<input type="button" id="systemSearch" value="搜 索" style="border:1px #CCC solid;height:22px;"/>
					</td>
					<td>
						<a href="${base}/admin/article/toAddArticlePage?type=${type}" style="float: right;margin-left: 4px;margin-right: 10px;margin-top: 4px;text-decoration: underline">
							添加
						</a>
						<img src="${resRoot}/admin/images/addbuddy.gif" alt="" style="margin-top: 3px;float: right;"/>
					</td>
				</tr>
			</table>
			<div id="grid"></div>
	</body>
</html>