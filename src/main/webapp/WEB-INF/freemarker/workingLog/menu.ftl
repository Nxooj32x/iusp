<ul id="menulist">
	<li id="menuli">
		<div class="fundiv">
			<span style="background-image:url(${resRoot}/images/write.png); background-repeat:no-repeat; padding-left:30px;" id="bg1">写工作汇报</span>
		</div> 
		<!-- style="<#if menuName=='write'>display:block;<#else>display:none;</#if>" -->
		<ul class="divli" module="write" style="<#if menuName == 'write'>display:block;<#else>display:block;</#if>"><!-- wangxuan   2014-12-3 添加if 判断点击变色-->
			<a href="${base}/workingLog/daily?m=write">
				<li class="cli <#if type="daily">logMenuOn</#if>">
					写日报
				</li>
			</a>
			<a href="${base}/workingLog/weekly?m=write">
				<li class="cli <#if type="weekly">logMenuOn</#if>">
					写周报
				</li>
			</a>
			<a href="${base}/workingLog/monthly?m=write">
				<li class="cli <#if type="monthly">logMenuOn</#if>">
					写月报
				</li>
			</a>
			<a href="${base}/workingLog/draftBox?m=write">
				<li class="cli <#if type="draftBox">logMenuOn</#if>">
					草稿箱(<span id="draftCount">0</span>)
				</li>
			</a>
		</ul>
	</li>
	<div style="background-color:#FFF; height:1px;"></div>
	<li id="menuli" >
		<div class="fundiv">
		   <span style="background-image:url(${resRoot}/images/search.png); background-repeat:no-repeat; padding-left:30px;" id="bg1">查看我的汇报</span>
		</div>
		<ul class="divli" module="my" style="<#if menuName == 'my'>display:block;<#else>display:block;</#if>"><!-- wangxuan   2014-12-3 添加if 判断点击变色-->
			<a href="${base}/workingLog/myWorkingLog?logType=01&logStatus=03&m=my">
				<li class="cli <#if type="myWorkingLog" && logType="01">logMenuOn</#if>">
					我的日报(<span id="approvedDailyCount">0</span>)
				</li>
			</a>
			<a href="${base}/workingLog/myWorkingLog?logType=02&logStatus=03&m=my">
				<li class="cli <#if type="myWorkingLog" && logType="02">logMenuOn</#if>">
					我的周报(<span id="approvedWeeklyCount">0</span>)
				</li>
			</a>
			<a href="${base}/workingLog/myWorkingLog?logType=03&logStatus=03&m=my">
				<li class="cli <#if type="myWorkingLog" && logType="03">logMenuOn</#if>">
					我的月报(<span id="approvedMonthCount">0</span>)
				</li>
			</a>
			<a href="${base}/workingLog/myWorkingLog?logStatus=02&m=my">
				<li class="cli <#if logStatus="02" && type="myWorkingLog">logMenuOn</#if>">
					我的待审核(<span id="approvingLogCount">0</span>)
				</li>
			</a>
			<a href="${base}/workingLog/myWorkingLog?logType=01&logStatus=04&m=my">
				<li class="cli <#if logType="01" && logStatus="04">logMenuOn</#if>">
					退回(<label id="returnLogCount">0</label>)
				</li>
			</a>
		</ul>
	</li>
	<div style="background-color:#FFF; height:1px"></div>
	<li id="menuli" >
		<div class="fundiv">
		   <span style="background-image:url(${resRoot}/images/todo.png); background-repeat:no-repeat; padding-left:30px;" id="bg3">查看本部门汇报</span>
		</div>
		<ul class="divli" module="dept" style="<#if menuName == 'dept'>display:block;<#else>display:block;</#if>">		<!-- wangxuan   2014-12-3 添加if 判断点击变色-->																																																																										<!-- 王璇 2014-12-3 只查看已审核--->
			<a href="${base}/workingLog/workingLogs?logType=01&isDept=Y&logStatus=03&Dsh=01&m=dept">
				<li class="cli <#if logType="01" && isDept="Y">logMenuOn</#if>">
					部门日报(<span id="deptDailyAllCount">0</span>)
				</li>
			</a>
			<a href="${base}/workingLog/workingLogs?logType=02&isDept=Y&logStatus=03&Dsh=02&m=dept">
				<li class="cli <#if logType="02" && isDept="Y">logMenuOn</#if>">
					部门周报(<span id="deptWeekAllCount">0</span>)
				</li>
			</a>
			<a href="${base}/workingLog/workingLogs?logType=03&isDept=Y&logStatus=03&Dsh=03&m=dept">
				<li class="cli <#if logType="03" && isDept="Y">logMenuOn</#if>">
					部门月报(<span id="deptMonthAllCount">0</span>)
				</li>
			</a>
		</ul>
	</li>
<ul>

<input type="hidden" id="menuName" value="${menuName}"/>

<script type="text/javascript" language="javascript">
	
	$(function(){
	
		//默认收起所有菜单，如果没有传递过来menuName则展开第一个菜单
		//$("#menulist").find(".divli").hide();
		/**var menuName = $("#menuName").val();
		if(iuspUtil.isEmpty(menuName)){
			$("#menulist").find(".divli").eq(0).show();
		} else {
			//$("#menulist").find("ul[module='"+menuName+"']").show();
		}
		
		// 点击主菜单，展开子菜单
		$(".fundiv").click(function(){
		    $(this).parent().find("ul").slideToggle();
		});
	
		$("#menulist li div").click(function(){
		  	var bg=$('span',this).attr('style');
	 	  	if(bg.indexOf('down')<0){
				$('span',this).attr('style',"background-image:url(${resRoot}/images/down.png); background-repeat:no-repeat; padding-left:30px;");
		 	} else if(bg.indexOf('down')>=0){
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
				  $('span',this).attr('style','background-image:url(${resRoot}/images/back.png); background-repeat:no-repeat; padding-left:30px;');
			  }
			  if($('span',this).attr('id')=='bg5'){
				  $('span',this).attr('style','background-image:url(${resRoot}/images/set.png); background-repeat:no-repeat; padding-left:30px;');
			  }
		  	}
		});**/
		
		// 查询普通教职工菜单中对应的数量
		workingLog.queryMyLogCount();
		
		$("#menulist li").hover(function(){
		    $(this).addClass('lihov');
		},function(){
			$(this).removeClass('lihov');
		});
	});
	
</script>