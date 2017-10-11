Ext.define('Module.Store.cashmanager.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Store.cashmanager.Operation',
		'Module.Store.cashmanager.Data',
		'Module.Store.cashmanager.store.cashStore'
 	],
 		
 	VIEW : {
		'Module.Store.cashmanager.view.Grid' : LABEL.grid
	},
    
	title: CASH_LABEL.title,
			
	iconCls : 'md-cashmanager',
	
	moduleName : 'Module.Store.cashmanager',
    
    moduleSessionView : 'Module.cashmanager.cashCurrentView',
    
    dataObj : Module.Store.cashmanager.Data,
    
    configObj : Module.Store.cashmanager.Config,
	
    defaultView : 'Module.Store.cashmanager.view.Grid',
	
    supportView :['Module.Store.cashmanager.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildCashOptMenu : function () {

		var menu = Ext.create('Ext.menu.Menu', {

			name : 'useroperation',
			style: {
				overflow: 'visible'     // For the Combo popup
			},
			items: [
				{
					text: CASH_LABEL.detailCash,
					disabled:true,
					name : 'detailCash',
					iconCls : 'update'
				}
			]

		});
		return menu;
	},

    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			cashmanagerMenu = {
				text: "服务商操作",
				iconCls: 'pool_setting',
				menu: this.buildCashOptMenu()
			};
		toolbar.push(cashmanagerMenu);
		return toolbar;
	}
});