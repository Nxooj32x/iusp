/*
 * Cookie tools
 * Author: Tommy Xu
 * Date: 2014-11-4
 * */
;(function($){
    $.extend($.easing,{
        easeOutBack:function(x,t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });
    $.cookie = $.cookie || {};
    $.cookie = {
        setCookie:function(cName,cValue,hours,path){
            var cookieName = escape(cName);
		    var value = escape(cValue);
		    var expires = new Date();
		    expires.setTime(expires.getTime() + hours*3600000);
		    path = path == "" ? "" : ";path=" + path;
		    _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
		    document.cookie = cookieName + "=" + value + _expires + path;
        },
        getCookieValue:function(cName){
            var cookieName = escape(cName);
		    //读cookie属性，这将返回文档的所有cookie
		    var allcookies = document.cookie;       
		    //查找名为name的cookie的开始位置
		    cookieName += "=";
		    var pos = allcookies.indexOf(cookieName);    
		    //如果找到了具有该名字的cookie，那么提取并使用它的值
		    if (pos != -1){										//如果pos值为-1则说明搜索"version="失败
		        var start = pos + cookieName.length;			//cookie值开始的位置
		        var end = allcookies.indexOf(";",start);		//从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
		        if (end == -1){
		        	 end = allcookies.length;					//如果end值为-1说明cookie列表里只有一个cookie
		        }
		        var value = allcookies.substring(start,end); 	//提取cookie的值
		        return (value); 								//对它解码      
		    } else {
			    return "";                               		//搜索失败，返回空字符串
		    }
        },
        deleteCookie:function(cName,path){
            var cookieName = escape(cName);
	   		var expires = new Date(0);
		    path = path == "" ? "" : ";path=" + path;
		    document.cookie = cookieName + "="+ ";expires=" + expires.toUTCString() + path;
        }
    };
    $.extend($.fn, $.cookie);
})(jQuery);