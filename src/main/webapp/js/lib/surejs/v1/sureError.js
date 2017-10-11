$.cachedScript("/locale/zh_CN/error.js");
$.cachedScript("/locale/zh_CN/locale.js");

SureError = {
		
	 UNKNOWNERRNO : 65535,
	 
	/**
	 * 通过错误编码返回错误信息
	 * @param errorNum	错误编码
	 * @returns
	 */
	parseError : function (errorNum){
		if(ERROR_INFO[errorNum])
			return LABEL.errorNum+':'+errorNum+'!<br>'+LABEL.errorDesc+'<span style="color:red;">'+ERROR_INFO[errorNum] + '</span>';
		else{
			if(errorNum == 0)
				return LABEL.task_complete;
			else {
				return '<span style="color:red;">' + errorNum + '</span>';
			}
		}
		
	}, 
	
	/**
	 * 解析错误信息
	 * @param error
	 * @returns {String}
	 */
	parseErrorMsg : function (error){
		var errorNum = SureError.UNKNOWNERRNO, 
			errorDesc = LABEL.unknownError;
		
		if (error.hasOwnProperty('errorNum'))
			errorNum = error.errorNum;

		var args = '';
		if (error.hasOwnProperty('errorArgs') && error.errorArgs instanceof Array && error.errorArgs.length > 0) {
			args = "String.format(ERROR_INFO[" + errorNum + "],";
			for(var i = 0 ; i < error.errorArgs.length; i++) {
				if(i == (error.errorArgs.length - 1))
					args += 'error.errorArgs[' + i + ']';
				else
					args += 'error.errorArgs[' + i + '],';
			}
			args +=")";
		} else if (errorNum != SureError.UNKNOWNERRNO){
			args = 'ERROR_INFO[' + errorNum + ']';
		}
		if (args.length > 0 ) {
			try{
				errorDesc = eval(args);
				if (!errorDesc)
					errorDesc = error.errorMsg;
			}catch(e){
				if (error.hasOwnProperty('errorMsg'))
					errorDesc = error.errorMsg;
			}
		} else if (args.length == 0 && error.hasOwnProperty('errorMsg')) {
			errorDesc = error.errorMsg;
		}
		return LABEL.errorNum + ':' + errorNum + '!<br>' + LABEL.errorDesc + ':<span style="color:red;">' + errorDesc + '</span>';
	},
	
	/*
	 *通过传入的错误号，返回系统状态信息！
	 *
	*/
	parseSysStatus : function (sysStatus){
		if(ERROR_INFO[sysStatus.errorNum])
			return sysStatus.devName+":"+ERROR_INFO[sysStatus.errorNum];
		else{
			return sysStatus.devName+":"+sysStatus.errorNum;
		}
	}
};
