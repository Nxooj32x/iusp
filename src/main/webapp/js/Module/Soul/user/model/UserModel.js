
Ext.define('Module.Soul.user.model.UserModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'email',
		mapping : 'email'
	},{
		name : 'password',
		mapping : 'password'
	},{
		name : 'status',
		mapping : 'status'
	},{
		name : 'mobilePhone',
		mapping : 'mobilePhone'
	},{
		name : 'registdate',
		mapping : 'registdate'
	},{
		name : 'updatedate',
		mapping : 'updatedate'
	},{
		name : 'type',
		mapping : 'type'
	},{
		name : 'source',
		mapping : 'source'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	},{
		name : 'lastLoginTime',
		mapping : 'lastLoginTime'
	},{
		name : 'firstLoginTime',
		mapping : 'firstLoginTime'
	}]
});

Module.Soul.user.model.UserModel.ACTIVE = 0;
Module.Soul.user.model.UserModel.UNACTIVE = 1;
Module.Soul.user.model.UserModel.LOCKED = 2;
