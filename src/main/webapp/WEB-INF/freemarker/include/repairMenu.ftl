<ul id="menulist">	

	<!-- 角色判断
		1、物管人员： roleCode 为4
		2、后勤主管：部门编码为72（后勤保障处） 岗位编码为007
		3、后勤处长：部门编码为72（后勤保障处） 为后勤保障处负责人(正职或副职) isManager为Y
		4、分管副院长：岗位编码为003（查询自己分管部门的报修情况）
		5、院长：岗位编码为001
		
		以上是描述，实际上就两种判断 一种是普通教职工的，一种是领导的
	-->
	<div class="divli">
	  	<li class="cli" module="mar">
	  		<a href="${base}/repair/forward?pageName=allRepair">全院报修情况(<span class="color1" id="allApplayRepair">0</span>)</a>
	  	</li>	  
	
	  	<!--员工可能会出现兼岗的情况，所以这里的判断需对登陆人每个岗位进行判断，有一个符合则显示-->
	  	<#assign isAllow = 'N' >
	  	<#if sessionUser.users?? && sessionUser.users?size gt 0>
	  		<#list sessionUser.users as data>
  				<#if (sessionUser.orgCode == '72' && sessionUser.positionCode == '007') || 
				  		(sessionUser.orgCode == '72' && sessionUser.isManager == 'Y') || 
				  		(sessionUser.orgCode == '70' && sessionUser.isManager == 'Y')||
				  		sessionUser.positionCode == '003' || sessionUser.positionCode == '001'>
				  	<#assign isAllow = 'Y' >
				</#if>
	  		</#list>
	  	</#if>
	  	
	  	<#if sessionUser.roleCode == '4' || isAllow == 'Y'>
	  		<li class="cli" module="mma">
		    	<a href="${base}/repair/forward?pageName=myApproveTask">我的任务(<span class="color1" id = "myUnfinishedTask">0</span>)</a>
		    </li>
		 	<li class="cli" module="mmac">
		 		<a href="${base}/repair/forward?pageName=lmdfinishtask&repairStatus=3">我的已完成任务(<span class="color1" id ="myFinishedTask">0</span>)</a>
		 	</li>
	  	</#if>
	  	
	  	<li class="cli" module="mlcdr">
	    	<a href="${base}/repair/forward?pageName=lcdrepair">我要报修</a>
	    </li>
	  	<li class="cli" module="mlcd">
	  		<a href="${base}/repair/forward?pageName=lcd">我的报修(<span class="color1" id="myApplayRepair">0</span>)</a>
	  	</li>
	</div> 
</ul>

<script type="text/javascript" language="javascript">
	$(function(){
	
		// 选中菜单,在页面添加<input type="hidden" id="module" value="menuAll"/>, menu li中添加module属性 与隐藏域中值对应
		var module = $("#module").val();
		$("#menulist li").each(function(){
			$(this).removeClass("menu_on");
			if($(this).attr("module") == module){
				$(this).addClass("menu_on");
			}
		});
		
		$("#menulist li").click(function(){
		    $('ul',this).slideToggle();
		});
		$("#menulist li").hover(function(){
		    $(this).addClass('lihov');
		},function(){
			$(this).removeClass('lihov');
		});
	 repair.queryMenuCount();
	});
		
	function refresh()
	{
		 repair.queryMenuCount();

	}
		setInterval('refresh()',300000); 
 </script>