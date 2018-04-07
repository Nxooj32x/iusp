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
		$("#j-btn-login").bind("click",function(e){
			thisObj.login(e);
		});
	};
	
	this.login = function(event){
		
		var userName = $("#j-input-userName").val();
		var password = $("#j-input-password").val();

		userName = $.trim(userName) == '用户名' ? '' : userName;
		password = $.trim(password) == '密码' ? '' : password;
		
		Assert.trigger(userName,'isEmpty','请输入用户名');
		Assert.trigger(password,'isEmpty','请输入密码');

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

};

var login = new Login();