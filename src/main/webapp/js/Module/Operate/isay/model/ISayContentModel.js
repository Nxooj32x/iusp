Ext.define('Module.Operate.isay.model.ISayContentModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'userId',
		mapping : 'userId'
	},{
		name : 'userName',
		mapping : 'userName'
	},{
		name : 'isayId',
		mapping : 'isayId'
	},{
		name : 'isayTopicId',
		mapping : 'isayTopicId'
	},{
		name : 'content',
		mapping : 'content'
	},{
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'etime',
		mapping : 'etime'
	}]
});


