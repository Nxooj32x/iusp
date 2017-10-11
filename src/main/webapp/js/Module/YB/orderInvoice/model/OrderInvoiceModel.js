Ext.define('Module.YB.orderInvoice.model.OrderInvoiceModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'userId',
		mapping : 'userId'
	},{
		name : 'type',
		mapping : 'type'
	},{
		name : 'category',
		mapping : 'category'
	},{
		name : 'title',
		mapping : 'title'
	},{
		name : 'content',
		mapping : 'content'
	},{
		name : 'taxpayerId',
		mapping : 'taxpayerId'
	},{
		name : 'registerAddr',
		mapping : 'registerAddr'
	},{
		name : 'registerPhone',
		mapping : 'registerPhone'
	},{
		name : 'bankName',
		mapping : 'bankName'
	},{
		name : 'bankAccount',
		mapping : 'bankAccount'
	},{
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'note',
		mapping : 'note'
	},{
		name : 'invoiceNub',
		mapping : 'invoiceNub'
	},{
		name : 'money',
		mapping : 'money'
	},{
		name : 'state',
		mapping : 'state'
	},{
		name : 'addressId',
		mapping : 'addressId'
	},{
		name : 'isAloneDelivery',
		mapping : 'isAloneDelivery'
	},{
		name : 'deliveryId',
		mapping : 'deliveryId'
	},{
		name : 'isDelivery',
		mapping : 'isDelivery'
	},{
		name : 'orderId',
		mapping : 'orderId'
	},{
		name : 'userInvoiceId',
		mapping : 'userInvoiceId'
	}]
});