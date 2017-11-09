<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 
    <meta name="description" content="南航金城学院信息户服务平台" />
    <meta name="keywords" content="南航金城学院信息户服务平台" />
    <!-- IE8 兼容 -->
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <link href="${resRoot}/css/base.css"  rel="stylesheet" type="text/css" />
    <link href="${resRoot}/css/index.css" rel="stylesheet" type="text/css" />
    <title>南航金城学院信息化服务平台</title>
    
    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/dialog/dialog-plus.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iusp-msg.js"></script>
    <script type="text/javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
    <script type="text/javascript" src="${resRoot}/js/utils/iusp-ajax.js"></script>
    <script type="text/javascript" src="${resRoot}/js/login/login.js"></script>
    <script type="text/javascript">
    	$(function(){
    		login.init("${resRoot}","${base}");
    	});
    </script>
</head>
<body>

<#include "/include/indexheader.ftl"/>
 <div id="col"></div><!-- 王璇 2014-11-25 自适应div-->
<div class="colum-wrap clearfix">
  <div class="colum">
        <div class="hot">
            <h2 class="t">最新热点</h2>
            <#if newsList?? && newsList?size &gt; 0>
            <ul class="hot-list">
              <#list newsList as data>
	              <li class="clearfix">
	                    <div class="hot-l">
	                        <span class="num   num1 " >${data.createTime?string("dd")}</span><span class="date">${data.createTime?string("yyyy-MM")}</span>
	                    </div>
	                    <div class="hot-r">
	                        <p class="title">
		                        <a href="${base}/article?id=${data.id}" sub-line="1" target="_blank">
		                        	<#if data.title?length lt 15>   
	                       				${data.title}
									<#else> 
									     ${data.title[0..15]}... 
									</#if>
		                        </a>
	                        </p>
	                        <div class="des" sub-line="2">
	                        <#if data.summary?length lt 60>   
                   				${data.summary}
							<#else> 
							     ${data.summary[0..60]}... 
							</#if>                    
	                      </div>
	                    </div>
	               </li>
              </#list>
            </ul>
          	<div style="margin-top: 13px;padding-left: 7px;">
           		 <a href="${base}/hot" tppabs="" style="color: #E74F26;font-family: '宋体';">详细 ></a>
          	</div>
          </#if>
        </div>
        <div class="notice">
            <h2 class="t">通知公告</h2>
            <#if announceList?? && announceList?size &gt; 0>
            <ul class="notice-list">
              <#list announceList as data>
            	 <li>
                 	<span class="time">${data.createTime?string("yyyy.MM")}</span>
                 	<a href="${base}/article?id=${data.id}" style="margin-left:10px" tppabs="" sub-line="1" target="_blank">
                 		<#if data.title?length lt 15>   
               				${data.title}
						<#else> 
						     ${data.title[0..15]}... 
						</#if>  
                 	</a>
                 </li>
              </#list>
          </ul>
       	  <div style="margin-top: 15px;padding-left: 7px;">
       		<a href="${base}/announcement"  style="color: #E74F26;font-family: '宋体';">详细 ></a>
       	  </div>   
       	  </#if>
        </div>
        
        <div class="notice">
            <h2 class="t">办事指南</h2>
            <#if znList?? && znList?size &gt; 0>
            <ul class="notice-list">
              <#list znList as data>
            	 <li>
                 	<span class="time">${data.createTime?string("yyyy.MM")}</span>
                 	<a href="${base}/article?id=${data.id}" style="margin-left:10px" tppabs="" sub-line="1" target="_blank">
                 		<#if data.title?length lt 15>   
               				${data.title}
						<#else> 
						     ${data.title[0..15]}... 
						</#if>  
                 	</a>
                 </li>
              </#list>
          </ul>
       	  <div style="margin-top: 15px;padding-left: 7px;">
       		<a href="${base}/guide"  style="color: #E74F26;font-family: '宋体';">详细 ></a>
       	  </div>   
       	  </#if>
        </div>
		
        
     </div>
  </div>
</div>
<!--王璇 2014-11-25 自适应js  -->
<script>
total = document.documentElement.clientHeight;
colHeight = total-document.getElementById("col").offsetTop-135;
document.getElementById("col").style.height=colHeight+"px";
</script>

<#include "/include/footer.ftl"/>
</body>