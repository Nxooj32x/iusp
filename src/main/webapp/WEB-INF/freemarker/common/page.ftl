<#-- 分页（Pager对象、链接URL、最大页码显示数） -->
<#macro pager pager baseUrl parameterMap={} maxShowPageCount = 9  parentid="grid" isShowJump="Y">
	<#local pageNumber = pager.pageNum />
	<#local pageSize = pager.pageSize />
	<#local pageCount = pager.pages />
	<#local totalDataCount = pager.total />
	
	<#--
		这两个这里没用，也不知道以前是做什么用的，只是放这儿	
		<#local property = pager.property />
		<#local keyword = pager.keyword />
	-->
	<#--
		这两个这里没用，以前是为查询数据排序用的，放这儿以防万一
		<#local orderBy = pager.orderBy />
		<#local orderType = pager.orderType />
	-->
	<#--
		构造查询参数 start
	-->
		<#local parameter = "{" />
		<#if pageSize??>
			<#local parameter = parameter + "\'pageSize\':" + pageSize />
		</#if>
		
		<#--
		查询排序
		<#if (orderBy != "")!>
			<#local parameter = parameter + "&pager.orderBy=" + orderBy />
		</#if>
		<#if (orderType != "")!>
			<#local parameter = parameter + "&pager.orderType=" + orderType />
		</#if>
		-->
		<#list parameterMap?keys as key>
			<#if parameterMap[key] != null && parameterMap[key] != "">
				<#local parameter = parameter + ","/>
				<#local parameter = parameter + "\'" + key + "\':\'" + parameterMap[key]+"\'" />
			</#if>
		</#list>
		<#local parameter =parameter + "}"/>
	<#--
		构造查询参数 end
	-->
	<div class="snPages">
		<select style='display:none;' onChange="loaddata('${baseUrl}',1,${parameter},'${parentid}',this.value);">
					<option value="20" <#if pageSize=20>selected</#if>>20</option>
					<option value="30" <#if pageSize=30>selected</#if>>30</option>
					<option value="40" <#if pageSize=40>selected</#if>>40</option>
					<option value="50" <#if pageSize=50>selected</#if>>50</option>
		</select>
		<input id="pageparameter" type="hidden" value="${parameter}"/>
		<input id="pageNumber" type="hidden" value="${pageNumber}" />
		<input id="totalDataCount" type="hidden" value="${totalDataCount}" />
	<#if (pageCount >0)>
		<#if maxShowPageCount <= 0>
			<#local maxShowPageCount = 9>
		</#if>
	<#--
		设置数字的开始和结束 start
	-->
		<#local segment = (maxShowPageCount/2)?int />
		<#local startPageNumber = pageNumber-segment/>
		<#local endPageNumber = pageNumber+segment />
		
	
		<#local startPageNumber = pageNumber-segment/>
		<#local endPageNumber = pageNumber+segment />
		<#if (startPageNumber < 1)>
			<#local startPageNumber = 1 />
			<#local endPageNumber = maxShowPageCount />
		</#if>
		<#if (endPageNumber > pageCount)>
			<#local endPageNumber = pageCount />
			
			<#local startPageNumber = pageCount-maxShowPageCount+1 />
			<#if (startPageNumber < 1)>
				<#local startPageNumber = 1 />
			</#if>
		</#if>
	<#--
		设置数字的开始和结束 end
	-->
	<#--
		放置html元素 start
	-->
	
		<span style="display:none" href="javascript:void(0);" id="${parentid}_nowpage" onclick="$.page.loadData('${baseUrl}',${pageNumber},${parameter},'${parentid}');"><b></b>当前页刷新</span>
		<#if (pageNumber > 1)>
			<span class="prev" href="javascript:void(0);"  onclick="$.page.loadData('${baseUrl}',${pageNumber-1},${parameter},'${parentid}');"><b></b>上一页</span>
		<#else>
			<span class="prev" style="color:#b1b1b1;" href="javascript:void(0);"><b></b>上一页</span>
		</#if> 
		<#list  startPageNumber .. endPageNumber  as index>
			<#if pageNumber != index>
				<a href="javascript:void(0);" class="other" onclick="$.page.loadData('${baseUrl}',${index},${parameter},'${parentid}');">${index}</a>
			<#else>
				<a href="javascript:void(0);" class="current">${index}</a> 
			</#if>
		</#list>
		<#if pageNumber < pageCount>>
			<span class="next" href="javascript:void(0);" onclick="$.page.loadData('${baseUrl}',${pageNumber+1},${parameter},'${parentid}');"><b></b>下一页</span>
		<#else>
			<span class="next" style="color:#b1b1b1;" href="javascript:void(0);`"><b></b>下一页</span> 
		</#if>
		<#if isShowJump=="Y">
		<div> 
			总数:${totalDataCount}&nbsp;&nbsp;共${pageCount}页  &nbsp;&nbsp;跳转至<input type="text" onkeydown="if(event.keyCode==13){$.page.clickSubmit(this,'${baseUrl}',${parameter},'${parentid}',${pageCount},${pageNumber},${pageSize});}"/>页<input type="button" value="确定" onclick="$.page.okClick(this,'${baseUrl}',${parameter},'${parentid}',${pageCount},${pageNumber},${pageSize});" class="pagesubmit">
		</div>
		</#if>
	</#if>
</div>
</#macro>