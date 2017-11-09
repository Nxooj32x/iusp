<#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/admin/article/queryArticleList' />
  <table cellpadding="0" cellspacing="0" class="tab1">
            <tr class="th1" >
         	 	<th width="346" height="30">
          			&nbsp;&nbsp;文件名
         	 	</th>
          		<th width="123" >
         	 		上传者
          		</th>
          		<th width="147" >
          			上传时间
         		</th>
         	 	<th width="122" >
                <div align="center">
                	操作</div>
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
         		<td  height="40"><a>&nbsp;&nbsp;${data.downName}</a></td>
                <td >
                    <a  href=""> ${data.uploader}</a>
                </td>
                <td>
                    <a  href="">${data.createTime?string("yyyy-MM-dd")}</a>
                </td>
                <td>
                	<div align="center" class="cz">
                        <a href="javascript:void(0);" onclick="return confirmDelete('${data.id}','${data.type}');">删除</a>
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

    IuspMsg.confirm("提示","确定要删除此记录",function(){
            $.ajax({
				url: '${base}/admin/software/deleteSoftware',
				type: 'DELETE',
				dataType: "json",
                data: JSON.stringify({"ids":id}),
				contentType:"application/json;charset=UTF-8",
				success: function(data){
                    IuspMsg.tip("提示",data.msg);
                },
            })},function(){
    });
}
</script>