<ul id="menulist">
	<li id="menuli">
		<div class="fundiv">
		   <span style="background-image:url(${resRoot}/images/todo.png); background-repeat:no-repeat; padding-left:30px;" id="bg3">审核分管部门汇报(<label id="approvingLogAllCount">0</label>)</span>
		</div>
		<ul class="divli" module="adept" style="<#if menuName == 'adept'>display:block;<#else>display:block;</#if>">
			<li class="cli <#if logStatus="02" && logType="01">logMenuOn</#if>"><a href="${base}/workingLog/presidentLogs?logType=01&logStatus=02&Dsh=01&m=adept">待审核日报(<span id="checkDayCount">0</span>)</a></li>
			<li class="cli <#if logStatus="02" && logType="02">logMenuOn</#if>"><a href="${base}/workingLog/presidentLogs?logType=02&logStatus=02&Dsh=02&m=adept">待审核周报(<span id="checkDeekCount">0</span>)</a></li>
			<li class="cli <#if logStatus="02" && logType="03">logMenuOn</#if>"><a href="${base}/workingLog/presidentLogs?logType=03&logStatus=02&Dsh=03&m=adept">待审核月报(<span id="checkMonthCount">0</span>)</a></li>				
		</ul>
	</li>		
	<div style="background-color:#FFF; height:1px"></div>
	<li id="menuli">
		<div class="fundiv">
			<span style="background-image:url(${resRoot}/images/search.png); background-repeat:no-repeat; padding-left:30px;" id="bg2">查看分管部门汇报</span>
		</div>
		<ul class="divli" module="vdept"  style="<#if menuName == 'vdept'>display:block;<#else>display:block;</#if>">
			<li class="cli <#if logStatus="03" && logType="01">logMenuOn</#if>"><a href="${base}/workingLog/presidentLogs?logType=01&logStatus=03&Dsh=01&m=vdept">部门日报(<span id="deptDayCount">0</span>)</a></li>
			<li class="cli <#if logStatus="03" && logType="02">logMenuOn</#if>"><a href="${base}/workingLog/presidentLogs?logType=02&logStatus=03&Dsh=02&m=vdept">部门周报(<span id="deptDeekCount">0</span>)</a></li>
			<li class="cli <#if logStatus="03" && logType="03">logMenuOn</#if>"><a href="${base}/workingLog/presidentLogs?logType=03&logStatus=03&Dsh=03&m=vdept">部门月报(<span id="deptMonthCount">0</span>)</a></li>
		</ul>
	</li>
	
	<div style="background-color:#FFF; height:1px"></div>
	<li id="menuli" >
		<div class="fundiv">
			<span style="background-image:url(${resRoot}/images/set.png); background-repeat:no-repeat; padding-left:30px;" id="bg5">设置</span>
		</div>
		<ul class="divli" module="set" style="<#if menuName == 'set'>display:block;<#else>display:block;</#if>"><!--- 修改样式 王璇 2014-12-4-->
			<a href="${base}/workingLog/workLogConfigforwad?type=1&m=set"><li class="cli <#if type="1">logMenuOn</#if>">定时审核</li></a>
			<a href="${base}/workingLog/workLogConfigforwad?type=2&m=set"><li class="cli <#if type="2">logMenuOn</#if>">默认评语</li></a>
		</ul>
	</li>
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
				  $('span',this).attr('style','background-image:url(${resRoot}/images/back.png); background-repeat:no-repeat; padding-left:30px;');
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
		
		workingLog.queryPresidentLogCount();
	});
		function refresh(){
		   workingLog.queryPresidentLogCount();
		}
		setInterval('refresh()',300000); 
 </script>