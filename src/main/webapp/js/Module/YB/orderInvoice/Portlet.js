Ext.define('Module.YB.orderInvoice.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.orderportlet',
	
	requires  : [
		'Module.YB.orderInvoice.Operation',
		'Module.YB.orderInvoice.Data',
		'Module.YB.orderInvoice.store.OrderInvoiceStore'
	],
		
	VIEW : {
		'Module.YB.orderInvoice.view.Grid' : LABEL.grid
	},
	
	title: ORDER_INVOICE_LABEL.title,

	iconCls : 'md-user',
	
	moduleName : 'Module.YB.orderInvoice',
	
	moduleSessionView : 'Module.YB.orderInvoiceCurrentView',
	
	dataObj : Module.YB.orderInvoice.Data,
	
	configObj : Module.YB.orderInvoice.Config,
	
	defaultView : 'Module.YB.orderInvoice.view.Grid',
	
	supportView :['Module.YB.orderInvoice.view.Grid'],
	
	havUpdateButton : false,
	
	initComponent : function() {
		this.callParent(arguments);
	},
	buildOrderInvoiceOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'orderoperation',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: ORDER_INVOICE_LABEL.detailOrderInvoice,
					disabled: true,
					name: 'detailOrderInvoice',
					iconCls: 'extensive-info'
				},{
					text: ORDER_INVOICE_LABEL.makeOrderInvoice,
					disabled: true,
					name: 'makeOrderInvoice',
					iconCls: 'x-add-icon'
				},{
					text: ORDER_INVOICE_LABEL.deliveryInfo,
					disabled: true,
					name: 'deliveryInfo',
					iconCls: 'extensive-edit'
				},{
					text: ORDER_INVOICE_LABEL.exportExcel,
					disabled: false,
					name: 'exportExcel',
					iconCls: 'export'
				}]
		});
		return menu;
	},
	initToolbar : function(){
		var toolbar = this.callParent(arguments);
		var orderMenu = {
			text: ORDER_INVOICE_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildOrderInvoiceOptMenu()
		};
		toolbar.push(orderMenu);
		return toolbar;
	}
});