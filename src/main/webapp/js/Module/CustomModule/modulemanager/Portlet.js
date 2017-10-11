Ext.define('Module.CustomModule.modulemanager.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',

	requires  : [
		'Module.CustomModule.modulemanager.Operation',
		'Module.CustomModule.modulemanager.Data',
		'Module.CustomModule.modulemanager.store.ModuleStore'
	],

	VIEW : {
		'Module.CustomModule.modulemanager.view.Grid' : LABEL.grid
	},

	title: MODULE_MANAGER.NAME,

	iconCls : 'md-voucher',

	moduleName : 'Module.CustomModule.modulemanager',

	moduleSessionView : 'Module.CustomModule.customCurrentView',

	dataObj : Module.CustomModule.modulemanager.Data,

	configObj : Module.CustomModule.modulemanager.Config,

	defaultView : 'Module.CustomModule.modulemanager.view.Grid',

	supportView :['Module.CustomModule.modulemanager.view.Grid'],

	havUpdateButton : false,

	initComponent : function() {
		this.callParent(arguments);
	},

	buildModuleOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {

			name : 'useroperation',
			style: {
				overflow: 'visible'     // For the Combo popup
			},
			items: [
				{
					text: MODULE_LABEL.addModule,
					disabled:false,
					name : 'addModule',
					iconCls : 'x-add-icon'
				},{
					text: MODULE_LABEL.editModule,
					disabled:true,
					name : 'editModule',
					iconCls : 'update'
				},{
					text: MODULE_LABEL.delModule,
					disabled:true,
					name : 'delModule',
					iconCls : 'delete'
				},{
					text: "计费管理",
					disabled:true,
					name : 'billingManager',
					iconCls : 'pool_setting'
				},{
					text: "配置管理",
					disabled:true,
					name : 'configManager',
					iconCls : 'pool_setting'
				}
			]

		});
		return menu;
	},
	initToolbar : function(){
		var toolbar = this.callParent(arguments),
			moduleMenu = {
				text: "模块操作",
				iconCls: 'pool_setting',
				menu: this.buildModuleOptMenu()
			};
		toolbar.push(moduleMenu);
		return toolbar;
	}
});