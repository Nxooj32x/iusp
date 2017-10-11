
Ext.define('Module.Operate.activityAccess.model.ActivityAccessModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'activity.name',
		mapping : 'activity.name'
	},{
		name : 'activity.state',
		mapping : 'activity.state'
	},{
		name : 'banner',
		mapping : 'activity.banner'
	},{
		name : 'isOpen',
		mapping : 'isOpen'
	},{
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'userName',
		mapping : 'userName'
	},{
		name : 'code',
		mapping : 'code'
	}]
});

Module.Operate.activityAccess.model.ActivityAccessModel.ISOPEN_TRUE = '1';
Module.Operate.activityAccess.model.ActivityAccessModel.ISOPEN_FALSE = '0';
