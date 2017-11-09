<#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/queryHomeArticleList' />
<ul class="notice-list">
	<#if !queryResult?? || !queryResult.list?? || queryResult.list?size <= 0>
  		<li class="clearfix">暂无数据</li>
 	<#else>
		<#list queryResult.list as data>
			<li class="clearfix">
				<p class="des">
					<a href="${base}/article?id=${data.id}" target="_blank" sub-line="1" style="float: none; position: static;">${data.title}</a>
				</p>
				<span class="time">${data.createTime?string("yyyy-MM-dd")}</span>
			</li>
		</#list>
 	</#if>
</ul>
<div class="clear"></div>
<div class="pages">
	<#if queryResult?? && queryResult.list?? && queryResult.list?size gt 0>
		<#--分页栏的宏调用--> 
		<@pg.pager queryResult requestUrl pageParam 9 'grid' 'N'/>
	</#if>
</div>