Ext.define('Module.Store.StoreOwner.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',

	requires  : [
		'Module.Store.StoreOwner.Operation',
		'Module.Store.StoreOwner.Data',
		'Module.Store.StoreOwner.store.StoreOwnerStore'
	],

	VIEW : {
		'Module.Store.StoreOwner.view.Grid' : LABEL.grid
	},

	title: "服务商管理",

	iconCls : 'md-StoreOwner',

	moduleName : 'Module.Store.StoreOwner',

	moduleSessionView : 'Module.Store.StoreOwnerCurrentView',

	dataObj : Module.Store.StoreOwner.Data,

	configObj : Module.Store.StoreOwner.Config,

	defaultView : 'Module.Store.StoreOwner.view.Grid',

	supportView :['Module.Store.StoreOwner.view.Grid'],

	havUpdateButton : false,

	initComponent : function() {
		this.callParent(arguments);
	},


	buildStoreOptMenu : function(){

		var menu = Ext.create('Ext.menu.Menu', {

			name : 'useroperation',
			style: {
				overflow: 'visible'     // For the Combo popup
			},
			items: [
				{
					text: "编辑客户信息",
					disabled:true,
					name : 'editCI',
					iconCls : 'update'
				}
			]

		});
		return menu;

	},
	initToolbar : function(){
		var toolbar = this.callParent(arguments),
			storeMenu = {
				text: "服务商操作",
				iconCls: 'pool_setting',
				menu: this.buildStoreOptMenu()
			};
		toolbar.push(storeMenu);
		return toolbar;
	}
});