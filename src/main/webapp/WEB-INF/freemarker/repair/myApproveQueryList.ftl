<#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/repair/queryMyApproveRepairList' />

<table border="1" class="ctab">
	<tr align="center" class="tt">
		<td>报修时间</td>
		<td>部门</td>
		<td>报修人</td>
		<td>联系电话</td>
		<td>报修内容</td>
    	<td>办理</td>
    </tr>
    <#if !queryResult?? || !queryResult.datas?? || queryResult.datas?size <= 0>
  		<tr align="center" >
			<td style="color:red" colspan="6">暂无数据</td>
		</tr>
 	<#else>
 		<#list queryResult.datas as data>
		    <tr align="center">
		   		<td style="">${data.applayTime?string('yyyy-MM-dd')}</td>
				<td title="${data.departName}">
					<#if data.departName?length gt 6>   
			             ${data.departName[0..6]}...
					<#else> 
						 ${data.departName}
					</#if> 
				</td>
				<td>${data.applayStaffName}</td>
				<td>
					<#if data.applayStaffInfo ??>
						${data.applayStaffInfo.telephone}
					</#if>
				</td>
				<td>
					<#if data.applayContentText?length gt 6>   
			             ${data.applayContentText[0..6]}...
					<#else> 
						 ${data.applayContentText}
					</#if> 
				</td>
		  	 	<td class="look"><span><a href="${base}/repair/myApproveRepairView?id=${data.id}">点击办理</a></span></td>
		    </tr>
	    </#list>
	</#if>
</table>
<div class="pages">
	<#if queryResult?? && queryResult.datas?? && queryResult.datas?size gt 0>
		<#--分页栏的宏调用--> 
		<@pg.pager queryResult requestUrl pageParam 9 'grid' 'N'/>
	</#if>
</div>