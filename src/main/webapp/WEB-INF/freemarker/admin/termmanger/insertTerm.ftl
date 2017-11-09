 <#include "/admin/article/header.ftl"/>
 <script type="text/javascript" charset="utf-8" src="${resRoot}/admin/js/software/software.js"> </script>
 <script type="text/javascript" charset="utf-8" src="${resRoot}/admin/js/ajaxfileupload.js"> </script>
  <style>  
        .loading-indicator {  
            font-size:8pt;   
            background-image:url(../images/loading/loading.gif);  
            background-repeat: no-repeat;    
            background-position:top left;   
            padding-left:20px;  
            height:18px;  
            text-align:left;  
        }  
        #loading{  
            position:absolute;  
            left:45%;  
            top:40%;  
            border:3px solid #B2D0F7;  
            background:white url(../images/loading/block-bg.gif) repeat-x;  
            padding:10px;  
            font:bold 14px verdana,tahoma,helvetica;   
            color:#003366;  
            width:180px;  
            text-align:center;  
        }  
    </style> 
 <script type="text/javascript" charset="utf-8" src="${resRoot}/admin/js/ajaxfileupload.js"> </script>
 <script language="javascript" type="text/javascript" src="${resRoot}/js/utils/My97DatePicker/WdatePicker.js"></script>
 
  <style>  
        .loading-indicator {  
            font-size:8pt;   
            background-image:url(../images/loading/loading.gif);  
            background-repeat: no-repeat;    
            background-position:top left;   
            padding-left:20px;  
            height:18px;  
            text-align:left;  
        }  
        #loading{  
            position:absolute;  
            left:45%;  
            top:40%;  
            border:3px solid #B2D0F7;  
            background:white url(../images/loading/block-bg.gif) repeat-x;  
            padding:10px;  
            font:bold 14px verdana,tahoma,helvetica;   
            color:#003366;  
            width:180px;  
            text-align:center;  
        }  
    </style>  

	</head>

	<body>
	<div class="rightdiv" >
		  <p class="pdro">当前位置：学期设置</p>
    <hr  width="745px;" style="border:1px solid #D8D8D8; margin-left:5px; border-bottom:0px; border-left:0px;" >
    <p>&nbsp;</p>

		 <table class="tab1">
                 <tr class="th1"><th>&nbsp;&nbsp;学年</th><th>学期</th><th>开学时间</th><th>放假时间</th></tr>
                 <tr>
                     <td>&nbsp;&nbsp;<input  id="schoolYear" name="schoolYear"  class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy'})"></td>
                     <td>&nbsp;&nbsp;
                     	<select id="schoolTerm" name="schoolTerm" style="width:120px; height:22px; border:1px solid #ccc;">
                     	  <option value="1">第一学期</option>
                     	  <option value="2">第二学期</option>
                     	</select>
                     <td>&nbsp;&nbsp;<input  id="schoolOpeanDate" name="schoolOpeanDate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" type="text" style="border-color:#D8D8D8;"></td>
                     <td>&nbsp;&nbsp;<input  id="schoolCloseDate" name="schoolCloseDate" class="Wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"  type="text" style="border-color:#D8D8D8;"></td>
                 </tr>
                 <tr><td colspan="4" align="center"><button onclick="return save();"  class="a_demo_one">&nbsp;&nbsp;添&nbsp;加&nbsp;&nbsp;</button></td></tr>
          </table> 
          </div>   
	</body>
<script type="text/javascript">
   
     function  save(){
    	var schoolYear = $('#schoolYear').val();
    	var schoolTerm = $('#schoolTerm').val();
    	var schoolOpeanDate = $('#schoolOpeanDate').val();
    	var schoolCloseDate = $('#schoolCloseDate').val();
     	if(schoolYear==""){ 
         	 alert('请填写学年！');
         	 return false;
         }
     	if(schoolTerm==""){ 
       	   alert('请填写学期！');
       	   return false;
         }
      	if(schoolOpeanDate==""){ 
       	   alert('请填写开学时间！');
       	   return false;
         } 
      	if(schoolCloseDate==""){ 
       	   alert('请填写放假时间！');
       	   return false;
         }

         if(schoolOpeanDate>schoolCloseDate) {
         alert("放假时间比开学时间小，请输入正确的开学和放假时间");
         return false;
         }  
		$.ajax({
			url: '${base}/admin/term/addSchoolTerm',
			type: 'POST',
			async: false,
			dataType: "json",
			data: {"schoolNian" : schoolYear,"schoolTerm":schoolTerm,"schoolOpeanDate":schoolOpeanDate,"schoolCloseDate":schoolCloseDate},
			success: function(data){
				if(data.flag){
					alert(data.message);
				} else {
					alert(data.message);
					return false;
				}
			},
			error: function(){
				alert("对不起，您的操作失败，请重新操作！");
				return false;
			}
		});	
     }
 
</script>

</body>