Ext.define('Module.Platform.TradeRecord.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.ciportlet',
	
	requires  : [
		'Module.Platform.TradeRecord.Operation',
		'Module.Platform.TradeRecord.Data'
 	],
 		
 	VIEW : {
		'Module.Platform.TradeRecord.view.Grid' : '表格模式'
	},
    
	title: "交易记录",

	iconCls : 'md-TradeRecord',
	
	moduleName : 'Module.Platform.TradeRecord',
    
    moduleSessionView : 'Module.Platform.TradeRecordCurrentView',
    
    dataObj : Module.Platform.TradeRecord.Data,
    
    configObj : Module.Platform.TradeRecord.Config,
	
    defaultView : 'Module.Platform.TradeRecord.view.Grid',
	
    supportView :['Module.Platform.TradeRecord.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

    initToolbar : function(){
		var me = this;
		var toolbar = this.callParent(arguments);
		return toolbar;
	}
});