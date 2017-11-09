<ul id="menulist">
	<li id="menuli">
		<div class="fundiv"><!-- wangxuan 2014-11-28 添加 if 增加点击更换样式功能-->
			<span style="background-image:url(${resRoot}/images/write.png); background-repeat:no-repeat; padding-left:30px;" id="bg1">写工作汇报</span>
		</div>
		<ul class="divli" module="write" style="<#if menuName == 'write'>display:block;<#else>display:block;</#if>">
			<a href="${base}/workingLog/daily?m=write"><li class="cli <#if type="daily">logMenuOn</#if>">写日报</li></a>
			<a href="${base}/workingLog/weekly?m=write"><li class="cli <#if type="weekly">logMenuOn</#if>">写周报</li></a>
			<a href="${base}/workingLog/monthly?m=write"><li class="cli <#if type="monthly">logMenuOn</#if>">写月报</li></a>
			<a href="${base}/workingLog/draftBox?m=write"><li class="cli <#if type="draftBox">logMenuOn</#if>">草稿箱(<span id="draftCount">0</span>)</li></a>
		</ul>
	</li>
	<div style="background-color:#FFF; height:1px; "></div>
	<li id="menuli" >
		<div class="fundiv">
		   <span style="background-image:url(${resRoot}/images/todo.png); background-repeat:no-repeat; padding-left:30px;" id="bg3">审核本部门汇报(<label id="approvingLogAllCount">0</label>)</span>
		</div>
		<ul class="divli" module="adept" style="<#if menuName == 'adept'>display:block;<#else>display:block;</#if>">
			<li <#if logStatus="02"><#if logType="01">logMenuOn</#if></#if> class="cli"><a href="${base}/workingLog/workingLogs?logType=01&logStatus=02&Dsh=01&m=adept">待审核日报(<span id="approvingLogDailyCount">0</span>)</a></li>
			<li <#if logStatus="02"><#if logType="02">logMenuOn</#if></#if> class="cli"><a href="${base}/workingLog/workingLogs?logType=02&logStatus=02&Dsh=02&m=adept">待审核周报(<span id="approvingLogWeekCount">0</span>)</a></li>
			<li <#if logStatus="02"><#if logType="03">logMenuOn</#if></#if> class="cli"><a href="${base}/workingLog/workingLogs?logType=03&logStatus=02&Dsh=03&m=adept">待审核月报(<span id="approvingLogMonthCount">0</span>)</a></li>		
		</ul>
	</li>
	<div style="background-color:#FFF; height:1px;"></div>
	<li id="menuli" >
		<div class="fundiv">
			<span style="background-image:url(${resRoot}/images/search.png); background-repeat:no-repeat; padding-left:30px;" id="bg2">查看我的汇报</span>
		</div>
		<ul class="divli" module="my" style="<#if menuName == 'my'>display:block;<#else>display:block;</#if>">
			<li class="cli <#if logStatus="03" && type="myWorkingLog">logMenuOn</#if>"><a href="${base}/workingLog/myWorkingLog?logStatus=03&ysh=01&m=my">我的已审核(<span id="approvedLogCount">0</span>)</a></li>
			<li class="cli <#if logStatus="02" && type="myWorkingLog">logMenuOn</#if>"><a href="${base}/workingLog/myWorkingLog?logStatus=02&m=my">我的待审核(<span id="approvingLogCount">0</span>)</a></li>
			<li class="cli <#if logStatus="04" && logType="01">logMenuOn</#if>"><a href="${base}/workingLog/myWorkingLog?logType=01&logStatus=04&m=my">我的退回(<span id="returnLogCount">0</span>)</a></li>
		</ul>
	</li>
	<div style="background-color:#FFF; height:1px"></div>
	<li id="menuli" >
		<div class="fundiv">
			<span style="background-image:url(${resRoot}/images/search.png); background-repeat:no-repeat; padding-left:30px;" id="bg4">查看本部门汇报</span>
		</div>
		<ul class="divli" module="dept" style="<#if menuName == 'dept'>display:block;<#else>display:block;</#if>">
			<a href="${base}/workingLog/workingLogs?logType=01&logStatus=03&Dsh=01&m=dept"><li class="cli <#if logStatus="03" && logType="01">logMenuOn</#if>">部门日报(<span id="approvedDailyAllCount">0</span>)</li></a>
			<a href="${base}/workingLog/workingLogs?logType=02&logStatus=03&Dsh=02&m=dept"><li class="cli <#if logStatus="03" && logType="02">logMenuOn</#if>">部门周报(<span id="approvedWeeklyAllCount">0</span>)</li></a>
			<a href="${base}/workingLog/workingLogs?logType=03&logStatus=03&Dsh=03&m=dept"><li class="cli <#if logStatus="03" && logType="03">logMenuOn</#if>">部门月报(<span id="approvedMonthAllCount">0</span>)</li></a>
		</ul>
	</li>
	<div style="background-color:#FFF; height:1px"></div>
	<#if sessionUser.isManager='Y'>
		<li id="menuli" >
			<div class="fundiv">
				<span style="background-image:url(${resRoot}/images/set.png); background-repeat:no-repeat; padding-left:30px;" id="bg5">设置</span>
			</div>
			<ul class="divli" module="set" style="<#if menuName == 'set'>display:block;<#else>display:block;</#if>"><!-- add wangxuan 2014-12-4 修改样式-->
				<a href="${base}/workingLog/workLogConfigforwad?type=1&m=set"><li class="cli <#if type="1">logMenuOn</#if>">定时审核</li></a>
				<a href="${base}/workingLog/workLogConfigforwad?type=2&m=set"><li class="cli <#if type="2">logMenuOn</#if>">默认评语</li></a>
			</ul>
		</li>
	</#if>
