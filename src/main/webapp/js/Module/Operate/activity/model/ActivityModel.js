Ext.define('Module.Operate.activity.model.ActivityModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'banner',
		mapping : 'banner'
	},{
		name : 'code',
		mapping : 'code'
	},{
		name : 'describe',
		mapping : 'describtion'
	},{
		name : 'state',
		mapping : 'state'
	},{
		name : 'beginTime',
		mapping : 'beginTime'
	},{
		name : 'endTime',
		mapping : 'endTime'
	},{
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'userName',
		mapping : 'userName'
	},{
		name : 'browseNub',
		mapping : 'browseNub'
	},{	name : 'joinNub',
		mapping : 'joinNub'
	},{
		name : 'link',
		mapping : 'link'
	}]
});

Module.Operate.activity.model.ActivityModel.STATE_PROCEED = 'proceed';
Module.Operate.activity.model.ActivityModel.STATE_CLOSE = 'close';
