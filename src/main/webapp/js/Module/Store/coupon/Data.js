Ext.define('Module.Store.coupon.Data', {
	singleton: true,

	requires  : [
		'Soul.Ajax',
		'Soul.util.ObjectView'
	],
	
	statusCombo : [ [ "online", "启用" ], [ "offline", "停用" ]],
	
	typeCombo : [['system',"系统"],["distributor", "渠道商"], ["user", '用户']],
	
	billingTypeCombo : [["PPV", "按次"], ["TIME", "按时"]],
	
	billStatusCombo : [ [ "used", "已使用" ], [ "unuse", "未使用" ]],

	loadData : function(){
		return null;
	},

	updateAll : function(fn){
		var callbackFn = function(){
			Soul.Ajax.executeFnAfterLoad(fn);
		};
		callbackFn();
	},

	constructor : function() {
		this.callParent(arguments);
	}
});