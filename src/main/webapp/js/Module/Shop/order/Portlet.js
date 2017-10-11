Ext.define('Module.Shop.order.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.orderportlet',
	
	requires  : [
		'Module.Shop.order.Operation',
		'Module.Shop.order.Data',
		'Module.YB.order.store.OrderStore'
	],
		
	VIEW : {
		'Module.Shop.order.view.Grid' : LABEL.grid
	},
	
	title: ORDER_LABEL.title,

	iconCls : 'md-user',
	
	moduleName : 'Module.Shop.order',
	
	moduleSessionView : 'Module.Shop.orderCurrentView',
	
	dataObj : Module.Shop.order.Data,
	
	configObj : Module.Shop.order.Config,
	
	defaultView : 'Module.Shop.order.view.Grid',
	
	supportView :['Module.Shop.order.view.Grid'],
	
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
				},{
					text: ORDER_LABEL.exportExcel,
					disabled: false,
					name: 'exportExcel',
					iconCls: 'export'
				}]
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
				}]
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