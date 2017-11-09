<#import "/common/iusp_macro.ftl" as iusp/>
<@iusp.zTreeSetJsCss />
<@iusp.zTree id='orgTree' url='${base}/user/orgQuery' rootPId=00  isCheck="false" chkStyle="checkbox" radioType="level" isEdit="false"
	async="true"  callback="true" onClick="login.doZTreeOnclick" />
	<div id="light" class="white_content" style="background: #63acd9; ">
	<div style="margin-top:-15px;" align="right"><a href = "javascript:void(0)" onclick ="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'" align="right"><font style="color:white;font-size:15px;">X</font></a></div>
	<div style="margin-top:-20px;"><font style="color:white;font-size:15px;"> <strong>基本信息</strong></font></div>
		<div style="background: #FFF; width: 100%; height: 100%;  font-size:18px;">
			<table border="0">
			<tr><td style="height:40px;float:right;" colspan="2" >&nbsp;&nbsp;</td></tr>
			<tr><td  style="height:35px;float:right; "><span style="padding-left:50px;margin-top:10px;">姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp：</span></td><td><div  style="margin-top:-15px;"><input type="text" id="realName" style="border:0px; font-size:18px;" readonly="true" /></div></td></tr>
			<tr><td style="height:35px;float:right;" >&nbsp;&nbsp;办公电话：</td><td><div  style="margin-top:-15px;"><input type="text" id="officePhone" style="border:0px; font-size:18px;"readonly="true" /></div></td></tr>
			<tr><td style="height:35px;float:right;">&nbsp;&nbsp;手机号码：</td><td><div  style="margin-top:-15px;"><input type="text" id="telephone" style="border:0px; font-size:18px;"readonly="true" /></div></td></tr>
			<tr><td style="height:35px;float:right;">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp： </td><td><div  style="margin-top:-15px;"><input type="text" id="email" style="border:0px; font-size:18px;" readonly="true" /></div></td></tr>
			</table>
		</div>
	</div>
    <div id="fade" class="black_overlay"></div> 