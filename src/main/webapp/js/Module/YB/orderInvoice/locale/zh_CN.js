ORDER_INVOICE_LABEL = {
	title : '订单发票管理',
	operation : '操作',

	orderDetailInfo : '订单发票详情',

	deliveryInfo : '物流信息',
	deliveryInfoName : '物流公司',
	deliveryInfoType : '配送方式',
	deliveryInfoCode : '物流单号',
	deliveryInfoCtime : '发货时间',

	makeOrderInvoice : '发票开票',
	detailOrderInvoice : '发票详情',
	deliveryInfo : '物流信息',
	exportExcel : '下载列表'
};

ORDER_INVOICE_MESSAGE = {
	empty : '没有订单发票信息',

	confirmCancelOrderInvoice : '确定要取消订单发票 : [{0}]？',
	confirmProduceOrderInvoice : '确定要开始生产订单发票 : [{0}]？',
	confirmDeliveryOrderInvoice : '确定要开始订单发票发货 : [{0}]？'
};

ORDER_INVOICE_PROPERTY = {
	userId : '创建者Id',
	type : '发票类型',
	category : '发票类别',
	title : '发票抬头',
	content : '发票内容',
	taxpayerId : '纳税人识别号',
	registerAddr : '注册地址',
	registerPhone : '注册电话',
	bankName : '开户银行',
	bankAccount : '开户银行账户',
	ctime : '创建时间',
	note : '发票备注',
	invoiceNub : '发票票号',
	money : '开票金额',
	state : '开票状态',
	addressId : '收货地址Id',
	isAloneDelivery : '独立配送',
	deliveryId : '配送单ID',
	isDelivery : '是否寄出',
	orderId : '订单ID',
	userInvoiceId : '用户开票Id'
};

ORDER_INVOICE_DATA = {
	state : {
		'wait' : '未开发票',
		'already' : '已开发票'
	},

	type : {
		'persona' : '个人',
		'company' : '公司'
	},

	category : {
		'common' : '普通发票',
		'vta' : '增值税发票'
	},

	bool : {
		"true" : '是',
		"false" : '否'
	},

	STATE_WAIT : 'wait',
	STATE_ALREADY : 'already'
};