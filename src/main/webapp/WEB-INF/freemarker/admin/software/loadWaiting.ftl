 <#include "/admin/article/header.ftl"/>
 <script type="text/javascript" charset="utf-8" src="${resRoot}/admin/js/software/software.js"> </script>
 
     <div class="rightdiv" >
	  <p class="pdro">最新热点>发布最新热点</p>
    <hr  width="725px;" style="border:1px solid #D8D8D8; margin-left:5px; border-bottom:0px; border-left:0px;" >
<p>&nbsp;</p>
     <div>
   		 <form name=loading>
			<p align=center>
				<font color="#0066ff" size="2" face="Arial">正在上传，请稍等...</font>
				<input type=text name=chart size=46
					style="font-family: Arial; font-weight: bolder; color: #0066ff; background-color: #fef4d9; padding: 0px; border-style: none;">
			<br>
				<input type=text name=percent size=47
					style="color: #0066ff; text-align: center; border-width: medium; border-style: none;">
			<script>
			var bar = 0
			var line = "||"
			var amount = "||"
			count()
			function count() {
			bar = bar + 2
			amount = amount + line
			document.loading.chart.value = amount
			document.loading.percent.value = bar + "%"
			if (bar < 99) {
				setTimeout("count()", 100);
			} else {
				alert("${msg}");
			window.location.href = "searchSoftwareForward?type=04";
			}
		}
		</script>
	</p>
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