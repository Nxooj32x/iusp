var scriptsArray = new Array();
$.cachedScript = function(url, options) {
	// 循环script标记数组
	for ( var s in scriptsArray) {
		// console.log(scriptsArray[s]);
		// 如果某个数组已经下载到了本地
		if (scriptsArray[s] == url) {
			return { // 则返回一个对象字面量，其中的done之所以叫做done是为了与下面$.ajax中的done相对应
				done : function(method) {
					if (typeof method == 'function') { // 如果传入参数为一个方法
						method();
					}
				}
			};
		}
	}
	
	var oldCache = $.ajaxSetup().cache;
	$.ajaxSetup({cache:true});	
	// 这里是jquery官方提供类似getScript实现的方法，也就是说getScript其实也就是对ajax方法的一个拓展
	options = $.extend(options || {}, {
		dataType : "script",
		url : url,
		async : false,
		cache : true
	// 其实现在这缓存加与不加没多大区别
	});
	scriptsArray.push(url); // 将url地址放入script标记数组中
	var ret = $.ajax(options);
	$.ajaxSetup({cache:oldCache});
	return ret;
};

/**
 * 加载css样式
 * 
 * @param style
 *            样式的地址
 * @param stamp
 *            样式的时间戳
 * @param callback
 *            成功之后的处理函数
 */
$.loadStyle = function(style, stamp, callback) {
	var stamp = stamp || (new Date() - 0);
	if (!window.__STYLES) {
		window.__STYLES = [];
	}
	if ($.inArray(style, window.__STYLES) == -1) {
		var obj = document.createElement("link");
		$('<link rel="stylesheet" href="' + style + "?t=" + stamp
				+ '" type="text/css"/>');
		obj.setAttribute("rel", "stylesheet");
		obj.setAttribute("href", style + "?t=" + stamp);
		obj.setAttribute("type", "text/css");
		$(obj).bind('load', function() {
			window.__STYLES.push(style);
			if (callback instanceof Function) {
				callback();
			}
		});
		$('head').get(0).appendChild(obj);
	} else {
		if (callback instanceof Function) {
			callback();
		}
	}
};

String.format = function(src) {
	if (arguments.length == 0)
		return null;
	var args = Array.prototype.slice.call(arguments, 1);
	return src.replace(/\{(\d+)\}/g, function(m, i) {
		return args[i];
	});
};

function dateFormat(date, format) {
	
	format = format || "yyyy-MM-dd";

    /*
    * eg:format="YYYY-MM-dd hh:mm:ss";
    */
    var o = {
        "M+": date.getMonth() + 1,  //month
        "d+": date.getDate(),     //day
        "h+": date.getHours(),    //hour
        "m+": date.getMinutes(),  //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
        "S": date.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

(function($) {
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}
})(jQuery);