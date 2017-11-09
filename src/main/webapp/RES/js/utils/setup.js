// JavaScript Documentset

function setd(){
	var statu=document.getElementById('setday').style.display;	
	if(statu=='none'){
		document.getElementById('inputsetd').value='关闭';
		document.getElementById('inputsetd').style.backgroundColor="#ccc";
		document.getElementById('setday').style.display="block";
	}else{
		document.getElementById('setday').style.display="none";
		document.getElementById('inputsetd').value='设置';
		document.getElementById('inputsetd').style.backgroundColor="#63ACD9";
		
		
	}
}
function setw(){
	var statu=document.getElementById('setweek').style.display;	
	if(statu=='none'){
		document.getElementById('inputsetw').value='关闭';
		document.getElementById('inputsetw').style.backgroundColor="#ccc";
		document.getElementById('setweek').style.display="block";
	}else{
		document.getElementById('setweek').style.display="none";
		document.getElementById('inputsetw').value='设置';
		document.getElementById('inputsetw').style.backgroundColor="#63ACD9";
		
		
	}
}
function setm(){
	var statu=document.getElementById('setmonth').style.display;	
	if(statu=='none'){
		document.getElementById('inputsetm').value='关闭';
		document.getElementById('setmonth').style.display="block";
		document.getElementById('inputsetm').style.backgroundColor="#ccc";
	}else{
		document.getElementById('setmonth').style.display="none";
		document.getElementById('inputsetm').value='设置';
		document.getElementById('inputsetm').style.backgroundColor="#63ACD9";
		
		
	}
	
}
function setrt(){
	
		var statu=document.getElementById('inputsett').value;	
	 	
	if('设置'===statu){
		document.getElementById('inputsett').value='关闭';		
		document.getElementById('inputsett').style.backgroundColor="#ccc";
		document.getElementById('remarkt').style.display="block";
	}else if('关闭'===statu){
		document.getElementById('inputsett').value='设置';
		document.getElementById('inputsett').style.backgroundColor="#63ACD9";
		document.getElementById('remarkt').style.display="none";

		
		
		
	}
	
}
function setrd(){
	
		var statu=document.getElementById('inputsetd').value;	
	 	
	if('设置'===statu){
		document.getElementById('inputsetd').value='关闭';		
		document.getElementById('inputsetd').style.backgroundColor="#ccc";
		document.getElementById('remarkd').style.color="#666";
	}else if('关闭'===statu){
		document.getElementById('inputsetd').value='设置';
		document.getElementById('inputsetd').style.backgroundColor="#63ACD9";
		document.getElementById('remarkd').style.color="#ccc";

		
		
		
	}
	
}
function setrw(){
	
		var statu=document.getElementById('inputsetw').value;	
	 	
	if('设置'===statu){
		document.getElementById('inputsetw').value='关闭';		
		document.getElementById('inputsetw').style.backgroundColor="#ccc";
		document.getElementById('remarkw').style.color="#666";
	}else if('关闭'===statu){
		document.getElementById('inputsetw').value='设置';
		document.getElementById('inputsetw').style.backgroundColor="#63ACD9";
		document.getElementById('remarkw').style.color="#ccc";

		
		
		
	}
	
}
function setrm(){
	
		var statu=document.getElementById('inputsetm').value;	
	 	
	if('设置'===statu){
		document.getElementById('inputsetm').value='关闭';		
		document.getElementById('inputsetm').style.backgroundColor="#ccc";
		document.getElementById('remarkm').style.color="#666";
	}else if('关闭'===statu){
		document.getElementById('inputsetm').value='设置';
		document.getElementById('inputsetm').style.backgroundColor="#63ACD9";
		document.getElementById('remarkm').style.color="#ccc";

		
		
		
	}
	
}