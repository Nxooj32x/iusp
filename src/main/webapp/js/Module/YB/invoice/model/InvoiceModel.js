Ext.define('Module.YB.invoice.model.InvoiceModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'obj.id'
	},{
		name : 'userId',
		mapping : 'obj.userId'
	},{
		name : 'issueMode',
		mapping : 'obj.issueMode'
	},{
		name : 'type',
		mapping : 'obj.type'
	},{
		name : 'title',
		mapping : 'obj.title'
	},{
		name : 'content',
		mapping : 'obj.content'
	},{
		name : 'taxpayerId',
		mapping : 'obj.taxpayerId'
	},{
		name : 'registerAddr',
		mapping : 'obj.registerAddr'
	},{
		name : 'registerPhone',
		mapping : 'obj.registerPhone'
	},{
		name : 'bankName',
		mapping : 'obj.bankName'
	},{
		name : 'bankAccount',
		mapping : 'obj.bankAccount'
	},{
		name : 'ctime',
		mapping : 'obj.ctime'
	},{
		name : 'mtime',
		mapping : 'obj.mtime'
	},{
		name : 'address.recvName',
		mapping : 'obj.address.recvName'
	},{
		name : 'address.mobile',
		mapping : 'obj.address.mobile'
	},{
		name : 'address.phone',
		mapping : 'obj.address.phone'
	},{
		name : 'address.addrInfo',
		mapping : 'obj.address.addrInfo'
	},{
		name : 'invoiceNote',
		mapping : 'obj.invoiceNote'
	},{
		name : 'invoiceCode',
		mapping : 'obj.invoiceCode'
	},{
		name : 'freightType',
		mapping : 'obj.freightType'
	},{
		name : 'freightCode',
		mapping : 'obj.freightCode'
	},{
		name : 'order.id',
		mapping : 'obj.order.id'
	},{
		name : 'order.bookId',
		mapping : 'obj.order.bookId'
	},{
		name : 'order.orderId',
		mapping : 'obj.order.orderId'
	},{
		name : 'order.creator',
		mapping : 'obj.order.creator'
	},{
		name : 'order.goodsNum',
		mapping : 'obj.order.goodsNum'
	},{
		name : 'order.price',
		mapping : 'obj.order.price'
	},{
		name : 'order.printStatus',
		mapping : 'obj.order.printStatus'
	},{
		name : 'order.postStatus',
		mapping : 'obj.order.postStatus'
	},{
		name : 'order.ctime',
		mapping : 'obj.order.ctime'
	},{
		name : 'order.mtime',
		mapping : 'obj.order.mtime'
	},{
		name : 'order.status',
		mapping : 'obj.order.status'
	},{
		name : 'order.payType',
		mapping : 'obj.order.payType'
	},{
		name : 'order.invoiceId',
		mapping : 'obj.order.invoiceId'
	},{
		name : 'order.pbookId',
		mapping : 'obj.order.pbookId'
	},{
		name : 'order.tradeNo',
		mapping : 'obj.order.tradeNo'
	},{
		name : 'order.approveStatus',
		mapping : 'obj.order.approveStatus'
	},{
		name : 'order.accountTime',
		mapping : 'obj.order.accountTime'
	},{
		name : 'order.issueDate',
		mapping : 'obj.order.issueDate'
	},{
		name : 'order.inspectDate',
		mapping : 'obj.order.inspectDate'
	},{
		name : 'order.mailDate',
		mapping : 'obj.order.mailDate'
	},{
		name : 'order.freight',
		mapping : 'obj.order.freight'
	},{
		name : 'order.waybillNum',
		mapping : 'obj.order.waybillNum'
	},{
		name : 'order.originPirce',
		mapping : 'obj.order.originPirce'
	},{
		name : 'order.discountType',
		mapping : 'obj.order.discountType'
	},{
		name : 'order.discountNote',
		mapping : 'obj.order.discountNote'
	},{
		name : 'order.invoiceMailPrice',
		mapping : 'obj.order.invoiceMailPrice'
	},{
		name : 'order.payWay',
		mapping : 'obj.order.payWay'
	},{
		name : 'data',
		mapping : 'obj'
	},{
		name : 'links',
		mapping : 'links'
	}]
});