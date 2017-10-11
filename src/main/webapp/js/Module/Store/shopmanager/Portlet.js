Ext.define('Module.Store.shopmanager.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Store.shopmanager.Operation',
		'Module.Store.shopmanager.Data',
		'Module.Store.shopmanager.store.StoreShopStore'
 	],
 		
 	VIEW : {
		'Module.Store.shopmanager.view.Grid' : LABEL.grid
	},
    
	title: STORESHOP_LABEL.shop,
			
	iconCls : 'md-voucher',
	
	moduleName : 'Module.Store.shopmanager',
    
    moduleSessionView : 'Module.Store.shopmanagerCurrentView',
    
    dataObj : Module.Store.shopmanager.Data,
    
    configObj : Module.Store.shopmanager.Config,
	
    defaultView : 'Module.Store.shopmanager.view.Grid',
	
    supportView :['Module.Store.shopmanager.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	
	
	buildStoreShopOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'channelAccessoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: STORESHOP_LABEL.editShop,
					disabled: true,
					name: 'editShop',
					iconCls: 'extensive-edit'	
				},{
	        		text: STORESHOP_LABEL.staticShop,
					disabled: true,
					name: 'staticShop',
					iconCls: 'extensive-edit'
				},{
	        		text: STORESHOP_LABEL.shopModule,
					disabled: true,
					name: 'shopModule',
					iconCls: 'extensive-edit'
				}]
	    });
		return menu;
    },
	 		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		shopMenu = {
			text: STORESHOP_LABEL.opertionShop,
			iconCls: 'pool_setting',
			menu: this.buildStoreShopOptMenu()
		};
		toolbar.push(shopMenu);
		return toolbar;
    }
});