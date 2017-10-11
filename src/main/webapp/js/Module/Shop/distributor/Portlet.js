Ext.define('Module.Shop.distributor.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sanoticeportlet',
	
	requires  : [
		'Module.Shop.distributor.Operation',
		'Module.Shop.distributor.Data',
		'Module.Shop.distributor.store.ShopStore'
 	],
 		
 	VIEW : {
		'Module.Shop.distributor.view.Grid' : LABEL.grid
	},
    
	title: SHOP_MANAGE_LABEL.shopInfo,
			
	iconCls : 'md-user',
	
	moduleName : 'Module.Shop.distributor',
    
    moduleSessionView : 'Module.Shop.distributorCurrentView',
    
    dataObj : Module.Shop.distributor.Data,
    
    configObj : Module.Shop.distributor.Config,
	
    defaultView : 'Module.Shop.distributor.view.Grid',
	
    supportView :['Module.Shop.distributor.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildShopOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'dictoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [
	               {
	            	   text: SHOP_MANAGE_LABEL.open,
	            	   disabled:false,
	            	   name : 'open',
	            	   iconCls : 'extensive-edit'
	               },{
	            	   text: SHOP_MANAGE_LABEL.close,
	            	   disabled:false,
	            	   name : 'close',
	            	   iconCls : 'extensive-edit'
				},{
					text: SHOP_MANAGE_LABEL.viewOrderItem,
					disabled:true,
					name : 'viewitem',
					iconCls : 'view'
				}]
	    });
		return menu;
    },
	
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			dictMenu = {
	            text: SHOP_MANAGE_LABEL.shopOperation,
	            iconCls: 'pool_setting',  
	            menu: this.buildShopOptMenu()
	        };
		toolbar.push(dictMenu);
		return toolbar;
    }
});
