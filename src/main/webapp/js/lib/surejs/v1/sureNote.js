/**
 * SOUL 通知NOTE JS库
 *
 */
SureNote = {
	baseurl : '/notify/',
	
	/**
	 * 忽略单个通知
	 * @param userId 用户id
	 * @param noteId 通知id
	 * @param cb 成功回调
	 */
	ignoreOne : function(userId, noteId, cb) {
		var url = this.baseurl +  userId + "/" + noteId;
		SureAjax.ajax({
			url : url,
			type : 'DELETE',
			async : true,
			data : {},
			success : function(){
				if (cb) cb();
			},
		});
	},
	
	/**
	 * 忽略用户全部通知
	 * @param userId 用户id
	 * @param cb 成功回调
	 */
	ignoreAll : function (userId, cb) {
		var url = this.baseurl + userId;
		SureAjax.ajax({
			url : url,
			type : 'DELETE',
			async : true,
			data : {},
			success : function(){
				if (cb) cb();
			},
		});
	},
	
	/**
	 * 获取单个通知
	 * @param userId 用户id
	 * @param cb 成功回调
	 */
	getNote : function (userId, cb) {
		var url = this.baseurl + userId;
		SureAjax.ajax({
			url : url,
			type : 'GET',
			async : true,
			data : {},
			success : function(notes){
				if (cb) cb(notes);
			},
		});
	},
};