Ext.define('Module.YB.message.model.MessageModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'toUserId',
		mapping : 'toUserId'
	},{
		name : 'toUserName',
		mapping : 'toUserName'
	},{
		name : 'createTime',
		mapping : 'createTime'
	},{
		name : 'content',
		mapping : 'content'
	},{
		name : 'subject',
		mapping : 'subject'
	},{
		name : 'app',
		mapping : 'app'
	},{
		name : 'type',
		mapping : 'type'
	}]
});