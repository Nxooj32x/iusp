Ext.define('Module.Store.StoreShop.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Store.StoreShop.Operation',
		'Module.Store.StoreShop.Data',
		'Module.Store.StoreShop.store.StoreShopStore'
 	],
 		
 	VIEW : {
		'Module.Store.StoreShop.view.Grid' : LABEL.grid,
		'Module.Store.StoreShop.view.ShopDetailPanel' : "店铺详情"
	},
    
	title: STORESHOP_LABEL.shop,
			
	iconCls : 'md-StoreShop',
	
	moduleName : 'Module.Store.StoreShop',
    
    moduleSessionView : 'Module.Store.StoreShopCurrentView',
    
    dataObj : Module.Store.StoreShop.Data,
    
    configObj : Module.Store.StoreShop.Config,
	
    defaultView : 'Module.Store.StoreShop.view.Grid',
	
    supportView :['Module.Store.StoreShop.view.Grid', 'Module.Store.StoreShop.view.ShopDetailPanel'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildStoreShopOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'storeShopoperation',
			style: {
				overflow: 'visible'     // For the Combo popup
			},
			items: [{
				text: "开启",
				disabled: false,
				name: 'openStoreShop',
				iconCls: 'extensive-edit'
			},{
				text: "暂停",
				disabled: false,
				name: 'pauseStoreShop',
				iconCls: 'extensive-edit'
			},{
				text: "删除",
				disabled: false,
				name: 'delStoreShop',
				iconCls: 'x-del-icon'
			}]
		});
		return menu;
	},
    
	 		
    initToolbar : function(){
		var me = this;
		var toolbar = this.callParent(arguments),
		shopMenu = {
			text: "返回列表",
			name : 'back2list',
			//hidden : true,
			iconCls: 'pool_setting',
			handler : function(){
				me.gotoView("Module.Store.StoreShop.view.Grid", {}, me);
			}
		};
		toolbar.push(shopMenu);
		return toolbar;
    }
});