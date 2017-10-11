/**
 * SOUL 站内信JS库
 *
 */
SureLetter = {
	baseurl : '/internal/message/',

	/**
	 * 获取站内信
	 * @param letterID 站内信ID
	 * @param cb 成功回调
	 *
	 */
	getLetter : function(letterId, cb) {
		var url = this.baseurl + letterId;
		SureAjax.ajax({
			url : url,
			type : 'GET',
			async : true,
			data : {},
			success : function(letter){
				if (cb)
					cb(letter);
			},
		});
	},
	
	/**
	 * 发送站内信
	 * @param fromUser 发件人
	 * @param toUser 收件人
	 * @param subject 主题
	 * @param content 正文
	 * @param cb	成功回调
	 */
	sendLetter : function (fromUser, toUser, subject, content, cb) {
		var url = this.baseurl;
		var message = {};
		message["fromUser"] = fromUser;
		message["toUser"] = toUser;
		message["subject"] = subject;
		message["content"] = content;
		
		SureAjax.ajax({
			url : url,
			type : 'POST',
			dataType : "json",
			async : true,
			data : message,
			success : function(){
				if (cb) cb();
			}
		});
	},
	
	/**
	 * 发送站内信
	 * @param fromUser 发件人
	 * @param fromUserName 发件人姓名
	 * @param toUser 收件人
	 * @param toUserName 收件人姓名
	 * @param subject 主题
	 * @param content 正文
	 * @param cb	成功回调
	 */
	sendLetter2 : function (fromUser, fromUserName, toUser, toUserName, subject, content, cb) {
		var url = this.baseurl;
		var message = {};
		message["fromUser"] = fromUser;
		message["fromUserName"] = fromUserName;
		message["toUser"] = toUser;
		message["toUserName"] = toUserName;
		message["subject"] = subject;
		message["content"] = content;
		
		SureAjax.ajax({
			url : url,
			type : 'POST',
			dataType : "json",
			async : true,
			data : message,
			success : function(){
				if (cb) cb();
			}
		});
	},
	
	/**
	 * 发送群发消息
	 * 
	 * @param subject 主题
	 * @param content 内容
	 * @param cb 回调
	 */
	sendBroadcastLetter : function (subject, content, cb) {
		var url = this.baseurl;
		var message = {};
		message["isBroadcast"] = "true";
		message["subject"] = subject;
		message["content"] = content;
		
		SureAjax.ajax({
			url : url,
			type : 'POST',
			async : true,
			data : message,
			success : function(){
				if (cb) cb();
			}
		});
	},

	/**
	 * 发送组发消息
	 * 
	 * @param fromUser 发件人
	 * @param group 组
	 * @param subject 主题
	 * @param content 内容
	 * @param cb 回调
	 */
	sendGroupLetter : function(fromUser, group, subject, content, cb) {
		var url = this.baseurl;
		var message = {};
		message['isGroup'] = "true";
		message['fromUser'] = fromUser;
		message['toUser'] = group;
		message['subject'] = subject;
		message['content'] = content;

		SureAjax.ajax({
			url : url,
			type : 'POST',
			data : message,
			success : function () {
				if (cb) cb();
			}
		});
	},
	
	/**
	 * 发送组发消息
	 * 
	 * @param fromUser 发件人ID
	 * @param fromUserName 发件人姓名
	 * @param group 组
	 * @param groupName 组名
	 * @param subject 主题
	 * @param content 内容
	 * @param cb 回调
	 */
	sendGroupLetter2 : function(fromUser, fromUserName, group, groupName, subject, content, cb) {
		var url = this.baseurl;
		var message = {};
		message['isGroup'] = "true";
		message['fromUser'] = fromUser;
		message['fromUserName'] = fromUserName;
		message['toUser'] = group;
		message['toUserName'] = groupName;
		message['subject'] = subject;
		message['content'] = content;

		SureAjax.ajax({
			url : url,
			type : 'POST',
			data : message,
			success : function () {
				if (cb) cb();
			}
		});
	},
	
	/**
	 * 获取所有发件箱消息
	 * 
	 * @param userId 用户id
	 * @param cb 回调
	 */	
	getAllSendLetter : function (userId, cb) {
		var url = this.baseurl + "?userId=" + userId + "&isSend=true";

		SureAjax.ajax({
			url : url,
			type : 'GET',
			async : true,
			data : {},
			success : function(letter){
				if (cb) cb(letter);
			}
		});
	},
	
	/**
	 * 获取所有收件箱消息
	 * 
	 * @param userId 用户id
	 * @param cb 回调
	 */	
	getAllRecvLetter : function (userId, cb) {
		var url = this.baseurl + "?userId=" + userId + "&isSend=false";

		SureAjax.ajax({
			url : url,
			type : 'GET',
			async : true,
			data : {},
			success : function(letter){
				if (cb) cb(letter);
			}
		});
	},

	/**
	 * 将信件标志为已读
	 * 
	 * @param msgId 信件
	 * @param cb 回调
	 */	
	setReadFlag : function (msgId, cb) {
		var url = this.baseurl+ msgId + "?isRead=true";

		SureAjax.ajax({
			url : url,
			type : 'PUT',
			async : true,
			data : {},
			success : function(letter){
				if (cb) cb(letter);
			}
		});
	},
	
	/**
	 * 将信件标志为未读
	 * 
	 * @param msgId 信件
	 * @param cb 回调
	 */
	unsetReadFlag : function (msgId, cb) {
		var url = this.baseurl+ msgId + "?isRead=false";

		SureAjax.ajax({
			url : url,
			type : 'PUT',
			async : true,
			data : {},
			success : function(letter){
				if (cb) cb(letter);
			}
		});
	},

	/**
	 * 将信件标志为未读
	 * 
	 * @param msgId 信件
	 * @param cb 回调
	 */
	restore : function (msgId, cb) {
		var url = this.baseurl+ msgId + "?isDel=false";

		SureAjax.ajax({
			url : url,
			type : 'PUT',
			async : true,
			data : {},
			success : function(letter){
				if (cb) cb(letter);
			}
		});
	},
	
	/**
	 * 修改信件
	 * 
	 * @param msgId 信件
	 * @param subject 主题
	 * @param content 正文
	 * @param cb 回调
	 * TODO 修改为data提交
	 */
	modifyLetter : function (msgId, subject, content, cb) {
		var url = this.baseurl+ msgId + "?subject=" + subject + "&content=" + content;

		SureAjax.ajax({
			url : url,
			type : 'PUT',
			async : true,
			data : {},
			success : function(letter){
				if (cb) cb(letter);
			}
		});
	},
	
	/**
	 * 删除信件
	 * 
	 * @param msgs 信件id列表
	 * @param recycle true 放入回收站
	 * @param cb 回调
	 */
	delLetter : function (msgs, recycle, cb) {
		var url = this.baseurl + "?isRecycle=" + recycle;

		SureAjax.ajax({
			url : url,
			type : 'DELETE',
			async : true,
			data : msgs,
			success : function(letter){
				if (cb) cb(letter);
			}
		});
	},

	delOneLetter : function (msgId, recycle, cb) {
		var url = this.baseurl +  msgId + "?isRecycle=" + recycle;

		SureAjax.ajax({
			url : url,
			type : 'DELETE',
			async : true,
			data : {},
			success : function(letter){
				if (cb) cb(letter);
			}
		});
	},
	
	/**
	 * 删除所有信件
	 * 
	 * @param msgs 信件id列表
	 * @param recycle true 放入回收站
	 * @param cb 回调
	 */
	delAllLetter : function (userId, recycle, cb) {
		var url = this.baseurl + "?userId=" + userId + "&all=ture" +
					"&isRecycle=" + recycle;

		SureAjax.ajax({
			url : url,
			type : 'DELETE',
			async : true,
			data : {},
			success : function(letter){
				if (cb) cb(letter);
			}
		});
	},

	/**
	 * 获取用户未读邮件个数
	 * 
	 * @param userId 用户ID
	 * @param cb 回调函数
	 *
	 */
	getRecvMailNotRead : function(userId, cb) {
		var url = this.baseurl + "user/" + userId + "/count";
		SureAjax.ajax({
			url : url,
			type : 'GET',
			async : true,
			data : {},
			success : function (count) {
				if (cb) cb(count);
			}
		});
	},

	/**
	 * 获取发送站内信页面
	 *
	 * @param showDiv 显示的div
	 * @param fromUserId 发送者ID
	 * @param toUserId 接收者ID
	 * @param subject 主题
	 * @param content 内容
	 * @param isGroup 是否组发
	 *
	 */
	loadWriteMail : function(showDiv, fromUserId, toUserId, subject, content, isGroup) {
		var url = "/mail/user/" + fromUserId + "/write";
		var param = {};
		param['fromUserId'] = fromUserId;
		if (isGroup == true)
			param['toGroupId'] = toUserId;
		else
			param['toUserId'] = toUserId;
		param['subject'] = subject;
		param['content'] = content;
		
		SureAjax.load(showDiv, {
			url : url,
			data:param
		});
	},
};