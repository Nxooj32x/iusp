 <#include "/admin/article/header.ftl"/>
     <div class="rightdiv" >
	  <p class="pdro">最新热点>发布最新热点</p>
    <hr  width="725px;" style="border:1px solid #D8D8D8; margin-left:5px; border-bottom:0px; border-left:0px;" >
<p>&nbsp;</p>
     <div>
         <form id="f1" name="f1" method="post" action="picture.php?method=add&page=1" enctype="multipart/form-data">
             <table class="tab1">
                 <tr class="th1"><th>&nbsp;&nbsp;文件关键词</th><th>文件地址</th><th>显示信息</th><th>超链接</th></tr>
                 <tr>
                     <td>&nbsp;&nbsp;<input  id="name" name="name"></td>
                     <td>		
					     <div class="none">
				           <input type="file" name="_f" id="_f" />
							</div> </td>
                     <td><input id="alt" name="alt"></td>
                     <td><input id="hrf" name="hrf" ></td>
                 </tr>
                 <tr><td colspan="4" align="center"><button onclick="check()"  class="a_demo_one">&nbsp;&nbsp;上&nbsp;传&nbsp;&nbsp;</button></td></tr>
             </table>     
        </form>    
    </div>
</div>
</div>
</div>
<#include "/admin/article/footer.ftl"/>
<script type="text/javascript">

jQuery(function () {
$("._box").click(function () {
return $("#_f").click();
});
}); 

</script>


</body>