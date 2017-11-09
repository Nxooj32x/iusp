<div class="headerwrap">
    <div class="header wrap clearfix" >
        <span style="float:right;color:#81868a"> 
        ${sessionUser.realName}  （${sessionUser.userName}）| 
        <a href="${base}/auth/logout" style="color:#81868a">注销</a> </span>
    </div>
</div>
<div class="form">   
<div class="wrap-con">
        <div class="navwrap clearfix">
            <div class="logowrap fL">
            	<a href="${base}/index"><img src="${resRoot}/images/navlogo.png"  width="460" ></a>
          </div>
           <div class="nav2">
              <span><!--王璇 2014-12-8 点击变颜色-->
              	<a href="${base}/studentSer" ><font <#if studentSer='studentSer'>style="color:#FF0"</#if>>学生服务指南</font></a>
              </span>
              <span><!--王璇 2014-12-8 点击变颜色-->
              	<a href="${base}/teacherSer" ><font <#if teacherSer='teacherSer'>style="color:#FF0"</#if>>教职工服务指南</font></a>
              </span>
              <span><!--王璇 2014-12-8 点击变颜色-->
              	<a href="${base}/institutionSer" ><font <#if institutionSer='institutionSer'>style="color:#FF0"</#if>>部门服务指南</font></a>
              </span>
          </div>
            <div class="nav" style="margin-top:5px">
            	<span>
            		<a href="${base}/index"><font <#if sy='01'>style="color:#FF0"</#if>>首页</font></a>
            	</span>
            	<span style="margin-right:28px;"></span>   
           <!--王璇 判断是否为物管，物管不显示--->
           	 <span> 
           	 		<#if sessionUser.roleCode != '4'>  
              		<a <#if sessionUser.positionCode == '001' || sessionUser.positionCode == '002' || sessionUser.positionCode == '003'>href="${base}/workingLog/index"
              		 
              			<#else> href="${base}/workingLog/daily"  </#if>>
              		<font <#if wk='work'>style="color:#FF0"</#if>>工作汇报</font></a><!-- 王璇增加判断 点击后有颜色-->
              		
              		</#if>
          	</span>
          	
          	 <span>&nbsp;&nbsp;</span>
            	<span class="last">
                  	<a href="${base}/repair/forward?pageName=allRepair"><font <#if wk='repair'>style="color:#FF0"</#if>>后勤报修</font></a>
          	</span>
          </div>
        </div> 
        </div>
</div>     