INVOICE_LABEL = {
	title : '财务管理',
	editInvoice : '编辑',
	exportInvoice : '导出',

	editInvoiceInfo : '编辑发票信息',

	unknown : '未知'
};

INVOICE_MESSAGE = {
	noInvoice : '暂时没有发票信息'
};

INVOICE_PROPERTY = {
	invoiceMoney : '发票金额',
	invoiceReviceName : '收票人',
	invoiceRevicePhone : '电话',
	invoiceReviceAddr : '收票地址',

	id : '发票ID',
	userId : '用户ID',
	issueMode : '发票开具方式',
	type : '发票类型',
	title : '发票标题',
	content : '发票内容',
	taxpayerId : '纳税人识别号',
	registerAddr : '注册地址',
	registerPhone : '注册电话',
	bankName : '开户银行',
	bankAccount : '银行账户',
	ctime : '创建时间',
	mtime : '修改时间',
	invoiceNote : '发票备注',
	invoiceCode : '发票票号',
	freightType : '发票运货方式',
	freightCode : '发票运货单号'
};

INVOICE_ORDER_PROPERTY = {
	singlePrice : '书册单价',

	id : '订单ID',
	orderId : '订单号',
	bookId : '书册',
	creator : '创建者',
	goodsNum : '书册数量',
	price : '到账金额',
	printStatus : '打印状态',
	postStatus : '邮寄状态',
	ctime : '创建时间',
	mtime : '修改时间',
	status : '订单状态',
	payType : '支付类型',
	invoiceId : '发票ID',
	pbookId : '打印书册ID',
	tradeNo : '支付宝交易码',
	approveStatus : '审批状态',
	accountTime : '到账时间',
	issueDate : '开票日期',
	inspectDate : '抽检日期',
	mailDate : '邮寄日期',
	freight : '货运方式',
	waybillNum : '运单号',
	originPirce : '订单总价',
	discountType : '优惠类型',
	discountNote : '优惠备注',
	invoiceMailPrice : '发票运费',
	payWay : '到账方式'
};

INVOICE_BUTTON = {
	exportInvoice : '将当前搜索条件下的所有数据导出为Excel文件'
};

INVOICE_COMBO = {
	orderStatus : [[null,'-- 全部 --'],['canceled','已取消'],['placed','已下单'],['previewed','已预览'],['payed','已付款'],
	['producing','生成中'],['deliveryed','已发货'],['completed','已完成'],['evaluated','已评价']],
	orderPayWay : [[null,'-- 全部 --'],['10','支付宝'],['20','银联'],['90','余额']],
	invoiceIssueMode : [[null,'-- 全部 --'],['plain','普通发票'],['vat','增值税发票']]
};