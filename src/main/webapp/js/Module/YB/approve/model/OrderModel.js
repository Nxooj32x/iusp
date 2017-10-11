
Ext.define('Module.YB.approve.model.OrderModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'obj.id'
	},{
		name : 'bookId',
		mapping : 'obj.bookId'
	},{
		name : 'orderId',
		mapping : 'obj.orderId'
	},{
		name : 'creator',
		mapping : 'obj.creator'
	},{
		name : 'goodsNum',
		mapping : 'obj.goodsNum'
	},{
		name : 'price',
		mapping : 'obj.price'
	},{
		name : 'originPirce',
		mapping : 'obj.originPirce'
	},{
		name : 'printStatus',
		mapping : 'obj.printStatus'
	},{
		name : 'ctime',
		mapping : 'obj.ctime'
	},{
		name : 'status',
		mapping : 'obj.status'
	},{
		name : 'mtime',
		mapping : 'obj.mtime'
	},{
		name : 'address',
		mapping : 'obj.address.cityName'
	},{
		name : 'payType',
		mapping : 'obj.payType'
	},{
		name : 'invoiceId',
		mapping : 'obj.invoiceId'
	},{
		name : 'pbookId',
		mapping : 'obj.pbookId'
	},{
		name : 'postStatus',
		mapping : 'obj.postStatus'
	},{
		name : 'bookName',
		mapping : 'book.name'
	},{
		name : 'coverThumbNail',
		mapping : 'coverThumbNail'
	},{
		name : 'approveStatus',
		mapping : 'obj.approveStatus'
	}]
});

/**
 *  所有订单
 */
Module.YB.approve.model.OrderModel.ORDER_STATUS_ALL = 'all';
/**
 *  订单状态：已取消
 */
Module.YB.approve.model.OrderModel.ORDER_STATUS_CANCELED = 'canceled';
/**
 *  订单状态：已下单
 */
Module.YB.approve.model.OrderModel.ORDER_STATUS_PLACED = 'placed';
/**
 *  订单状态：已付款
 */
Module.YB.approve.model.OrderModel.ORDER_STATUS_PAYED = 'payed';
/**
 * 订单状态：生产中
 */
Module.YB.approve.model.OrderModel.ORDER_STATUS_PRODUCING = 'producing';
/**
 * 订单状态：已发货
 */
Module.YB.approve.model.OrderModel.ORDER_STATUS_DELIVERYED = 'deliveryed';
/**
 * 订单状态：已完成
 */
Module.YB.approve.model.OrderModel.ORDER_STATUS_COMPLETED = 'completed';
/**
 *  订单状态：已评价
 */
Module.YB.approve.model.OrderModel.ORDER_STATUS_EVALUATED = 'evaluated';

/**
 * 是否邮寄
 */
Module.YB.approve.model.OrderModel.POST_Y = '1';//以邮寄
Module.YB.approve.model.OrderModel.POST_N = '0';//未邮寄
Module.YB.approve.model.OrderModel.POST_ING = '2';//邮寄中

/**
 * 审批状态
 */
Module.YB.approve.model.OrderModel.APPROVED = '0';//已提交
Module.YB.approve.model.OrderModel.APPROVED_Y = '1';//审批通过
Module.YB.approve.model.OrderModel.APPROVED_N = '2';//驳回
/**
 * 打印
 */
Module.YB.approve.model.OrderModel.PRINT_Y = '1';//以打印
Module.YB.approve.model.OrderModel.PRINT_N = '0';//未打印
Module.YB.approve.model.OrderModel.PRINT_ING = '2';//打印中
Module.YB.approve.model.OrderModel.PAY_TYPE_ONLINE = 'online';//在线支付
