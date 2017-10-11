Ext.define('Module.Platform.Statistics.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.ciportlet',
	
	requires  : [
		'Module.Platform.Statistics.Operation',
		'Module.Platform.Statistics.Data'
 	],
 		
 	VIEW : {
		'Module.Platform.Statistics.view.StatisticsTab' : "全部",
		'Module.Platform.Statistics.view.ShopGrid' : '活跃店铺统计',
		'Module.Platform.Statistics.view.OrderGrid' : '订单统计',
		'Module.Platform.Statistics.view.SMBTRGrid' : '模块购买统计',
		'Module.Platform.Statistics.view.CouponTRGrid' : '兑换码购买统计'
	},
    
	title: "统计信息",

	iconCls : 'md-Statistics',
	
	moduleName : 'Module.Platform.Statistics',
    
    moduleSessionView : 'Module.Platform.StatisticsCurrentView',
    
    dataObj : Module.Platform.Statistics.Data,
    
    configObj : Module.Platform.Statistics.Config,
	
    defaultView : 'Module.Platform.Statistics.view.StatisticsTab',
	
    supportView :['Module.Platform.Statistics.view.StatisticsTab',
                  'Module.Platform.Statistics.view.ShopGrid', 
                  'Module.Platform.Statistics.view.OrderGrid',
                  'Module.Platform.Statistics.view.SMBTRGrid',
                  'Module.Platform.Statistics.view.CouponTRGrid'],
    
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