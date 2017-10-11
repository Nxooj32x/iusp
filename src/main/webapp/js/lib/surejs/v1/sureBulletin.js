/**
 * SOUL 公告JS库
 *
 */
SureBulletin = {
	baseUrl : '/common/bulletin/',

	/**
	 * 获取公告信息
	 * @param cb	成功回调
	 */
	getBulletinInfo : function (cb) {

		SureAjax.ajax({
			url : this.baseUrl + 'latest',
			type : 'GET',
			async : true,
			data : {},
			success : function(bInfo){
				if (cb)
					cb(bInfo);
			}
		});
	}
};