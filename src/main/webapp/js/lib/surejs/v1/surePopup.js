PopupWindow = new Object();
var isPopupInit = false;

/**
 * 在弹出窗口中显示url，url返回大小自定义的完整html窗口
 * @param url 		显示内容url
 * @param params 	请求参数
 * @param callback 	关闭窗口时的回调函数
 * @param loadCb 	页面加载完成的回调函数
 */
PopupWindow.loadWebPage = function(url, params, callback, loadCb) {
	if (isPopupInit == false)
		PopupWindow.init();
	if (PopupWindow.optWin != null && PopupWindow.optWin.is(":visible") == true) {
		PopupWindow.optWin.empty();
		PopupWindow.optWin.toggle(10);
	}
	
	if (PopupWindow.shadeDiv != null && PopupWindow.shadeDiv.is(":visible") == false) {
		PopupWindow.shadeDiv.toggle(500);
	}
	
	if (PopupWindow.window.is(":visible") == false) {
		PopupWindow.window.toggle(500);
	}
	
	PopupWindow.window.load(url, params, loadCb);
	PopupWindow.callback = function(){};
	if (typeof(callback) === "function") {
		PopupWindow.callback = callback;
	}
};

/**
 * 关闭当前显示窗口
 * 	需要在完全打开弹出窗口后调用，完全打开弹出窗需要500ms弹出时间
 */
PopupWindow.closeWindow = function() {
	if (isPopupInit == false)
		PopupWindow.init();
	if (PopupWindow.optWin.is(":visible") == true && PopupWindow.window.is(":visible") == true) {
		PopupWindow.optWin.empty();
		PopupWindow.optWin.toggle(500);

	} else if (PopupWindow.window.is(":visible") == true) {
		if (PopupWindow.shadeDiv.is(":visible") == true)
			PopupWindow.shadeDiv.toggle(500);
		PopupWindow.window.toggle(500);
	} else if (PopupWindow.optWin.is(":visible") == true) {
		if (PopupWindow.shadeDiv.is(":visible") == true)
			PopupWindow.shadeDiv.toggle(500);
		PopupWindow.optWin.empty();
		PopupWindow.optWin.toggle(500);
	}
	if (typeof(PopupWindow.callback) === "function") {
		PopupWindow.callback();
	}
};

/**
 * 在弹出窗口中显示url，url返回弹出窗内容，弹出窗包含标题栏，标题栏由title指定
 * @param url 		显示内容url
 * @param params 	请求参数
 * @param callback 	关闭窗口时的回调函数
 * @param title 	弹出窗标题栏
 */
PopupWindow.showUrl = function(url, params, callback, title){
	$.ajax({
		url : url,
		data : params,
		success : function(xhr){
			PopupWindow.showDiv(xhr, callback, title);
		}
	});
};

/**
 * 在弹出窗口中显示div内容，弹出窗包含标题栏，标题栏由title指定
 * 		关闭弹出窗口后div会被清除
 * @param div 		显示内容
 * @param title 	弹出窗标题栏
 * @param callback 	关闭窗口时的回调函数
 * 
 */
PopupWindow.showDiv = function(div, callback, title, loadCb){
	if (isPopupInit == false)
		PopupWindow.init();
	PopupWindow.callback = function(){};
	if (typeof(callback) === "function") {
		PopupWindow.callback = callback;
	}
	title = title || "";
	PopupWindow.optWin.empty();
	PopupWindow.optWin.append('<h1 class="overtit2">'
	+ '<a href="javascript:PopupWindow.closeWindow()" style="margin-top: 0px"><img src="/img/icons/book_over_close.png"/></a>' + title + '</h1>');
	
	PopupWindow.optWin.append(div);
	if (typeof(loadCb) == "function")
		loadCb();
	if (PopupWindow.shadeDiv.is(":visible") == false) {
		PopupWindow.shadeDiv.toggle(500);
	}
	
	/*if (PopupWindow.window.is(":visible") == true) {
		PopupWindow.window.hide();
	}*/
	
	if (PopupWindow.optWin.is(":visible") == false) {
		letDivCenter(PopupWindow.optWin);
		PopupWindow.optWin.toggle(500);
	}
};

PopupWindow.init = function(){
    if ($("#popupShade").length <= 0) {
	$(document.body).append('<div class="popupShade" id="popupShade" style="display: none"></div>');
    }
    if ($("#popupDiv").length <= 0) {
    	$(document.body).append('<div class="popupDiv" id="popupDiv" style="display:none;"></div>');
    }
    if ($("#popupWindow").length <= 0) {
    	$(document.body).prepend('<div id="popupWindow" class="popupWin" style="display: none; width: 100%; height: 100%;"></div>');
    }
    PopupWindow.window = $("#popupWindow");
    PopupWindow.optWin = $("#popupDiv");
    PopupWindow.shadeDiv = $("#popupShade");
    
    isPopupInit = true;
};

//让指定的DIV始终显示在屏幕正中间  
function letDivCenter(div){   
    var top = ($(window).height() - div.height())/2;   
   // var left = ($(window).width() - div.width())/2;   
    var scrollTop = $(document).scrollTop();   
    var scrollLeft = $(document).scrollLeft();   
    div.css( { position : 'absolute', 'top' : top + scrollTop} );  
}  

$(function(){
    PopupWindow.init();
    PopupWindow.callback = function(){};
});
