Ext.define('Module.Store.storemanager.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',

	requires  : [
		'Module.Store.storemanager.Operation',
		'Module.Store.storemanager.Data',
		'Module.Store.storemanager.store.StoreOwnerStore'
	],

	VIEW : {
		'Module.Store.storemanager.view.Grid' : LABEL.grid
	},

	title: STORE_LABEL.name,

	iconCls : 'md-store',

	moduleName : 'Module.Store.storemanager',

	moduleSessionView : 'Module.storemanager.storeCurrentView',

	dataObj : Module.Store.storemanager.Data,

	configObj : Module.Store.storemanager.Config,

	defaultView : 'Module.Store.storemanager.view.Grid',

	supportView :['Module.Store.storemanager.view.Grid'],

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
					text: STORE_LABEL.editStore,
					disabled:true,
					name : 'editStore',
					iconCls : 'update'
				},
				{
					text: STORE_LABEL.executeStatistics,
					disabled:true,
					name : 'executeStatistics',
					iconCls : 'pool_setting',
					handler:function(){
						alert("功能待开发!");
					}
				},
				{
					text: STORE_LABEL.statisticsDetail,
					disabled:true,
					name : 'statisticsDetail',
					iconCls : 'pool_setting'
				},
				{
					text: STORE_LABEL.shopDetial,
					disabled:true,
					name : 'shopDetial',
					iconCls : 'pool_setting'
				}
			]

		});
		return menu;

	},
	initToolbar : function(){
		var toolbar = this.callParent(arguments),
			storemanagerMenu = {
				text: "服务商操作",
				iconCls: 'pool_setting',
				menu: this.buildStoreOptMenu()
			};
		toolbar.push(storemanagerMenu);
		return toolbar;
	}
});