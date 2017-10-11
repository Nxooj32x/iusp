Ext.define('Module.YB.invoice.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sainvoiceportlet',
	
	requires  : [
		'Module.YB.invoice.Operation',
		'Module.YB.invoice.Data',
		'Module.YB.invoice.store.InvoiceStore'
 	],
 		
 	VIEW : {
		'Module.YB.invoice.view.Grid' : LABEL.grid
	},
    
	title: INVOICE_LABEL.title,
			
	iconCls : 'md-role',
	
	moduleName : 'Module.YB.invoice',
    
    moduleSessionView : 'Module.YB.invoiceCurrentView',
    
    dataObj : Module.YB.invoice.Data,
    
    configObj : Module.YB.invoice.Config,
	
    defaultView : 'Module.YB.invoice.view.Grid',
	
    supportView :['Module.YB.invoice.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
	buildInvoiceOptMenu : function(){//加载菜单----用户操作的相关菜单：增删改
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'invoiceoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
            items : [{
				iconCls : 'extensive-edit',
				name:'editInvoice',
				text :  INVOICE_LABEL.editInvoice,
				disabled:true
			},{
				iconCls : 'export',
				name:'exportInvoice',
				text :  INVOICE_LABEL.exportInvoice,
				tooltip: INVOICE_BUTTON.exportInvoice,
				disabled:false
			}]
	    });
		return menu;
    },
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		invoiceMenu = {
            text: "操作",
            iconCls: 'pool_setting',
            menu: this.buildInvoiceOptMenu()
        };
		toolbar.push(invoiceMenu);
		return toolbar;
    }
});