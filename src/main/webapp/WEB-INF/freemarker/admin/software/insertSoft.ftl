 <#include "/admin/article/header.ftl"/>
 <script type="text/javascript" charset="utf-8" src="${resRoot}/admin/js/software/software.js"> </script>
 
     <div class="rightdiv" >
	  <p class="pdro">最新热点>发布最新热点</p>
    <hr  width="725px;" style="border:1px solid #D8D8D8; margin-left:5px; border-bottom:0px; border-left:0px;" >
<p>&nbsp;</p>
     <div>
   		 <form id="f1" name="f1" method="post"  enctype="multipart/form-data" ><!-- onsubmit="return checkInfor()" -->
             <table class="tab1">
                 <tr class="th1"><th>&nbsp;&nbsp;文件关键词</th><th>文件地址</th><th>显示信息</th><th>超链接</th></tr>
                 <tr>
                     <td>&nbsp;&nbsp;<input  id="downName" name="downName"></td>
                     <td>		
					     <div class="none">
				           <input type="file" name="file" id="file" />
							</div> </td>
                     <td><input id="descinfo" name="descinfo"></td>
                     <td><input id="hrf" name="hrf"  style="visibility:hidden"></td>
                 </tr>
               <tr><td colspan="4" align="center"><button onclick="checkInfor()"  class="a_demo_one">&nbsp;&nbsp;上&nbsp;传&nbsp;&nbsp;</button></td></tr>
             </table>     
        </form>
    </div>
</div>
</div>
</div>
<#include "/admin/article/footer.ftl"/>
<script type="text/javascript">

	function checkInfor()
	{
	var downName = document.getElementById("downName").value;
	var file = document.getElementById("file").value;
	var descinfo = document.getElementById("descinfo").value;
	if(downName == "")
	{
		window.alert ('文件关键词必须填写!');
		document.f1.downName.focus();;
		return false;
	}else if(file == "")
	{
		window.alert ('请上传文件!');
		document.f1.file.focus();;
		return false;
	}else if(descinfo == "")
	{
		window.alert ('显示信息必须填写!');
		document.f1.descinfo.focus();;
		return false;
	}else{
		 document.f1.action="${base}/admin/software/upload";
		 document.f1.submit();
	}
	}
	
	jQuery(function () {
		$("._box").click(function () {
		return $("#_f").click();
		});
	}); 

</script>


</body>

