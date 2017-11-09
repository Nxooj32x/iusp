<#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/workingLog/queryMyWorkingLogList' />
<div style="padding-top:50px;">
<table  border="1"  class="ctab">
    <tr align="center" class="tt">
    	<td>汇报类型</td>
    	<td>日志时间</td>
    	<td>提交时间</td>
    	<td>状态</td>
    	<#if pageParam.logStatus!='02'>
	    	<td>评分</td>
	    	<td>审核人</td>
    	</#if>
    	<td>内容预览</td>
    	<td>&nbsp;</td>
     </tr>
    <#if !queryResult?? || !queryResult.datas?? || queryResult.datas?size <= 0>
	<tr>
		<td colspan="<#if pageParam.logStatus!='02'>8<#else>6</#if>" style="color: red;text-align:center">
			暂无数据显示
		</td>
	</tr>
	<#else>
		<#list queryResult.datas as data>
		    <tr align="center" style="font-size:14px;" height="28px;">
			    <td>
			    	<#if data.logType == '01'>
			    		日报
			    	<#elseif data.logType == '02'>
			    		周报
			    	<#elseif data.logType == '03'>
			    		月报
			    	</#if>
			    </td>
			    <td>
			    	<#if data.logType =='02'>
			    		第${data.week}周
			    	<#else>
			    		${data.logTime}
			    	</#if>
			    </td>
			    <td>${data.fillTime?string("yyyy-MM-dd HH:mm:ss")}</td>
			    <td>
			    	<#if data.logStatus == '01'>
			    		草稿
			    	<#elseif data.logStatus == '02'>
			    		已提交
			    	<#elseif data.logStatus == '03'>
			    		审批通过
			    	<#elseif data.logStatus == '04'>
			    		退回
			    	</#if>
			   	</td>
			    <#if pageParam.logStatus!='02'>
			    <td>${data.score}</td>
			    <td>${data.approverName}</td>
			    </#if>
			    <td>
			     <#if data.nowWorkInfo?length gt 6>   
		             ${data.nowWorkInfo[0..6]}...
				<#else> 
					 ${data.nowWorkInfo}
				</#if> 
			    
			    </td>
			    <td class="look">
			    	<#if data.logStatus!='04'>
			    		<span><a onclick="workingLog.gotoPage('${base}/workingLog/viewWorkingLog?id=${data.id}&time=${data.logTime}')" href="javascript:void(0);">查看</a></span>
			    	<#else>
			    		<span><a onclick="workingLog.gotoEditPage('${base}/workingLog/<#if data.logType == '01'>daily<#elseif data.logType == '02'>weekly<#elseif data.logType == '03'>monthly</#if>?id=${data.id}')" href="javascript:void(0);" >编辑</a></span><!-- <#if data.logType == '01'>daily<#elseif data.logType == '02'>weekly<#elseif data.logType == '03'>monthly</#if> -->
			    	</#if>
			    </td>
		    </tr>
	   </#list>
	</#if>
</table>
<#if queryResult?? && queryResult.datas?? && queryResult.datas?size gt 0>
	<#--分页栏的宏调用--> 
	<@pg.pager queryResult requestUrl pageParam 9 'logGrid'/>
</#if>
</div>