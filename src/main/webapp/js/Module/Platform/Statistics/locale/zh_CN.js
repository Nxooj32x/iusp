ORDER_LABEL = {
	title : '订单管理',
	operation : '操作',

	orderDetailInfo : '订单详情',

	deliveryInfo : '物流信息',
	deliveryInfoName : '物流公司',
	deliveryInfoType : '配送方式',
	deliveryInfoCode : '物流单号',
	deliveryInfoCtime : '发货时间',

	detailOrder : '订单详情',
	cancelOrder : '取消订单',
	produceOrder : '订单生产',
	deliveryOrder : '订单发货',
	deliveryInfo : '物流信息',
	exportExcel : '下载列表',
	commentInfo : '评论信息',
	printExportExcel : '印刷品订单下载'
};

ORDER_MESSAGE = {
	empty : '没有订单信息',
	confirmDownLoadOrder : '确定下载 订单[{0}]？',
	confirmCancelOrder : '确定要取消订单 : [{0}]？',
	confirmProduceOrder : '确定要开始生产订单 : [{0}]？',
	confirmDeliveryOrder : '确定要开始订单发货 : [{0}]？'
		
};

ORDER_PROPERTY = {
	code : '订单号',
	name : '订单名称',
	defaultMoney : '订单原始金额',
	payMoney : '订单付款金额',
	state : '订单状态',
	ctime : '创建时间',
	cUserId : '创建人Id',
	type : '订单类型',
	totaoNub : '货物数量',
	payType : '支付类型',
	payWay : '支付方式',
	addressId : '收货地址Id',
	invoiceId : '订单发票Id',
	invoiceMoney : '发票运费',
	deliveryId : '配送单ID',
	deliveryMoney : '货物运费',
	voucherId : '优惠卷Id',
	voucherMoney : '优惠金额',
	note : '备注',
	printBookId : '打印书册ID',
	commission : '分润金额 ',
	shopId : '分销商ID',
	isCashed : '是否提现',
	commentState : '评论状态',
	payTime : '付款时间'
};

ORDER_DATA = {
	state : {
		'cancelled' : '已取消',
		'placed' : '已下单',
		'waitpay' : '待付款',
		'payed' : '已付款',
		'offline_pay' : '线下支付',
		'producing' : '生产中',
		'deliveryed' : '已发货',
		'completed' : '完成'
	},
	
	isCashed : {
		'true' : '已经提现',
		'false' : '未提现',
		'null' : '不具备提现资格'
	},

	type : {
		'PHOTO' : '照片冲印',
		'TB_PHOTO' : '淘宝冲印',
		'PBOOK' : '照片书',
	},

	payType : {
		'online' : '在线支付'
	},

	payWay : {
		'payTools' : '第三方支付',
		'tans' : '转账',
		'mix' : '转账+第三方'
	},

	commentState : {
		'none' : '未评论',
		null : '未评论',
		'commented' : '已评论',
		'modified' : '已修改'
	},

	ORDER_COMMENT_STATUS_NONE:'none',
	ORDER_COMMENT_STATUS_COMMENTED:'commented',
	ORDER_COMMENT_STATUS_MODIFIED:'modified',

	STATE_CANCELLED : 'cancelled',
	STATE_PLACED : 'placed',
	STATE_WAITPAY : 'waitpay',
	STATE_PAYED : 'payed',
	STATE_PRODUCING : 'producing',
	STATE_DELIVERYED : 'deliveryed',
	STATE_COMPLETED : 'completed'
};

GOODS_BOOK_PROPERTY = {
		type : "类型",
		price : "单价",
		num : "个数",
		totalPrice : '总价',
		thumbnail : '缩略图',
		pos : '位置',
		name : '书册名称',
		bookId : '书册ID',
		size : '尺寸',
		binding : '装订方式',
		leather:'皮样',
		paper : '纸张',
	paper : '纸张',

		ownerId : '所有者ID',
		status : '状态',
		ctime : '创建事件',
		pageNum : '页面数目'
		
};