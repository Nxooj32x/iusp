$.cachedScript("/js/lib/surejs/v1/sureAuth.js");
$.cachedScript("/js/lib/surejs/v1/sureMsg.js");
$.cachedScript("/js/lib/jquery/plugin/jquery.form.js");

SureAjax = {
		
	/**
	 * 初始化请求参数
	 * @param options
	 * 			jquery ajax函数参数
	 * 			loadMask 是否显示loadMask, 默认不显示
	 * 			parseError 是否解析错误，并显示 默认为true
	 * 			checkXSS 	是否检查xss攻击，默认false
	 * 						如果为true，会自动替换<,>,",'进行转码
	 */
	initOptions : function(options){
		options = options || new Object();
		var loadMask = options.loadMask || false;
		var parseError = true;
		
		if (options.hasOwnProperty("parseError")) {
			parseError = options.parseError;
		}
		
		options.checkXSS = options.checkXSS || false; 
		
		var successFunc = options.success;
		
		var errorFunc = options.error;
		
		options.headers = options.headers || {};
		options.headers.Accept = options.headers.Accept || "application/json";
		options.beforeSend = function(request,options) {
        	var auth = SureAuthTool.buildAuthrization(options.url,options.type,options.headers);
        	request.setRequestHeader('Authorization',auth);
        };
        
        if (parseError) {
        	 options.error = function(xhr, b, c){
 	        	SureMsg.hideLoadBar();
 	        	SureMsg.parseResponse(xhr,function(){
 	 	        	if (typeof (errorFunc) == "function")
 	 	        		errorFunc(xhr);
 	        	});

 	        };
        } 
        
        options.success = function(xhr){
        	SureMsg.hideLoadBar();
        	if (options.msg && options.msg.length > 0)
        		SureMsg.msg(options.msg);
        	if (typeof (successFunc) == "function")
        		successFunc(xhr);
        };
        

		if (loadMask)
			SureMsg.showLoadBar(options.msg || "执行中");
		return options;
	        
	},
		
	ajax : function(options){
		options = SureAjax.initOptions(options);
        if (options.checkXSS) {
        	if (options.data) {
        		for (var p in options.data) {
        			if (typeof(options.data[p]) === 'string') {
        				options.data[p] = SureAjax.xsscheck(options.data[p]);
        			}
        		}
        	}
        }
		$.ajax(options);
	},
	
	formSubmit : function(form, options){
		options = SureAjax.initOptions(options);
        if (options.checkXSS) {
       	 	$(form).find('input').each(function(){
            	var val = SureAjax.xsscheck($(this).val());
            	$(this).val(val);
            });
            $(form).find('textarea').each(function(){
            	var val = SureAjax.xsscheck($(this).val());
            	$(this).val(val);
            });
        }
        $(form).ajaxSubmit(options);
	},
	
	xsscheck : function(val) {
	    val = val.toString();
	    val = val.replace(/[<]/g, "&lt;");
	    val = val.replace(/[>]/g, "&gt;");
	    val = val.replace(/%3C/g, "&lt;");
	    val = val.replace(/%3E/g, "&gt;");
	    val = val.replace(/"/g, "&quot;");
	    val = val.replace(/'/g, "&#39;");
	    return val;
	},
	
	load : function(selecter, options){
		var callback = options.callback || function(){};
		var func = function(response){
			var html = response.responseText || response;
			$(selecter).html(html);
			callback();
		};
		options.complete = func;
		options.method = "GET";
		options.headers = options.headers || {};
		options.headers.Accept = options.headers.Accept || "text/html,application/xhtml+xml,application/xml";
		options.loadMask = false;
		SureAjax.ajax(options);
	},
	
	oldAjax : function(url,params,method,accept,dataType,callback,failCallback,isAuth){
		if(url == null){
			return;
		}
		if(params == null){
			params = {};
		}
		if(method == 'POST' || method == 'PUT'){
			params = $.toJSON(params);
		}
		$.ajax({
			url : url,
	        type : method,
	        headers : {
				Accept : accept
			},
			dataType : dataType,
	        data : params,
	        beforeSend: function(request,options) {
	        	if(isAuth != false){
	        		var auth = Authorization.buildAuthrization(options.url,options.type,options.headers);
	        		request.setRequestHeader('Authorization',auth);
	        	}
	        },           
	        success:function(data){
	        	if(callback != null){
	        		callback(data);
	        	}
	        },
	        error : function(response){
	        	RestAjax.dialog.html(response.responseText);
	        	RestAjax.dialog.dialog({
	        		width : 900,
	        		height : 600
	        	});
	        	if(failCallback != null){
	        		failCallback();
	        	}
	        }
	     });
	},
	
	getHtml : function(url,params,callback,failCallback,isAuth){
		this.oldAjax(url,params,'GET','text/html','html',callback,failCallback,isAuth);
	},
};