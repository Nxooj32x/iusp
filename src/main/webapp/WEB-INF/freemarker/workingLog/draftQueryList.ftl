<#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/workingLog/queryMyWorkingLogList' />
<div style="padding-top:50px;">
<table  border="1"  class="ctab">
	<tr align="center" class="tt" height="30px;">
		<td>所属部门</td>
		<td>汇报类型</td>
		<td>日志时间</td>
		<td>保存时间</td>
		<td></td>
    </tr>
    <#if !queryResult?? || !queryResult.datas?? || queryResult.datas?size <= 0>
	<tr>
		<td colspan="5" style="color: red;text-align:center">
			暂无数据显示
		</td>
	</tr>
	<#else>
		<#list queryResult.datas as data>
		    <tr align="center" style="font-size:14px;" height="28px;">
			    <td>${sessionUser.orgName}</td>
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
			    <td class="look">
			    <span><a href="javascript:void(0);" onclick="return confirmDelete('${data.id}','${data.type}');">删除</a></span>|
			    <span>
			    <a href="${base}/workingLog/<#if data.logType == '01'>daily<#elseif data.logType == '02'>weekly<#elseif data.logType == '03'>monthly</#if>?id=${data.id}">编辑</a>
			    </span>
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
<script type="text/javascript">
function confirmDelete(id,type){

       if (confirm("确认要删除？")) {
            $.ajax({
			url: '${base}/workingLog/deleteDraftById',
			type: 'POST',
			async: false,
			dataType: "json",
			data: {"ids":id},
			success: function(data){
				if(data.flag){
					alert(data.message);
					location.replace(location.href);
				} else {
					alert(data.message);
					location.replace(location.href);
				}
			},
			error: function(){
				alert("对不起，您的操作失败，请重新操作！");
				return false;
			}
		});
        }
}
</script>