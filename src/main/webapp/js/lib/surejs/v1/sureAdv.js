/**
 * SOUL 广告库
 */
SureAdv = {
	baseUrl : "/common/adv_site/",
	defaultSiteId : '00000000',
	
	/**
	 * 获取广告位信息
	 * @param siteId 广告位id
	 * @param cb	成功回调
	 */
	getAdvSiteInfo : function (siteId, cb) {
		SureAjax.ajax({
			url : SureAdv.baseUrl + siteId + '/info',
			type : 'GET',
			data : {},
			success:cb,
		});
	},
	
	/**
	 * 获取广告的HTML信息
	 * @param siteId 广告位ID
	 * @param cb     成功回调
	 * @param showDiv    显示图片的div
	 * @returns
	 */
	getAdvInHTML : function (siteId, cb, showDiv) {
		var changeAdvToHTML = function (adv) {
			$(showDiv).append("<img id=" + siteId + " src =" + adv.adv_list[0].adv_content +
					" height=" + adv.site_width +" width=" + adv.site_height + " >");
		};
	
		SureAjax.ajax({
			url : SureAdv.baseUrl + siteId + '/info',
			type : 'GET',
			data : {},
			success:function(advInfo) {
				changeAdvToHTML(advInfo);
				if(cb) cb(advInfo);
			},
		});
	},
	
	/**
	 * 获取默认广告信息，用于没有广告的时候显示
	 * 默认广告位id为00000000
	 * @param cb 成功回调
	 * @returns
	 */
	getDefaultAdv : function (cb) {
		SureAjax.ajax({
			url : SureAdv.baseUrl + SureAdv.defaultSiteId + '/info',
			type : 'GET',
			data : {},
			success: cb,
		});
	},	
};
