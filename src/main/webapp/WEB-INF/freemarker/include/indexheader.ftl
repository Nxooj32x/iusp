<div class="headerwrap">
    <div class="header wrap clearfix"><!--王璇 2014-12-8 点击变颜色-->
       <!--  <span class="menu"><a href="javascript:void(0);" >网站地图（待开发）</a></span> --> <span class="menu"><a href="${base}/contacts"><font <#if contacts='contacts'>style="color:#FF0"</#if>>校内通讯录</font></a></span>
    </div>
</div>
<div class="form">
    
<div class="wrap-con">
        <div class="navwrap clearfix">
            <div class="logowrap fL">
            	<a href="${base}/index"><img src="${resRoot}/images/navlogo.png" alt="" width="460"></a>
          </div>
            <div class="nav">
            	<span class="">
            		<a href="${base}/index" ><font style="color:#FF0">首页</font></a>
            	</span>
           	 	<span><!--王璇 2014-12-8 点击变颜色-->
              		<a href="${base}/studentSer"><font <#if studentSer='studentSer'>style="color:#FF0"</#if>>学生服务指南</font></a>
          	</span>
            	<span><!--王璇 2014-12-8 点击变颜色-->
              		<a href="${base}/teacherSer"><font <#if teacherSer='teacherSer'>style="color:#FF0"</#if>>教工服务指南</font></a>
          	</span>
            	<span class="last"><!--王璇 2014-12-8 点击变颜色-->
                  	<a href="${base}/institutionSer"><font <#if institutionSer='institutionSer'>style="color:#FF0"</#if>>部门服务指南</font></a>
          	</span>
          </div>
        </div>
        <div class="userwrap clearfix">
          <form id="login-form" action="/base/auth" method="post">
            <div class="aside">
            <p>&nbsp;</p>
                <div class="t">
                	<span class="t-bg"><a class="login-con" href="${base}/teacherSer">登录说明</a></span>
                	<span class="t-bg"><a class="forget-par" href="${base}/teacherSer">忘记密码?</a></span>
                	<h3>用户登录</h3>
              </div>
                <div class="login" id="loginPanel">
                	<#include "/include/loginInfo.ftl" />
                </div>
            </div>
            </form>
            <div class="article">
                <div class="menu clearfix menu1">
               	  <h2 class="w2">常用软件下载</h2>
                </div>
                <div class="download clearfix">
                	<#if softList?? && softList?size &gt; 0>
	                    <ul class="download-l">
	                    	<#list softList as data>
		           				<li>
		                        	<a href="${base}/${data.downaddr}" target="_blank">
		                       			<#if data.downName?length lt 10>   
		                       				${data.downName}
										<#else> 
										    ${data.downName?substring(0,9)} 
										</#if>

		                            </a>
		                        </li>
	                        </#list>
	                  	</ul>
                  	</#if>
                    <div class="download-r">
                        <img src="${resRoot}/images/download1.png">
                    </div>
                </div>
            </div> 
        </div>
    </div>
</div>