/**
 * SOUL 字典信息JS库
 *
 */
SureDictionary = {
	baseUrl : '/common/dictionary/',
	dictItemUrl : '/common/dictionaryItem/',

	/**
	 * 获取字典信息
	 * @param domainId 	应用域 如YYT，可以不设置，不设置从配置文件中读取
	 * @param dictKey 	字典key
	 * @param callback	成功回调
	 */
	getInuseDictionary : function(domainId, dictKey, callback) {
		var domain = domainId;

		if (domain == null) {
			//从配置文件中获取字典域
			domain = SureConfig.getAppId();
		}
		
		if (typeof(domain) == 'undefined' || domain == '' || domain == null) {
			SureMsg.msg('提示信息', '未配置字典域, 请联系管理员！');
			return;
		}

		SureAjax.ajax({
			url : this.baseUrl + domain + '/' + dictKey,
			type : 'GET',
			async : true,
			data : {},
			success : function(inuseDict){
				if (callback) callback(inuseDict);
			}
		});
	},

	/**
	 * 获取字典项信息
	 * @param domainId 	应用域 如YYT，可以不设置，不设置从配置文件中读取
	 * @param dictKey 	字典key
	 * @param dictItemKey 	字典项key
	 * @param callback	成功回调
	 */
	getDictionaryItem : function(domainId, dictKey, dictItemKey, callback) {
		var domain = domainId;

		if (domain == null) {
			//从配置文件中获取字典域
			configRepo = SURE.getConfigRepo('baseConfig');
			for (var key in configRepo) {
				var config = configRepo[key];
				domain = config['appId'];
				if (typeof(domain) != 'undefined' && domain != '') {
					break;
				}
			}
		}
		
		if (typeof(domain) == 'undefined' || domain == '' || domain == null) {
			SureMsg.msg('提示信息', '未配置字典域, 请联系管理员！');
			return;
		}

		SureAjax.ajax({
			url : this.dictItemUrl + domain + '/' + dictKey + '/' + dictItemKey,
			type : 'GET',
			async : true,
			data : {},
			success : function(dictItem){
				if (callback) callback(dictItem);
			}
		});
	},
	
	/**
	 * 获取字典
	 * @param domainId 	应用域 如YYT，可以不设置，不设置从配置文件中读取
	 * @param dictKey 	字典key
	 * @param callback	成功回调
	 */
	getDictionary : function(domainId, dictKey, callback) {
		var domain = domainId;

		if (domain == null) {
			//从配置文件中获取字典域
			domain = SureConfig.getAppId();
		}
		
		if (typeof(domain) == 'undefined' || domain == '' || domain == null) {
			SureMsg.msg('提示信息', '未配置字典域, 请联系管理员！');
			return;
		}

		SureAjax.ajax({
			url : '/dictionary/' + domain + '/' + dictKey,
			type : 'GET',
			async : true,
			data : {},
			success : function(dictInfo){
				if (callback) callback(dictInfo);
			}
		});
	},
};