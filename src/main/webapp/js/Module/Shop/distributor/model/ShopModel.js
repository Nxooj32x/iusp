Ext.define('Module.Shop.distributor.model.ShopModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'userId',
		mapping : 'userId'
	},{
		name : 'userName',
		mapping : 'user.loginName'
	},{
		name : 'mobile',
		mapping : 'user.mobile'
	},{
		name : 'wechat',
		mapping : 'wechatTpa.nickname'
	},{
		name : 'code',
		mapping : 'code'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'logo',
		mapping : 'logo'
	},{
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'state',
		mapping : 'state'
	},{
		name : 'sellNub',
		mapping : 'sellNub'
	},{
		name : 'earningMoney',
		mapping : 'earningMoney'
	},{
		name : 'extractMoney',
		mapping : 'extractMoney'
	},{
		name : 'statisticTime',
		mapping : 'statisticTime'
	},{
		name : 'note',
		mapping : 'note'
	},{
		name : 'data',
		mapping : 'data'
	}]
});

Module.Shop.distributor.model.ShopModel.OPEN = 'open';
Module.Shop.distributor.model.ShopModel.CLOSE = 'close';


