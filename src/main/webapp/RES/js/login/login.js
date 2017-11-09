Login = function(){

	var thisObj = this;
	
	this.constant = {
		resContext : "",
		context : ""
	};
	
	this.setOverallVeriable = function(resContext,context){
		thisObj.constant.resContext = resContext;
		thisObj.constant.context = context;
	};
	
	this.init = function(resContext,context,sessionId){
		thisObj.setOverallVeriable(resContext,context,sessionId);
		// 绑定事件
		$("#loginbutton").bind("click",function(e){
			thisObj.login(e);
		});
		
		$("#logoutlink").bind("click",function(){
			thisObj.logout();
		});
		
		$("#userName").bind("focus",function(){
			if(!iuspUtil.isEmpty($(this).val()) && $(this).val() == "用户名"){
				$(this).val("");
			}
		}).bind("blur",function(){
			if(iuspUtil.isEmpty($(this).val())){
				$(this).val("用户名");
			}
		});
		
		$('#pass-w').live('focus',function(){
		    var  text=this.defaultValue;
	        if($(this).val().replace(/(^\s*)|(\s*$)/g,"")==text){
		     $(this).val("");
			 $(this).hide();
			 $('#password').val("").show().focus();
		    }
		});
		
		$('#password').live('blur',function(){
		    var text=this.defaultValue;
			if($(this).val().replace(/(^\s*)|(\s*$)/g,"")==""){
			    $(this).hide();$('#pass-w').val(text).show();
			}
		});

	};
	
	this.login = function(event){
		
		var userName = $("#userName").val();
		var password = $("#password").val();
		
		if(iuspUtil.isEmpty(userName) || $.trim(userName) == '用户名'){
			IuspMsg.tip("提示","请输入用户名");
			return false;
		}
		
		if(iuspUtil.isEmpty(password) || $.trim(password) == '密码'){
			IuspMsg.tip("提示","请输入密码");
			return false;
		}
		IuspAjax.ajax({
			url: thisObj.constant.context + '/base/auth',
			type: 'POST',
			async: false,
			dataType: "json",
			data: {"j_username" : userName,"j_password" : password},
			success: function(data){
				if(data.flag){
					window.location.href=data.hisotry;
				} else {
					IuspMsg.warm(data.message);
				}
			}
		});
	};
	
	this.logout = function(){
		iuspUtil.ajaxLoadPage(thisObj.constant.context + '/indexLogout', "", "loginPanel", function(){
			$("#loginbutton").bind("click",function(){
				thisObj.login();
			});
		});
	};
	
	//点击按钮展示菜单树
	this.doZTreeOnclick = function(event, treeId, treeNode){
		if(treeNode.isParent){
			return false;
		}
   		$.ajax({
			url: thisObj.constant.context + '/user/findTeacher',
			type: 'POST',
			async: false,
			dataType: "json",
			data: {"id" : treeNode.id},
			success: function(data){
				var realName = iuspUtil.isEmpty(data.realName) ? "" : data.realName;
				var officePhone = iuspUtil.isEmpty(data.officePhone) ? "" : data.officePhone;
				var telephone = iuspUtil.isEmpty(data.telephone) ? "" : data.telephone;
				var email = iuspUtil.isEmpty(data.email) ? "" : data.email;
				document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block'
				document.getElementById("realName").value=realName;
				document.getElementById("officePhone").value=officePhone;
				document.getElementById("telephone").value=telephone;
				document.getElementById("email").value=email;
				//alert("姓名：" + realName + "\n办公电话：" + officePhone + "\n手机号码：" + telephone + "\nEmail:" + email);
			},
			error: function(){
				alert("对不起，您的操作失败，请重新操作！");
				return false;
			}
		});	
	};
};

var login = new Login();