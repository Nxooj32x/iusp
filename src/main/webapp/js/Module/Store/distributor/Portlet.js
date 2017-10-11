Ext.define('Module.Store.distributor.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',

	requires  : [
		'Module.Store.distributor.Operation',
		'Module.Store.distributor.Data',
		'Module.Store.distributor.store.DistributorStore'
	],

	VIEW : {
		'Module.Store.distributor.view.Grid' : LABEL.grid
	},

	title: "渠道商管理",

	iconCls : 'md-group',

	moduleName : 'Module.Store.distributor',

	moduleSessionView : 'Module.Store.distributorCurrentView',

	dataObj : Module.Store.distributor.Data,

	configObj : Module.Store.distributor.Config,

	defaultView : 'Module.Store.distributor.view.Grid',

	supportView :['Module.Store.distributor.view.Grid'],

	havUpdateButton : false,

	initComponent : function() {
		this.callParent(arguments);
	},


	buildDrOptMenu : function(){

		var menu = Ext.create('Ext.menu.Menu', {

			name : 'useroperation',
			style: {
				overflow: 'visible'     // For the Combo popup
			},
			items: [
				{
					text: "新建渠道商",
					name : 'add',
					iconCls : 'x-add-icon'
				},
				{
					text: "通过申请",
					disabled:true,
					name : 'approve',
					icon : '/img/icon/active.png'
				},
				{
					text: "拒绝申请",
					disabled:true,
					name : 'reject',
					icon : '/img/icon/del.png'
				},
				{
					text: "启用/停用",
					disabled:true,
					name : 'startStop',
					icon : '/img/icon/stop.png'
				}
			]

		});
		return menu;

	},
	initToolbar : function(){
		var toolbar = this.callParent(arguments),
			distributorMenu = {
				text: "渠道商操作",
				iconCls: 'pool_setting',
				menu: this.buildDrOptMenu()
			};
		toolbar.push(distributorMenu);
		return toolbar;
	}
});