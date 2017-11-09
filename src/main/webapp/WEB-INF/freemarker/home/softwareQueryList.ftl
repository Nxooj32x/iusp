 <#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/admin/article/queryArticleList' />
  <table cellpadding="0" cellspacing="0" class="tab1">
            <tr class="th1" >
         	 	<th width="386" height="30">
          			&nbsp;&nbsp;文件名
         	 	</th>
          		<th width="253" >
         	 		上传者
          		</th>
          		<th width="147" >
          			上传时间
         		</th>
          </tr>
	<#if !queryResult?? || !queryResult.datas?? || queryResult.datas?size <= 0>
	<tr>
		<td colspan="4" style="color: red">
			暂无数据显示
		</td>
	</tr>
	<#else>
		<#list queryResult.datas as data>
			
     	  <tr class="contitle">
         		<td  height="40"><a href="${base}/${data.downaddr}" sub-line="1" target="_blank">&nbsp;&nbsp;${data.downName}</a></td>
                <td >
                    <a  href=""> ${data.uploader}</a>
                </td>
                <td>
                    <a  href="">${data.createTime?string("yyyy-MM-dd")}</a>
                </td>
          </tr>			

		</#list>
	</#if>
</table> 
<#if queryResult?? && queryResult.datas?? && queryResult.datas?size gt 0>
	<#--分页栏的宏调用--> 
<@pg.pager queryResult requestUrl pageParam 9 'grid' 'N'/>
</#if>
