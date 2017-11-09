<#import "/common/page.ftl" as pg>
<#--此处为获取表格数据的url--> 
<#assign requestUrl = '${base}/workingLog/queryWorkingLogList' />
<div style="padding-top:50px;">
<table  border="1"  class="ctab">
    <tr align="center" class="tt">
    	<td class='with-checkbox' width="6%"> <input type="checkbox" class="check_all" onclick="allSelect()"   id="allSelect"/><label style="vertical-align:middle;float:left;padding-top:8px;font-size:11px;">全选</label></td>
    	<td style="width:100px">部门</td>	
    	<td>姓名</td>
    	<td>工号</td>
    	<td>日志时间</td>
    	<td  style="width:100px">提交时间</td>
    	<#if pageParam.logStatus=='03'>
    		<td>状态</td>
	    	<td>评分</td>
	    	<td>审核人</td>
    	</#if>
    	<td>内容预览</td>
    	<td>&nbsp;</td>
     </tr>
    <#if !queryResult?? || !queryResult.datas?? || queryResult.datas?size <= 0>
	<tr>
		<td colspan="<#if  pageParam.logStatus=='03'>11<#else>8</#if>" style="color: red;text-align:center">
			暂无数据显示
		</td>
	</tr>
	<#else>
		<#list queryResult.datas as data>
		    <tr align="center" style="font-size:14px;" height="28px;">
		    	<td class='with-checkbox' width="6%"> <input type="checkbox" name="check"  value="${data.id}"/> </td>
			    <td>${data.staffOrg.orgName}</td>
			    <td>${data.staffName}</td>
			     <td>${data.staffNo}</td>
			    <td>
			    	<#if data.logType =='02'>
			    		第${data.week}周
			    	<#else>
			    		${data.logTime}
			    	</#if>
			    </td>
			    <td>${data.fillTime?string("yyyy-MM-dd HH:mm:ss")}</td>
			    <#if pageParam.logStatus=='03'>
			    	<td>
			    		<#if data.logStatus =='01'>
				    		草稿
				    	<#elseif data.logStatus =='02'>
				    		审核中
				    	<#elseif data.logStatus =='03'>
				    		已审核
				    	<#elseif data.logStatus =='04'>
				    		退回
				    	</#if>
			    	</td>
				    <td>${data.score}</td>
				    <td>${data.approverName}</td>
			    </#if>
			    <td>
			    <#if data.nowWorkInfo?length gt 6>   
		             ${data.nowWorkInfo[0..6]}.
				<#else> 
					 ${data.nowWorkInfo}
				</#if>      
				</td>
			    <td class="look">
			    	<#if data.isApprove=='Y' && data.logStatus == '02'>
			    		<span><a onclick="workingLog.gotoPage('${base}/workingLog/approveWorkingLog?id=${data.id}')" href="javascript:void(0);">审阅</a></span>
			    	<#else>
			    		<span><a onclick="workingLog.gotoPage('${base}/workingLog/viewWorkingLog?id=${data.id}&time=${data.logTime}')" href="javascript:void(0);">查看</a></span>
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
<!--
<br>
<table border="0"  style="margin-left:500px">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  评分：
 <input type="text" class="btn btn-primary" name="score" value="" />
 <br>
 <br>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
  评语：
 <input type="text" class="btn btn-primary" name="comment" value="" />
 <br> 
 <br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="button" class="btn btn-primary" name="checkall" value="批量审核" />
 </table> -->
<script type="text/javascript">
		
	function allSelect(){
		var bo = document.getElementById("allSelect").checked;
		  $("input:[type=checkbox]").attr("checked",true);
		  if(bo){
			document.getElementById("AllSelect");
		  }else{
		    $("input:[type=checkbox]").attr("checked", false);   
		  }
		}
 
          


    $(function(){

        $(".check_all").click(function(){
            var checked = $(this).get(0).checked;
            $("input[type=checkbox]").attr("checked",checked);
        });

        $("input[name=checkall]").click(function(){

            var check = $("input:checked");
            if(check.length<1){
                alert('请选择要操作的记录!');
                return false;
            }
            if( confirm("确认要审核选择的记录?")){
                var id = new Array();
                check.each(function(i){
                    id += $(this).val()+',';
                });
            var score = $("#approveScore").val();
            var comment = $("#comment").val();
            if(score==""){
                alert('请输入评分!');
                return false;
            }
            if(comment==""){
           		alert('请输入评语!');
                return false;
            }            
			$.ajax({
				url: '${base}/workingLog/submitApproveWorkingLogBatch',
				type: 'POST',
				async: false,
				dataType: "json",
				data: {idArr:id,score:score,comment:comment,logStatus:'03'},
				success: function(data){
					if(data.flag){
						if(logStatus == '03'){
							alert("审核成功");
						} else if(logStatus == '04'){
							alert("退回成功");
						}
						//window.history.back();
						$("#comment").val("");
						$("#approveScore").val("合格");
						workingLog.queryWorkLogList();
					} else {
						alert(data.message);
						return false;
					}
					workingLog.queryMyLogCount();
					workingLog.queryWorkingLogCount();
					workingLog.queryMyCheckLogCount();
				},
				error: function(){
					alert("对不起，您的操作失败，请重新操作！");
					return false;
				}
			});	
            }
        });

    });

</script>
</div>