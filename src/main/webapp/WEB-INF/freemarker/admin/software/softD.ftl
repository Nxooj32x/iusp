 <#include "/admin/article/header.ftl"/>
  <script type="text/javascript" charset="utf-8" src="${resRoot}/admin/js/software/software.js"> </script>
     <div class="rightdiv" >
	  <p class="pdro">当前位置：软件下载</p>
    <hr  width="745px;" style="border:1px solid #D8D8D8; margin-left:5px; border-bottom:0px; border-left:0px;" >
    <p>&nbsp;</p>
 
<div style="margin-left:10px; margin-top:20px;">
        <form action="" name="f1" id="f1" method="POST">
        <table cellpadding="0" cellspacing="0" class="tab1">
            <tr><td colspan="4" align="center" style="height:60px;">
                     <select name="gold" id="gold" style="width:100px; font-size:15px; font-family:'微软雅黑';border:1px solid #E6E6E6; height:37px; ">
                         <option disabled="true" ><font style="color:#CCC;">查询条件</font></option>
                        <option value="downName" >&nbsp;文件名</option>
                        <option value="uploader">&nbsp;上传者</option>
                    </select>   
                    <input type="text" name="pvalue" id="pvalue" style="border:1px solid #E6E6E6; height:35px;width:320px;">
                    &nbsp;
                    <input value="&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;" type="button" onclick="search()" class="a_demo_one">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a  href="${base}/admin/software/addSoftwareForward?type=14"  class="a_demo_one">
              <span style="color:#FFF;">&nbsp;&nbsp;上&nbsp;&nbsp;传&nbsp;&nbsp;</span></a>
                </td>
            </tr>
       </table>
       <div id="grid" class="grid"></div> 
  </form>
  </div>  
  </div>
</div>
</div>
</div>
<#include "/admin/article/footer.ftl"/>
<script type="text/javascript"><!-- //增加界面需求，修改人：王涛-->
   	 $(function(){
	   software.init('${resRoot}','${base}','${type}');
	   }
      );
     function search(){
		//Article article = new Article();
		software.querySoftwareList();    
     }
</script>
</body>