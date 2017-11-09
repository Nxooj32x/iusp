<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>南航金城学院信息化服务平台 - <#if type='01'>最新热点<#elseif type='02'>通知公告<#elseif type='03'>办事指南</#if></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="description" content="南航金城学院信息户服务平台" />
    <meta name="keywords" content="南航金城学院信息户服务平台" />
    <!-- IE8 兼容 -->
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <link href="${resRoot}/css/base.css"  rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="${resRoot}/css/day.css" />
    <link rel="stylesheet" type="text/css" href="${resRoot}/css/page.css" />
    <title>南航金城学院信息化服务平台</title>
    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
    <script type="text/javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/article/article.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/page.js"></script>
    <script type="text/javascript">
    	$(function(){
    		article.init('${resRoot}','${base}');
    	});
    </script>
</head>
<body>

<#include "/include/smallheader.ftl"/>

<div class="notice-clumn">
    <div class="wrap">
	    <span class="p">
	    	<a class="index" href="${base}/">首页</a>/
	    	<#if type='01'>
	    		<a href="${base}/hot">最新热点</a>
	    	<#elseif type='02'>
	    		<a href="${base}/announcement">通知公告</a>
	    	<#elseif type='03'>
	    		<a href="${base}/guide">办事指南</a>
	    		<#elseif type='04'>
	    		<a href="${base}/soft">常用软件下载</a>
	    	</#if>
	    	<input type="hidden" id="type" value="${type}"/>
		</span>
	</div>
</div>

<div class="notice-con clearfix">
    <div class="aside">
    <!--    <div class="hbg"></div> -->
    <!--     <div class="menu"></div>   -->
        <div class="bbg"></div>
    </div>
	<div class="article">
	     <h1 class="t"><#if type='01'>最新热点<#elseif type='02'>通知公告<#elseif type='03'>办事指南<#elseif type='05'>常用软件下载</#if></h1><!--//增加界面需求，修改人：王涛 -->
	     <div id="grid" class="grid"></div>
    </div>
</div>

<#include "/include/footer.ftl"/>
</body>