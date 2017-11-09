<#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/admin/article/queryArticleList' />
  <table cellpadding="0" cellspacing="0" class="tab1">
            <tr class="th1" >
         	 	<th width="346" height="30">
          			&nbsp;&nbsp;学年
         	 	</th>
          		<th width="123" >
         	 		学期
          		</th>
          		<th width="147" >
          			开学时间
         		</th>
         	 	<th width="122" >
                <div align="center">
                	放假时间
                </div>
                </th>
                <th width="122" >
                <div align="center">
                	操作
                </div>                
                </th>
          </tr>
	<#if !queryResult?? || !queryResult.list?? || queryResult.list?size <= 0>
	<tr>
		<td colspan="4" style="color: red">
			暂无数据显示
		</td>
	</tr>
	<#else>
		<#list queryResult.list as data>
			
     	  <tr class="contitle">
         		<td  height="40"><a>&nbsp;&nbsp;${data.schoolYear?string("yyyy")}</a></td>
                <td >
                   <#if data.schoolTerm=="1">
                    <a  href=""> 第一学期</a>
                    <#else>
                     <a  href="">第二学期</a>
                    </#if>
                </td>
                <td>
                    <a  href="">${data.schoolOpeanDate?string("yyyy-MM-dd")}</a>
                </td>
                 <td>
                    <a  href="">${data.schoolCloseDate?string("yyyy-MM-dd")}</a>
                </td>
                <td>
                	<div align="center" class="cz">
                        <a href="javascript:void(0);"  onclick="return confirmDelete('${data.id}');">删除</a>|
                        <a href="${base}/admin/term/modifyForward?id=${data.id}">修改</a>
                	 </div>
                </td>
          </tr>			

		</#list>
	</#if>
</table> 
<#if queryResult?? && queryResult.list?? && queryResult.list?size gt 0>
	<#--分页栏的宏调用--> 
	<@pg.pager queryResult requestUrl pageParam 9 'grid'/>
</#if>
<script type="text/javascript">
function confirmDelete(id,type){

       if (confirm("确认要删除？")) {
            $.ajax({
			url: '${base}/admin/term/deleteSchoolTerm',
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