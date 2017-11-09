<!DOCTYPE html>
<!-- 
办事指南告的查看界面
 -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 
    <meta name="description" content="南航金城学院信息户服务平台" />
    <meta name="keywords" content="南航金城学院信息户服务平台" />
    <!-- IE8 兼容 -->
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <link href="${resRoot}/admin/css/base.css"  rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="${resRoot}/admin/css/hot.css" />
    <link rel="stylesheet" type="text/css" href="${resRoot}/css/page.css" />
    <title>南航金城学院信息化服务平台</title>
    <script type="text/javascript" language="javascript" src="${resRoot}/admin/js/jquery.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/dialog/dialog-plus.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iusp-msg.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iusp-ajax.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iusp-view.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/page.js"></script>
    <script type="text/javascript" charset="utf-8" src="${resRoot}/admin/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="${resRoot}/admin/ueditor.all.min.js"> </script>
    <script type="text/javascript" charset="utf-8" src="${resRoot}/admin/js/article/article.js"> </script>
    <link rel="stylesheet" type="text/css" href="${resRoot}/plugin/simditor/styles/simditor.css" />
    <script type="text/javascript" src="${resRoot}/plugin/simditor/scripts/module.min.js"></script>
    <script type="text/javascript" src="${resRoot}/plugin/simditor/scripts/uploader.min.js"></script>
    <script type="text/javascript" src="${resRoot}/plugin/simditor/scripts/hotkeys.min.js"></script>
    <script type="text/javascript" src="${resRoot}/plugin/simditor/scripts/simditor.min.js"></script>
    
</head>
<body>

<div class="headerwrap">
    <div class="header wrap clearfix" style="">
        <span style="float:right;color:#81868a"> 用户名：${sessionUser.userName}| <a href="${base}/auth/logout" style="color:#81868a">注销</a> </span>
    </div>
</div>
<div class="form">   
<div class="wrap-con">
        <div class="navwrap clearfix">
            <div class="logowrap fL">
            	<a href="${bases}/index"><img src="${resRoot}/images/navlogo.png" alt="" width="406" height="40"></a>
          </div>
            <div class="nav">
            	<span >
            		<a href="${base}/index" >首页</a>
            	</span>
           
            	<span>
              		<a href="javascript:void(0);">评教系统待开发</a>
          	</span>
            	<span>
              		<a href="javascript:void(0);">财务信息待开发</a>
          	</span>
            	<span class="last">
                  	<a href="javascript:void(0);">后勤报修待开发</a>
          	</span>
          </div>
        </div> 
        </div>
</div>              
<div class="colum-wrap clearfix" >
	<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
		<div class="leftdiv"> 
      <p style="margin-top:18px;">&nbsp;</p>
			<ul id="menulist">
           <hr style="border:1px solid #FFF; border-bottom:hidden; border-right:none;">
				<li id="menuli">
    				<div class="fundiv" >
    					<a href="${base}/admin/article/searchArticleForward?type=01"  <#if type ="01"> style="color:#00F"</#if> >最新热点</a>
   					</div>
 
				</li>
				 <hr style="border:1px solid #FFF; border-bottom:hidden; border-right:none;">
				<li id="menuli" >
 					<div class="fundiv">
   						<a href="${base}/admin/article/searchArticleForward?type=02" <#if type ="02"> style="color:#00F"</#if> >通知公告</a>
    				</div>
				</li>
				 <hr style="border:1px solid #FFF; border-bottom:hidden; border-right:none;">
				<li id="menuli" >
				 	<div class="fundiv">
  						<a href="${base}/admin/article/searchArticleForward?type=03" <#if type ="03"> style="color:#00F"</#if> >办事指南</a>
 			 		</div>

				</li>
			
				<hr style="border:1px solid #FFF; border-bottom:hidden; border-right:none;">
				<li id="menuli" >
 					<div class="fundiv">
    					<a href="${base}/admin/software/searchSoftwareForward?type=04" <#if type ="04"> style="color:#00F"</#if> >软件下载</a>
    				</div>
				</li>
				<hr style="border:1px solid #FFF; border-bottom:hidden; border-right:none;">
				<li id="menuli" >
				 	<div class="fundiv">
  						<a href="${base}/admin/term/searchForward?type=05" <#if type ="05"> style="color:#00F"</#if> >学期设置</a ><!-- 王璇 2014-11-25 添加if-->
 			 		</div>

				</li>
				 <hr style="border:1px solid #FFF; border-bottom:hidden; border-right:none;">
			<ul>
		</div>