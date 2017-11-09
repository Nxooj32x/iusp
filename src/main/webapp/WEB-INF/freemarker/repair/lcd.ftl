<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="description" content="南航金城学院信息户服务平台" />
    <meta name="keywords" content="南航金城学院信息户服务平台" />
    <!-- IE8 兼容 -->
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
	    <link href="${resRoot}/css/base.css"  rel="stylesheet" type="text/css" />
	    <link href="${resRoot}/css/day.css" rel="stylesheet" type="text/css" />
	    <link href="${resRoot}/css/page.css" rel="stylesheet" type="text/css" />
    <title>南航金城学院信息化服务平台 - 工作日志</title>
    <script type="text/javascript" src="${resRoot}/js/jquery/jquery.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/page.js"></script>
    <script type="text/javascript" src="${resRoot}/js/repair/repair.js"></script>
    <script type="text/javascript" language="javascript" src="${resRoot}/js/utils/iuspUtil.js"></script>
    <script language="javascript" type="text/javascript" src="${resRoot}/js/utils/My97DatePicker/WdatePicker.js"></script>
    
    <script type="text/javascript" language="javascript">
			$(function(){
				repair.init('${resRoot}','${base}');
				repair.queryList();   
			});
		</script>
		
</head>
<body>
<#include "/include/header.ftl"/>
<div class="middle" style="width:1000px;margin:0px auto 0px auto;">
	 <img style="vertical-align:middle;"  src="${resRoot}/images/fz.png"/><span style="line-height:50px;font-family:'微软雅黑';font-size:15px;vertical-align:middle;"><a href="${base}/index">&nbsp;首页</a>&nbsp;/&nbsp;<a href="/iusp-web/repair/forward?pageName=allRepair">后勤报修</a>&nbsp;/&nbsp;我的报修&nbsp;</span>
</div>   
<hr width=100% style="border:1px solid #D8D8D8; border-left:0px;border-bottom:0px;margin-bottom:0px;" >  
<div class="colum-wrap clearfix" >
<div style="width:1000px; margin:0px auto 0px auto; font-family:'微软雅黑';">
	<div class="leftdiv"> 
		<#include "/include/repairMenu.ftl"/>
		<input type="hidden" id="module" value="mlcd"/>
    </div>
<div class="rightdiv" >
<table width="760" border="1px" bordercolor="#D8D8D8"  style="float:left; margin-top:10px; margin-left:10px;">
    <tr>
    	<td width="30px;" style="border-left:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">        </td>
    	<td style="border-bottom:hidden;font-size:15px; border-top:1px solid #D8D8D8;border-width:1px; height:30px ; border-left:1px solid #D8D8D8;border-right:1px solid #D8D8D8; ">	
        <a href="">&nbsp;&nbsp;我的报修&nbsp;&nbsp;</a>    	</td>
    	<td width="650px;" style="border-right:hidden;border-top:hidden;border-width:1px; border-bottom:1px solid #D8D8D8;">
	    <div style="margin-left:10px; float:left;line-height:30px;" >
          报修时间：从<input readonly type="text" class="Wdate" id="applayTime_S" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"
                         style="border-color:#D8D8D8; width:100px; height:25px;" />
          至<input readonly type="text" class="Wdate" id="applayTime_E" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd'})"
                         style="border-color:#D8D8D8; width:100px; height:25px;" />    
        </div> 
	
<div style="margin-left:5px; float:left;line-height:30px;" > 
			<input type="text" id="applayContent"style="height：29px;width:100px;" value="键入查询内容"/>      		
</div> 
	<div style="margin-left:5px; float:left;"> 	
                <select name="repairStatus" id="repairStatus" style="height:29px; width:80px;vertical-align:middle;margin-right:5px;">
					<option value="">全部</option>
					<option value="1">申请中</option>
					<option value="2">受理中</option>
					<option value="3">完成</option>
                </select>  
 			<div style=" z-index:20;width:160px;height:90px;border:1px solid #ccc;position:absolute;display:none; background-color:#FFF;" id="seldown" name="seldown">
  			<div style="line-height:30px;CURSOR:HAND;" onClick="changediv(this)" onMouseOver="this.style.background='#ccc'" onMouseOut="this.style.background='#fff'" ></div>
  			<div style="line-height:30px;" onClick="changediv(this)" onMouseOver="this.style.background='#ccc'" onMouseOut="this.style.background='#fff'"></div>
  			<div style="line-height:30px;" onClick="changediv(this)" onMouseOver="this.style.background='#ccc'" onMouseOut="this.style.background='#fff'"></div>
 			</div>
            </div>
	
            <div >
            <input onclick="return search();" value="&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;" type="submit" height="28px;"  style="vertical-align:middle; padding:4px; border:none; background-color:#00a0ef; color:#FFF; height:29px">  
            <input onclick="return reset();" value="&nbsp;&nbsp;重&nbsp;&nbsp;置&nbsp;&nbsp;" type="submit" height="28px;"  style="vertical-align:middle; padding:4px; border:none; background-color:#00a0ef; color:#FFF; height:29px">
            </div>
            </td>
    </tr>
    </table>
    <div style="padding-top:50px;">
        <div id="grid" class="grid"></div> 
    </div>
  </div>
</div>
</div>
</div>
<#include "/include/footer.ftl"/>
<script type="text/javascript">
     function search(){
		repair.queryList();    
     }
</script>
</body>