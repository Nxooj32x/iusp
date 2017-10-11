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
		'book' : '书册订单'
	},

	payType : {
		'online' : '在线支付'
	},

	payWay : {
		'10' : '支付宝',
		'20' : '银联支付',
		'40' : '微信支付',
		'90' : '余额支付'
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



COOKBOOK_DATA = {
	bookTexture : {
		'T001' : '纸面',
		'T002' : '软皮',
		'T003' : '硬壳'
	},

	bookSize : {
		'S001' : 'B3'
	},

	bookBinding : {
		'B001' : '分体外铜钉',
		'B002' : '分体内铜钉',
		'B003' : '连体外铜钉',
		'B004' : '连体内铜钉',
		'B005' : '连体仿古线',
		'B006' : '分体仿古线'
	},

	bookLeather : {
		'L01001' : '葵花-红',
		'L01002' : '葵花-蓝',
		'L01003' : '葵花-土黄',
		'L02004' : '篮球纹-酒红',
		'L02005' : '篮球纹-灰',
		'L03006' : '石子纹-咖啡',
		'L03007' : '石子纹-蓝',
		'L03008' : '石子纹-灰',
		'L03009' : '石子纹-黄',
		'L04010' : '水牛纹-黑',
		'L04011' : '水牛纹-深绿',
		'L04012' : '水牛纹-棕红',
		'L04013' : '水牛纹-土黄',
		'L04014' : '水牛纹-棕黄',
		'L04015' : '水牛纹-蓝',
		'L04016' : '水牛纹-深红',
		'L05017' : '绒面-深绿',
		'L05018' : '绒面-深红',
		'L05019' : '绒面-棕红',
		'L05020' : '绒面-浅绿',
		'L05021' : '绒面-棕黄',
		'L06022' : '毛皮纹-酒红',
		'L06023' : '毛皮纹-棕',
		'L06024' : '毛皮纹-咖啡',
		'L07025' : '闪电纹-咖啡',
		'L07026' : '闪电纹-黑',
		'L08027' : '真皮-黑',
		'L08028' : '真皮-棕',
		'L08029' : '真皮-绿'
	},

};