</ul>

<input type="hidden" id="menuName" value="${menuName}"/>

<script type="text/javascript" language="javascript">
	$(function(){		
	
		/**$(".fundiv").click(function(){
		    $(this).parent().find("ul").slideToggle();
		});	
		
		// 默认收起所有菜单，如果没有传递过来menuName则展开第一个菜单,否则展开对应菜单
		//$("#menulist").find(".divli").hide();
		var menuName = $("#menuName").val();
		if(iuspUtil.isEmpty(menuName)){
			$("#menulist").find(".divli").eq(0).show();
		} else {
			//$("#menulist").find("ul[module='"+menuName+"']").show();
		}
		
		
		$("#menulist li div").click(function(){
		 var bg=$('span',this).attr('style');
	 	  if(bg.indexOf('down')<0){
			$('span',this).attr('style',"background-image:url(${resRoot}/images/down.png); background-repeat:no-repeat; padding-left:30px;");
		  }
		  else if(bg.indexOf('down')>=0){
			  if($('span',this).attr('id')=='bg1'){
				  $('span',this).attr('style','background-image:url(${resRoot}/images/write.png); background-repeat:no-repeat; padding-left:30px;');
			  }
			  if($('span',this).attr('id')=='bg2'){
				  $('span',this).attr('style','background-image:url(${resRoot}/images/search.png); background-repeat:no-repeat; padding-left:30px;');
			  }
			  if($('span',this).attr('id')=='bg3'){
				  $('span',this).attr('style','background-image:url(${resRoot}/images/todo.png); background-repeat:no-repeat; padding-left:30px;');
			  }
			  if($('span',this).attr('id')=='bg4'){
				  $('span',this).attr('style','background-image:url(${resRoot}/images/search.png); background-repeat:no-repeat; padding-left:30px;');
			  }
			  if($('span',this).attr('id')=='bg5'){
				  $('span',this).attr('style','background-image:url(${resRoot}/images/set.png); background-repeat:no-repeat; padding-left:30px;');
			  }
		  }
		});**/
		
		$("#menulist li").hover(function(){
		    $(this).addClass('lihov');
		},function(){
			  $(this).removeClass('lihov');
		});
		
		<!-- 王璇  我把此代码放下面了因为此段代码下的逻辑代码不管用 -->
		workingLog.queryMyLogCount();
		workingLog.queryWorkingLogCount();
		workingLog.queryMyCheckLogCount();
		
	});
	
	function refresh()
		{
		   workingLog.queryMyLogCount();
			workingLog.queryWorkingLogCount();
			workingLog.queryMyCheckLogCount();
		}
		setInterval('refresh()',300000); 
		
 </script>