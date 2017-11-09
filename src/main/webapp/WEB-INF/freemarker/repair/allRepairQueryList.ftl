<#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/repair/queryAllRepairList' />
<table border="1" class="ctab">
	<tr align="center" class="tt">
		<td>报修时间</td>
		<td>部门</td>
		<td>报修人</td>
		<td>报修内容</td>
		<td>当前受理人</td>
		<td>状态</td>
		<td>完成时间</td>
		<td>满意度</td>
		<!--<td>意见与建议</td>-->
		<td>查看详情</td>
	</tr>
	<#if !queryResult?? || !queryResult.datas?? || queryResult.datas?size <= 0>
  		<tr align="center" >
			<td style="color:red" colspan="10">暂无数据</td>
		</tr>
 	<#else>
 		<#list queryResult.datas as data>
			<tr align="center" >
				<td style="">${data.applayTime?string('yyyy-MM-dd')}</td>
				<td title="${data.departName}">
					<#if data.departName?length gt 5>   
			             ${data.departName[0..5]}...
					<#else> 
						 ${data.departName}
					</#if> 
				</td>
				<td title="${data.applayStaffName}">
					<#if data.applayStaffName?length gt 4>   
			             ${data.applayStaffName[0..4]}...
					<#else> 
						 ${data.applayStaffName}
					</#if> 
				</td>
				<td>
					<#if data.applayContentText?length gt 5>   
			             ${data.applayContentText[0..5]}...
					<#else> 
						 ${data.applayContentText}
					</#if> 
				</td>
				<td title="<#if data.handleStaffInfo ??>${data.handleStaffInfo.realName}</#if>">
					<#if data.handleStaffInfo ??>
						<#if data.handleStaffInfo.realName?length gt 4>   
				             ${data.handleStaffInfo.realName[0..4]}...
						<#else> 
							 ${data.handleStaffInfo.realName}
						</#if> 
					</#if>
				</td>
				<td>
					<#if data.repairStatus = '1'>
						申请中
					<#elseif data.repairStatus = '2'>
						受理中
					<#elseif data.repairStatus = '3'>
						完成
					</#if>
				</td>
				<td>
					<#if data.completeTime??>
						${data.completeTime?string('yyyy-MM-dd')}
					</#if>
				</td>
				<td>
					<#--0不满意，1满意，2比较满意，3非常满意-->
					<#if data.satisfaction = '0'>
						不满意
					<#elseif data.satisfaction = '1'>
						满意
					<#elseif data.satisfaction = '2'>
						比较满意
					<#elseif data.satisfaction = '3'>
						非常满意
					</#if>
				</td>
				<!--<td>
					<#if data.suggestions?length gt 6>   
			             ${data.suggestions[0..6]}...
					<#else> 
						 ${data.suggestions}
					</#if>
				</td>--> 
			    <td class="look"><span><a href="${base}/repair/allRepairView?id=${data.id}">查看</a></span></td>
			</tr>
		</#list>
	</#if>
</table>

<div class="pages">
	<#if queryResult?? && queryResult.datas?? && queryResult.datas?size gt 0>
		<#--分页栏的宏调用--> 
		<@pg.pager queryResult requestUrl pageParam 9 'grid'  'N'/>
	</#if>
</div>
