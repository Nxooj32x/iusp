Ext.define('Module.YB.order.model.OrderModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'code',
		mapping : 'code'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'defaultMoney',
		mapping : 'defaultMoney'
	},{
		name : 'payMoney',
		mapping : 'payMoney'
	},{
		name : 'state',
		mapping : 'state'
	},{
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'cUserId',
		mapping : 'cUserId'
	},{
		name : 'type',
		mapping : 'type'
	},{
		name : 'totalNub',
		mapping : 'totalNub'
	},{
		name : 'payType',
		mapping : 'payType'
	},{
		name : 'payWay',
		mapping : 'payWay'
	},{
		name : 'addressId',
		mapping : 'addressId'
	},{
		name : 'invoiceId',
		mapping : 'invoiceId'
	},{
		name : 'deliveryMoney',
		mapping : 'deliveryMoney'
	},{
		name : 'invoiceMoney',
		mapping : 'invoiceMoney'
	},{
		name : 'voucherId',
		mapping : 'voucherId'
	},{
		name : 'voucherMoney',
		mapping : 'voucherMoney'
	},{
		name : 'shopId',
		mapping : 'shopId'
	},{
		name : 'commission',
		mapping : 'commission'
	},{
		name : 'isCashed',
		mapping : 'isCashed'
	},{
		name : 'note',
		mapping : 'note'
	},{
		name : 'payTime',
		mapping : 'payTime'
	},{
		name : 'commentState',
		mapping : 'commentState'
	}]
});