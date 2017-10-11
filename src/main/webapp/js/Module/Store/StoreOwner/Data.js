Ext.define('Module.Store.StoreOwner.Data', {
	singleton: true,

	requires  : [
		'Soul.Ajax',
		'Soul.util.ObjectView'
	],

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