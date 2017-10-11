/**
 * SOUL 地区信息JS库
 *
 */
SureArea = {
	baseUrl : '/common/area/',

	/**
	 * area id的最大长度
	 */
	maxAreaIdLen : 12,

	/**
	 * 获取下属地区信息
	 * @param domainId 	应用域 可不设置
	 * @param areaId 	地区ID
	 * @param callback	成功回调
	 */
	getSubAreaInfo : function(domainId, areaId, callback) {
		var domain = domainId;

		if (areaId.length > this.maxAreaIdLen) {
			SureMsg.msg('提示信息', '该地区的下属地区未找到！');
			return;
		}

		if (domain == null) {
			//从配置文件中获取字典域
			domain = SureConfig.getAppId();
		}
		
		if (typeof(domain) == 'undefined' || domain == '' || domain == null) {
			SureMsg.msg('提示信息', '未配置字典域, 请联系管理员！');
			return;
		}

		SureAjax.ajax({
			url : this.baseUrl + domain + '/' + areaId,
			type : 'GET',
			async : true,
			data : {},
			success : function(areaInfo){
				if (callback) callback(areaInfo);
			}
		});
	}
};