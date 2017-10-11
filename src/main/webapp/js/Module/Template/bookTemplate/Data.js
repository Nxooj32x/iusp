Ext.define('Module.Template.bookTemplate.Data', {
	singleton : true,

	requires : [ 'Soul.Ajax', 'Soul.util.ObjectView' ],

	typeCombo : [ [ 'BYC', "毕业册" ], [ 'JHC', "聚会册" ], [ 'ZPS', "照片书" ], ['XYC', "校园册"],['CP', "菜谱"]],

	statusCombo : [ [ 0, "使用中" ], [ 1, "停用" ] ],

	loadData : function() {
		return;
	},

	updateAll : function(fn) {
		var callbackFn = function() {
			Soul.Ajax.executeFnAfterLoad(fn);
		};
		callbackFn();
	},

	constructor : function() {
		this.callParent(arguments);
	}

});
