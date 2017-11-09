 <#include "/admin/article/header.ftl"/>
  <div class="rightdiv" >
     <#if  type ="01">
	  <p class="pdro">当前位置：最新热点</p>
	 </#if>
	 <#if  type ="02">
	  <p class="pdro">当前位置：通知公告</p>
	 </#if>
	 <#if  type ="03">
	  <p class="pdro">当前位置：办事指南</p>
	 </#if>
    <hr  width="745px;" style="border:1px solid #D8D8D8; margin-left:5px; border-bottom:0px; border-left:0px;" >
    <p>&nbsp;</p>
 
<div style="margin-left:10px; margin-top:20px;">
        <form action="" name="f1" id="f1" method="POST">
        
        <table cellpadding="0" cellspacing="0" class="tab1">
            <tr><td colspan="4" align="center" style="height:60px;">          
                    <select name="gold" id="gold" style="width:100px; font-size:15px; font-family:'微软雅黑';border:1px solid #E6E6E6; height:37px; ">
                    	<option selected="true" disabled="true" ><font style="color:#CCC;">查询条件</font></option>
                        <option value="title" >&nbsp;标题</option>
                        <option value="author">&nbsp;作者</option>
                    </select> 
                    <input type="text" name="pvalue" id="pvalue" style="border:1px solid #E6E6E6; height:35px; width:320px;">
                    &nbsp;
                    <input value="&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;" type="button" onclick="search()" class="a_demo_one">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="${base}/admin/article/addArticleForward?type=${type}"  class="a_demo_one">
                    	<span style="color:#FFF;">&nbsp;&nbsp;增&nbsp;&nbsp;加&nbsp;&nbsp;</span>
                    </a>
                   
                </td>
            </tr>
            </table>
     <div id="grid" class="grid"></div> 
     <input type="text" name="type" id="type" style="visibility:hidden" value="${type}">
  </form>
  </div>  
  </div>
</div>
</div>
</div>

 <div id="addArticle" style="display: none"><!-- 增加post方法，可以阻止跳转到Get-->
     <div style=" margin-left:10px; margin-right:50px; font-size:15px; color:#666; display:inline;">
         <span>标题：</span>
         <input  type="text" name="title" id="title" style="border:1px solid #D8D8D8; height:30px; width:400px;" />
     </div>
     <div style=" margin-left:10px; margin-top:10px;">
         <p></p>
         <textarea id="editor" style="width:580px;height:200px;" name="content"></textarea>
         <input  type="text" name="type" id="type"  style="visibility:hidden" value="01"/>
     </div>
 </div>
<#include "/admin/article/footer.ftl"/>
<script type="text/javascript">
   	 $(function(){

      /*   var d = dialog({
             title:"添加",
             fixed: true,
             width:600,
             content: document.querySelector("#addArticle"),
             okValue: '确 定',
             ok: function() {
                 d.close().remove();
             },
         });

         var $preview, editor, mobileToolbar, toolbar;
         Simditor.locale = 'en-US';
         toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'];
         mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];
         editor = new Simditor({
             textarea: $('#editor'),
             placeholder: '这里输入文字...',
             toolbar: toolbar,
             pasteImage: true,
             defaultImage: '${resRoot}/plugin/simditor/images/image.png',
             upload: location.search === '?upload' ? {
                 url: '/upload'
             } : false
         });
*/
//         var ue = UE.getEditor('editor');
//         function createEditor() {
//             enableBtn();
//             UE.getEditor('editor');
//         }
//         function getContent() {
//             return  UE.getEditor('editor').getContent();
//         }
//         d.show();

	   	article.init('${resRoot}','${base}');

	   }
      );
     function search(){
		//Article article = new Article();
		article.queryArticleList();    
     }
</script>

</body>