/**
 * SOUL 问卷调查JS库
 *
 */
SureQuestion = {
	baseUrl : '/common/questionnaire/',

	/**
	 * 获取发布的问卷调查信息
	 * @param cb	成功回调
	 */
	getReleasedQueAttr : function (cb) {

		SureAjax.ajax({
			url : this.baseUrl + 'released/attr',
			type : 'GET',
			async : false,
			data : {},
			success : function(queInfo){
				if (cb)
					cb(queInfo);
			}
		});
	
	}
};