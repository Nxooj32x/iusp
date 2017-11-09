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
    <script type="text/javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
</head>
<body>

<#include "/include/smallheader.ftl"/>

<div class="notice-clumn">
    <div class="wrap">
	    <span class="p">
	    	<a class="index" href="${base}/">首页</a>/
	    	<#if article.type='01'>
	    		<a href="${base}/hot">最新热点</a>
	    	<#elseif article.type='02'>
	    		<a href="${base}/announcement">通知公告</a>
	    	<#elseif article.type='03'>
	    		<a href="${base}/guide">办事指南</a>
	    	</#if>
		</span>
	</div>
</div>

<div class="notice-con clearfix">
    <div class="aside">
     <!--     <div class="hbg"></div> -->
      <!--    <div class="menu"></div> -->
        <div class="bbg"></div>
    </div>
	
	<div class="article">
		<p class="pub-time">发布日期：${article.createTime?string("yyyy-MM-dd")}</p>
		<h1 class="tit">${article.title}</h1>
		<div class="content">
			<p>${content}</p>
		</div>
	</div>
</div>

<#include "/include/footer.ftl"/>
</body>