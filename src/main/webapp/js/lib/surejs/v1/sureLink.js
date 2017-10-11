/**
 * SOUL 友情链接JS库
 *
 */
SureLink = {
	baseUrl : '/common/links/',

	/**
	 * 获取友情链接信息
	 * @param cust_id cust id
	 * @param cb	成功回调
	 */
	getLinksInfo : function (cust_id, cb) {

		SureAjax.ajax({
			url : this.baseUrl + 'user/' + cust_id,
			type : 'GET',
			async : true,
			data : {},
			success : function(linkInfo){
				if (cb)
					cb(linkInfo);
			}
		});
	}
};