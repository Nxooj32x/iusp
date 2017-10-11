$.cachedScript("/js/lib/jquery/plugin/jquery.migrate.min.js");
$.cachedScript("/js/lib/jquery/plugin/jquery.BlockUI.min.js");
$.cachedScript("/js/lib/jquery/plugin/jquery.artDialog.js");
$.loadStyle("/js/lib/jquery/plugin/artDialog/skins/black.css", "1");
$.loadStyle("/css/sure.css", "1");
$.cachedScript("/js/lib/surejs/v1/sureError.js");

SureMsg = {
		
	showPopupWin : function(url){
		art.dialog.open(url);
	},
	
	hidePopupWin : function(){
		$.unblockUI();
	},
		
	showLoadingImg : function(){
		if ($('#index_loadingimg').length <= 0) {
			$(document.body).prepend('<div id="index_loadingimg" class="loadingimg" style="display: none;"><img src="/img/loading5.gif" /></div>');
		}
		if ($('#index_loadinglayer').length <= 0) {
			$(document.body).prepend('<div id="index_loadinglayer" class="loadinglayer" style="display: none;"></div>');
		}
		$("#index_loadingimg").show();
		$("#index_loadinglayer").show();
	},
	
	hideLoadingImg : function (){
		if ($('#index_loadingimg').length > 0){
			$("#index_loadingimg").hide();
		}
		if ($('#index_loadinglayer').length >0) {
			$("#index_loadinglayer").hide();
		}
	},

		
	showLoadBar : function(msg){
		SureMsg.showLoadingImg();
		/*$.blockUI({ 
			message: '<h3><img src="/img/busy.gif" /> ' + msg + '...</h3>',
			css: { width: '150'}
		});*/
	},
	
	hideLoadBar : function(){
		//$.unblockUI();
		
		SureMsg.hideLoadingImg();
	},

	msg : function(title, message, timeout, onClose) {
		$.growlUI(title, message, timeout, onClose);
	},

	/**
	 * 
	 * @param msg
	 *            显示提示信息
	 * @param ok
	 *            返程后回调函数
	 * @param can
	 *            自动关闭时间或者是点击cancel的回调函数
	 */
	confirm : function(msg, ok, can) {
		art.dialog({
		    content: msg,
		    path : "/js/lib/jquery/artDialog",
		    icon : 'question',
		    lock : true,
		    ok: ok,
		    cancelVal: '取消',
		    cancel: can //为true等价于function(){}
		});
	},

	/**
	 * 
	 * @param msg 要提示的消息
	 * @param callbackFn 点击确认后的回调函数
	 */
	alert : function(msg, callbackFn) {
		art.dialog({
		    content: msg,
		    path : "/js/lib/jquery/artDialog",
		    icon : 'face-smile',
		    lock : true,
		    ok: callbackFn
		});
	},

	info : function(title, msg, callbackFn) {
		art.dialog({
			title : title || "",
			content : msg,
			lock : true,
			path : "/js/lib/jquery/artDialog",
			icon : 'succeed',
			ok : function() {
				if (callbackFn instanceof Function) {
					callbackFn();
				}
			}
		});
	},

	showErrorInfo : function(title, msg, callbackFn) {
		art.dialog({
			title : title,
			content : msg,
			lock : true,
			path : "/js/lib/jquery/artDialog",
			icon : 'error',
			ok : function() {
				if (callbackFn instanceof Function) {
					callbackFn();
				}
			}
		});
	},

	showNormalInfo : function(title, msg, callbackFn) {
		var args = "String.format(msg,";
		for ( var i = 2; i < arguments.length; i++) {
			if (i == arguments.length - 1)
				args += 'arguments[' + i + ']';
			else
				args += 'arguments[' + i + '],';
		}
		args += ")";
		var showStr = '';
		try {
			showStr = eval(args);
		} catch (error) {
			showStr = msg;
		}
		art.dialog({
			title : title,
			content : showStr,
			lock : true,
			path : "/js/lib/jquery/artDialog",
			icon : 'face-smile',
			ok : function() {
				if (callbackFn instanceof Function) {
					callbackFn();
				}
			}
		});
	},

	parseResponse : function(response, callbackFn) {
		var me = this,errorJson = null;
		var errorMsg = response.responseText;
		if (response.hasOwnProperty("responseJSON")){
			errorJson = response.responseJSON;
		}else{
			try{
				errorJson = eval("(" + errorMsg + ")");
			}catch(error){
				if(window.console){
					console.log(error);
				}
			}
		}
		if (errorJson != null) {
			me.showErrorInfo("错误", SureError.parseErrorMsg(errorJson), callbackFn);
		} else if (errorMsg.length > 0) {
			me.showErrorInfo("错误", errorMsg, callbackFn);
		} else if (errorMsg.length == 0) {
			me.showErrorInfo(response.status, response.statusText, callbackFn);
		}
	},
	showWarningInfo : function(msg, ok, can) {
		art.dialog({
		    content: msg,
		    path : "/js/lib/jquery/artDialog",
		    icon : 'warning',
		    lock : true,
		    ok: ok,
		    cancelVal: '取消',
		    cancel: can //为true等价于function(){}
		});
	}

};
