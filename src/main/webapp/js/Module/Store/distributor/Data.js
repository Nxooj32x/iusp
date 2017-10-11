Ext.define('Module.Store.distributor.Data', {
	singleton: true,

	requires  : [
		'Soul.Ajax',
		'Soul.util.ObjectView'
	],
	
	statusCombo : [ [ "online", "正常" ], [ "offline", "停用" ], [ "apply", "申请" ], [ "reject", "拒绝申请" ] ],
	
	typeCombo : [[ "platform", "平台" ], [ "shop", "网店" ]],

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