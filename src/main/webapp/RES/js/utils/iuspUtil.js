/**
 * JS处理工具类
 */
IuspUtil = function(){
	
	var thisObj = this;
	
	/**
	 * 验证是否为空
	 */
	this.isEmpty = function(validateParam) {
		
		var paramVal = jQuery.trim(validateParam);
		
		if(paramVal == "undefined" || paramVal == "" || paramVal.length <= 0) {
			return true;
		}
		return false;
	};
	
	/**
	 * 校验Email
	 */
	this.isEmail = function(email){
		
		if(thisObj.isEmpty(email)){
			return false;
		}
		
		var emailRegex = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
		if(!emailRegex.test(email)){
			return false;
		}
		
		return true;
	};
	
	//用户名
	this.isUserName = function(str){
		if(thisObj.isEmpty(str)){
			return false;
		}
		
		//字母数字下划线，下划线不能在首尾
		var codeRegex = /^(?!_)(?!.*_$)[a-zA-z0-9_]+$/;
		if(!codeRegex.test(str)){
			return false;
		}
		return true;
	};
	
	//字段
	this.isField = function(str){
		
		if(thisObj.isEmpty(str)){
			return false;
		}
		//字母开头，可包含下划线数字
		var codeRegex = /^[a-zA-Z][a-zA-z0-9_]*$/;
		if(!codeRegex.test(str)){
			return false;
		}
		return true;
	};
	
	/**
	 * 校验数字
	 */
	this.isNumeric = function(str){
		var reg = new RegExp("^[0-9]*$");
		return reg.test(str);
    };
	
	//正整数
	this.isInteger = function(str){
		var reg = new RegExp("^[0-9]*[1-9][0-9]*$");
		return reg.test(str);
	};
	/**
	 * 获取字符串长度，空则为0
	 */
	this.getLength = function(validateParam) {
		
		var len = 0;
		var paramVal = jQuery.trim(validateParam);
		
		if(!this.isEmpty(paramVal)){
			len = paramVal.length;
		}
		
		return len;
	};
	
	/**
	 * 获取String（trim和null过滤）
	 */
	this.getStringValue = function(input){
		return thisObj.isEmpty(input) ? "" : jQuery.trim(input);
	};
	
	/**
	 * 格式化Timestamp格式数据在JqGrid中显示为 yyyy-MM-dd HH:mm:ss
	 */
	this.getTimestampFormatter = function(jqGridCellValue,isAllFormat){
		
		var date = new Date(jqGridCellValue);
		
		var month = date.getMonth() + 1;
		if(Number(month) < 10){
			month = "0" + month;
		}
		var day = date.getDate();
		if(Number(day) < 10){
			day = "0" + day;
		}
		
		var year = date.getYear();
		if(year < 1000){
			year = 1900 + date.getYear();
		}
		
		var dateStr = year + "-" + month + "-" + day;
		
		if(isAllFormat){
			var hours = date.getHours();
			if(Number(hours) < 10){
				hours = "0" + hours;
			}
			var minutes = date.getMinutes();
			if(Number(minutes) < 10){
				minutes = "0" + minutes;
			}
			var seconds = date.getSeconds();
			if(Number(seconds) < 10){
				seconds = "0" + seconds;
			}
			dateStr += " " + hours + ":" + minutes + ":" + seconds;
		}
		return dateStr;
	};
	
	/**
	 * 获取文件后缀名
	 */
	this.getFileExt = function(fileName){
		var index=fileName.lastIndexOf(".");
		var len=fileName.length;
		var ext = fileName.substring(index + 1,len);
		return ext;
	};
	
	/**
	 * 时间校验不能大于后者
	 */
	 this.validateDateTimeToNow=function(str)
	 {
	 	var date = new Date();
		//当前日期 '年-月-日'
		var month = date.getMonth()+1;
		var currentDate = date.getFullYear() + '-' + month + '-' + date.getDate();
		if(str=="")
		{
			return false;
		}
		return this.compareTime(str,currentDate);
	 };
	 
	/*
	 * 比较时间大小
	 */
	this.compareTime = function(inputDate,currentDate){
		
		var inputArr = inputDate.split('-');
		var inputTime = new Date(inputArr[0],inputArr[1],inputArr[2]);
		var inputTimes = inputTime.getTime();
		
		var currentArr = currentDate.split('-');
		var currentTime = new Date(currentArr[0],currentArr[1],currentArr[2]);
		var currentTimes = currentTime.getTime();
		
		if(inputTimes <= currentTimes){
			return true;
		}else{
			return false;
		}
	};
	
	this.setValueStyle = function(value, color){
		return "<span style='color:"+color+"'>" + value + "</span>";
	};
	
	this.arrayJoin = function(arr, str){
		var returnStr = "";
		$.each(arr, function(index,entry){
			if(index == arr.length - 1){
				returnStr += entry;
			} else {
				returnStr += entry + str;
			}
		});
		return returnStr;
	};
	
	/**
	 * 全选/取消全选
	 */
	this.checkAll = function(checkAllId, childCheckName){
		if($("#" + checkAllId).attr("checked")){
			$("input[name='"+childCheckName+"']").each(function(){
				$(this).attr("checked", true);
			});
		} else {
			$("input[name='"+childCheckName+"']").each(function(){
				$(this).attr("checked", false);
			});
		}
	};
	
	/**
	 * 设置FORM表单错误信息,需要放置<div class="tip falseTipForm"></div>在页面相应位置
	 */
	this.setFormErrorMessage = function(msg){
		$(".falseTipForm").show();
		$(".falseTipForm").html("<em></em><span>"+msg+"</span>");
		setTimeout("srmpUtil.clearFormErrorMessage()",3000);
	};
	
	this.clearFormErrorMessage = function(){
		$(".falseTipForm").hide();
		$(".falseTipForm").empty();
	};
	
	/**
	 * Ajax load页面
	 */
	this.ajaxLoadPage = function(url, param, showId, callBack){
		$.ajax({
			type : 'post',// ajax提交方式
			url : url,// 提交的url
			data : param,// 参数
			dataType : 'text',// 数据返回的形式，默认为text即文本
			cache : false,
			success : function(msg) {
				$("#"+showId).html(msg);
				if(callBack && (callBack  instanceof Function)){
		            callBack();//回调
		        };
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$("#"+showId).html("<p style='color:red'>服务器内部错误，请联系管理员！</p>");
			}
		});
	};
	
	/**
	 * Ajax post 封装
	 */
	this.ajaxPost = function(url, param, successCallBack, errorCallBack){
		$.ajax({
			type : 'post',// ajax提交方式
			url : url,// 提交的url
			data : param,// 参数
			dataType : 'json',// 数据返回的形式，默认为text即文本
			cache : false,
			success : function(msg) {
				if(successCallBack && (successCallBack  instanceof Function)){
		            successCallBack(msg);//回调
		        };
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(errorCallBack && (errorCallBack  instanceof Function)){
		            errorCallBack(XMLHttpRequest, textStatus, errorThrown);//回调
		        };
			}
		});
	};
	
	/**
	 * 随机数生成
	 */
	this.randomKey = function(n){
		var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	    var key = "";
	    for(var i = 0; i < n ; i++) {
	        var id = Math.ceil(Math.random()*35);
	        key += chars[id];
	    }
	    return key;
	};
	
	//获取元素的纵坐标 
	this.getTop = function(e){ 
		var offset=e.offsetTop; 
		var offparent = e.offsetParent;
		if(offparent!=null) {
			offset+=thisObj.getTop(e.offsetParent);
		}
		return offset; 
	};
	
	//获取元素的横坐标 
	this.getLeft = function(e){ 
		var offset=e.offsetLeft; 
		if(e.offsetParent!=null) offset+=thisObj.getLeft(e.offsetParent); 
		return offset; 
	};
	
	this.openLoadingDialog = function(text) {
		
		if(thisObj.isEmpty(text)){
			text = "正在跳转中...";
		}
		$("body").append("<div id='srmpLoadingDiv' title='提示'>"+text+"</div>");
		
		$("#srmpLoadingDiv").dialog({
			autoOpen: false,
			width: 200,
			height: 80,
			modal: true
		});
		
		$("#srmpLoadingDiv").dialog("open");
		$(":button").attr("disabled", true);
	};
	
	this.closeLoadingDialog = function(){
		$("#srmpLoadingDiv").dialog("close");
		$("#srmpLoadingDiv").dialog("destroy");
		$("#srmpLoadingDiv").remove();
		$(":button").removeAttr("disabled");
	};
	
	//----------------------------权限控制模块JS-----------------------------
	/**
	 * 校验按钮权限是否通过，并且显示标签包含的值
	 */
	this.pageElementFilter20130827009 = function(_context,_funCode){
		$.ajax({
			url: _context + '/auth/pageElementFilter.htm',
			type:'POST',
			data:{funCode: _funCode},
			async:false,
			success:function(data){
				if(data != '' && data == 'true'){
					$("#iop_" + _funCode).show();
				} else {
					$("#iop_" + _funCode).remove();
				}
			}, error:function(data) {
				$("#iop_" + _funCode).remove();
			}
		});
	};
	
	/**
	 * 校验按钮权限是否通过
	 */
	this.isAuthValidatePass =  function(_context,_funCode){
		var flag = false;
		$.ajax({
			url: _context + '/auth/pageElementFilter.htm',
			type:'POST',
			data:{funCode: _funCode},
			async:false,
			success:function(data){
				if(data != '' && data == 'true'){
					flag = true;
				}
			}, error:function(data) {
			}
		});
		return flag;
	};
	
	/**
	 * 校验按钮权限是否通过，并且显示对应的INPUT值
	 */
	this.pageElementFilter2013575698768 = function(_context,_id,_name,_funCode,_value,_type, _onClick, _onBlur, _onFocus, _onMouseOver, _onMouseOut){
		$.ajax({
			url: _context + '/auth/pageElementFilter.htm',
			type:'POST',
			data:{funCode: _funCode},
			async:false,
			success:function(data){
				if(data != '' && data == 'true'){
					eleShow20136786896(_id,_name,_funCode,_value,_type, _onClick, _onBlur, _onFocus, _onMouseOver, _onMouseOut);
				}
			}, error:function(data) {
				alert('页面元素权限控制获取失败');
			}
		});
	};
	this.eleShow20136786896 = function(_id,_name,_funCode,_value,_type, _onClick, _onBlur, _onFocus, _onMouseOver, _onMouseOut){
		var _html = "<input type=\"" +_type + "\" id=\""+_id+"\" name=\""+_name+"\" value=\""+ _value
			+"\" onClick=\"" + _onClick+"\" onBlur=\"" + _onBlur+"\"  onFocus=\""+_onFocus+"\"  onMouseOver=\""+_onMouseOver+"\" onMouseOut=\""+_onMouseOut+"\" />";
		var eleHtml = $(_html);
		$('#' + _id+'_pageEleAuth_span').html(eleHtml);
	};
};

var iuspUtil = new IuspUtil();

$(function(){
	$(".midstick").unbind("click").bind("click", function(){
		var box = $("#detail_tab");
		if(box.is(":hidden")){
	        $(this).removeClass("midon");
	        box.removeClass("hide");
	    }else{
	        $(this).addClass("midon");
	        box.addClass("hide");
	    }
	});
});

// 给数据添加判断元素是否存在于数组中的方法
Array.prototype.S = String.fromCharCode(2);  
Array.prototype.in_array = function(e) {  
    var r = new RegExp(this.S+e+this.S);  
    return (r.test(this.S+this.join(this.S)+this.S));  
}; 
Array.prototype.del=function(index){
   if(isNaN(index)||index>this.length){return false;}
   this.splice(index,1);
};
