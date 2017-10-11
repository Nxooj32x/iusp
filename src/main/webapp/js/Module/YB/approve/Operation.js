Ext.define('Module.YB.approve.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox'
	],
	
	//获取订单状态
	orderPayedStatus:function(){
		return [{'name':'已付款','status':'payed'},
		       {'name':'生产中','status':'producing'},
		       {'name':'已发货','status':'deliveryed'}];
	},
	//获取订单状态
	approveStatus:function(){
		return [{'name':'审批中','status':'0'},
		       {'name':'审批通过','status':'1'},
		       {'name':'否决','status':'2'},
		       {'name':'未提交','status':''}];
	},
	//获取订单状态
	orderNotPayedStatus:function(){
		return [{'name':'已下单','status':'placed'},
		        {'name':'已取消','status':'canceled'}];
	},
	//获取订单状态
	orderStatusDataFunction:function(){
		return [{'name':'所有订单','status':''},
		        {'name':'已取消','status':'canceled'},
		        {'name':'已下单','status':'placed'},
		        {'name':'已付款','status':'payed'},
		        {'name':'生产中','status':'producing'},
		        {'name':'已发货','status':'deliveryed'},
		        {'name':'已完成','status':'completed'},
		        {'name':'已评价','status':'evaluated'}];
	},
	//获取订单打印状态
	orderPrintStatusDataFunction:function(){
		return [{'name':'--请选择--','status':''},
			       {'name':'已打印','status':'1'},
			       {'name':'未打印','status':'0'},
			       {'name':'打印中','status':'2'},
			       {'name':'在线支付','status':'online'}];
	},
	//获取订单邮寄状态
	orderPostStatusDataFunction:function(){
		return [{'name':'--请选择--','status':''},
			       {'name':'已邮寄','status':'1'},
			       {'name':'未邮寄','status':'0'},
			       {'name':'邮寄中','status':'2'}];
	},
	//审批方法和后台交互
	doApprovalOrderByIdFunction : function(records, callbackFn){
		Soul.Ajax.restAction("/admin/order/"+records.orderId+"/approveStatus/"+records.approveStatus, "PUT",null,null,  callbackFn, null, callbackFn);
	}
});
