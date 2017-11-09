<#assign zTree_version ="3.5"/>
<#macro zTreeSetJsCss ><#--zTree js & css setup -->
<link href="${resRoot}/js/jquery/zTree/3.5/css/zTreeStyle.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${resRoot}/js/jquery/zTree/3.5/js/jquery.ztree.all-3.5.min.js"></script>
</#macro>

<#macro zTree id url  rootPId=1  isCheck="false" chkStyle="checkbox" radioType="level" isEdit="false"  async="false" callback="true" onClick="zTreeOnClick" > 
 <script>
 <!--
 <#if async == "false">
 var zNodes;
$.ajax({
    url: "${url}",
    dataType: 'json',
    async: false,
	cache: false,
    success: function(data){
        zNodes = data;
    }
});
</#if>
var setting = {
<#if callback == "true">
callback: {
		onClick: ${onClick}
			},
</#if>
<#if async == "true">
async: {
				enable: true,
				url:"${url}",
				dataType: "json",
				autoParam:["id"],
				type:"post"
			},
</#if>
		edit:{
			enable : ${isEdit}
		},
		check:{
		    enable : ${isCheck},
		    chkStyle : "${chkStyle}",
		    radioType : "${radioType}"
		},	
      data:{
        simpleData: {
            enable: true,
            idKey: "id",
			pIdKey: "pId",
            rootPId: ${rootPId}
        }
    },
    view: {   
        fontCss: getFont,   
        nameIsHTML: true  
    }   

}
function getFont(treeId, node) {   
    return node.font ? node.font : {};   
}  
$(document).ready(function(){
    $.fn.zTree.init($("#${id}"), setting<#if async == "false">,zNodes</#if>);
});
//-->
</script>
<ul id="${id}" class="ztree"></ul>
</#macro>