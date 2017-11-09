/*
 * JS页面分页操作
 * Author: xukun
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
    $.page = $.page || {};
    $.page = {
    	//ajax调用controller取数据
        loadData : function(url, pageNumber, inputparam, parentid, pageSize,callBack){
   
            if(!pageNumber){
				pageNumber=1;
			}
			if(!parentid){
				parentid="grid";
			}
			if(!inputparam){
				inputparam={};
			}
			var param=$.extend({},{'pageNumber':pageNumber,'pageSize':pageSize},inputparam);
			if(!pageSize){
				pageSize=10;
			}else{
				if(inputparam.pageSize!=pageSize){
					pageNumber=1;
				}
				param=$.extend({},inputparam,{'pageNumber':pageNumber,'pageSize':pageSize});
			}
			//{'pageNumber':1,'pageSize':20,'name':'0','id':'0'}
			
			
			// var overallHtml = "<div class='ui-model-overlay' style='width:"+$("#"+parentid).width()+"px;height:"+$("#"+parentid).height()+"px'></div><div class='ui-model-hint'>正在加载...</div>";
			$("#"+parentid).empty().append("<span style='margin-left:10px;font-size:12px'>正在加载数据...</span>");
			
			$.ajax({
				type : 'post',// ajax提交方式
				url : url,// 提交的url
				data : param,// 参数
				dataType : 'text',// 数据返回的形式，默认为text即文本
				cache : false,
				success : function(msg) {
					$("#"+parentid).empty().append(msg);
					if(callBack && (callBack instanceof Function)){
			            callBack();//回调
			        };
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert('服务器内部错误，请联系管理员！');
				}
			});
			return false;
        },
        //确定按钮点击事件
        okClick : function(o,url,inputparam,parentid,totalPage,currentPage,pageSize){
			var pageNumber=$(o).siblings('input[type=text]').val();
				//输入数字无效或大于最大页数，或小于0
			if(!/^[1-9]+\d*$/.test(pageNumber)||pageNumber>totalPage){
				alert('请输入有效数字！');
				o.focus();
				return false;
			}
			//等于当前页
			if(currentPage==pageNumber){
				return false;
			}
			$.page.loadData(url,pageNumber,inputparam,parentid,pageSize);
			return false;
		},
        //指定页面的文本框的回车事件
		clickSubmit : function(obj,url,inputparam,parentid,totalPage,currentPage,pageSize){
		   	var pageNumber=$(obj).val();
		    if(!/^[1-9]+\d*$/.test(pageNumber)||pageNumber>totalPage){
				alert('请输入有效数字！');
				o.focus();
				return false;
			}
			//等于当前页
			if(currentPage==pageNumber){
				return false;
			}
			$.page.loadData(url,pageNumber,inputparam,parentid,pageSize);
		}
    };
    $.extend($.fn, $.page);
})(jQuery);