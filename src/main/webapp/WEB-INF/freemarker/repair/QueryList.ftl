<#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/repair/queryList' /><!--  queryList lmdFinishTaskqueryList -->
  <table border="1" class="ctab">
	<tr align="center" class="tt">
         	 	<td width="200" height="30">
          			报修时间
         	 	</td>
          		<td width="180" >
           	 		报修内容
          		</td>
          		<td width="80" >
          			状态
         		</td>
         	 	<td width="190" >
                	当前受理人
                </td>
                <td width="80" >
                	满意度
                </td>
                <td width="100" >
                	意见与建议
                </td>                
                 <td width="100" >
                	查看详情
                </td>                  
          </tr>
	<#if !queryResult?? || !queryResult.datas?? || queryResult.datas?size <= 0>
	<tr>
		<td colspan="7" style="color: red">
			暂无数据显示
		</td>
	</tr>
	<#else>
		<#list queryResult.datas as data>
			
     	  <tr class="contitle">
         		<td  height="40"><a>&nbsp;&nbsp;${data.applayTime?string("yyyy-MM-dd HH:mm:ss")}</a></td>
                <td >
                <#if data.applayContent?trim?length < 10>   
		             ${data.applayContent?trim}
			    <#else> 
				     ${data.applayContent?trim?substring(0,9)}...... 
				</#if>
                </td>
                <td>
                <#if data.repairStatus == '1'>
			    		申请中
			    <#elseif data.repairStatus == '2'>
			    		受理中
			    <#elseif data.repairStatus == '3'>
			    		完成
			    
			    </#if>
			    	
                </td>
                 <td>
                  ${data.handleStaffName}  
                </td>
                <td  class="look" align="center">
			    <#if data.satisfaction == '0'>
			    		 不满意
			    <#elseif data.satisfaction == '1'>
			    		 满意
			    <#elseif data.satisfaction == '2'>
			    	 比较满意
			    <#elseif data.repairStatus == '3' && sessionUser.userName == data.applayStaffNo && commentFlg==1 >
			    
                <span><a href="${base}/repair/commentRepairView?id=${data.id}">填写</a></span>
			    
			    </#if>
                </td>
                <td class="look" align="center">
               <#if data.suggestions?length = 0 && data.repairStatus == '3' && sessionUser.userName == data.applayStaffNo &&commentFlg==1>
			    
                 <span><a href="${base}/repair/commentRepairView?id=${data.id}">填写</a></span>
			    <#else>
			       ${data.suggestions}
			    </#if>
                </td>
                <td class="look" align="center"><span><a href="${base}/repair/repairView?id=${data.id}">查看</a></span></td>
          </tr>			

		</#list>
	</#if>
</table> 
<#if queryResult?? && queryResult.datas?? && queryResult.datas?size gt 0>
	<#--分页栏的宏调用--> 
	<@pg.pager queryResult requestUrl pageParam 9 'grid'/>
</#if>