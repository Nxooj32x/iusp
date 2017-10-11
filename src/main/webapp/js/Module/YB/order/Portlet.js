Ext.define('Module.YB.order.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.orderportlet',
	
	requires  : [
		'Module.YB.order.Operation',
		'Module.YB.order.Data',
		'Module.YB.order.store.OrderStore'
	],
		
	VIEW : {
		'Module.YB.order.view.Grid' : LABEL.grid
	},
	
	title: ORDER_LABEL.title,

	iconCls : 'md-user',
	
	moduleName : 'Module.YB.order',
	
	moduleSessionView : 'Module.YB.orderCurrentView',
	
	dataObj : Module.YB.order.Data,
	
	configObj : Module.YB.order.Config,
	
	defaultView : 'Module.YB.order.view.Grid',
	
	supportView :['Module.YB.order.view.Grid'],
	
	havUpdateButton : false,
	
	initComponent : function() {
		this.callParent(arguments);
	},
	buildOrderOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'orderoperation',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: ORDER_LABEL.detailOrder,
					disabled: false,
					name: 'detailOrder',
					iconCls: 'extensive-info'
				},{
					text: ORDER_LABEL.produceOrder,
					disabled: true,
					name: 'produceOrder',
					iconCls: 'extensive-edit'
				},{
					text: ORDER_LABEL.deliveryOrder,
					disabled: true,
					name: 'deliveryOrder',
					iconCls: 'extensive-edit'
				},{
					text: ORDER_LABEL.cancelOrder,
					disabled: true,
					name: 'cancelOrder',
					iconCls: 'x-del-icon'
				},{
					text: ORDER_LABEL.deliveryInfo,
					disabled: true,
					name: 'deliveryInfo',
					iconCls: 'extensive-edit'
				}/*,{
					text: ORDER_LABEL.exportExcel,
					disabled: false,
					name: 'exportExcel',
					iconCls: 'export'
				}*/]
		});
		return menu;
	},
	buildOrderOptRightMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'orderoperation',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: ORDER_LABEL.detailOrder,
					disabled: false,
					name: 'detailOrder',
					iconCls: 'extensive-info'
				},{
					text: ORDER_LABEL.produceOrder,
					disabled: true,
					name: 'produceOrder',
					iconCls: 'extensive-edit'
				},{
					text: ORDER_LABEL.deliveryOrder,
					disabled: true,
					name: 'deliveryOrder',
					iconCls: 'extensive-edit'
				},{
					text: ORDER_LABEL.cancelOrder,
					disabled: true,
					name: 'cancelOrder',
					iconCls: 'x-del-icon'
				},{
					text: ORDER_LABEL.deliveryInfo,
					disabled: true,
					name: 'deliveryInfo',
					iconCls: 'extensive-edit'
			},{
				text: ORDER_LABEL.commentInfo,
				disabled: true,
				name: 'commentInfo',
				iconCls: 'extensive-edit'
				}/*,{
					text: ORDER_LABEL.printExportExcel,
					disabled: false,
					name: 'printExportExcel',
					iconCls: 'export'
				}*/]
		});
		return menu;
	},
	initToolbar : function(){
		var toolbar = this.callParent(arguments);
		var orderMenu = {
			text: ORDER_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildOrderOptMenu()
		};
		toolbar.push(orderMenu);
		return toolbar;
	}
});