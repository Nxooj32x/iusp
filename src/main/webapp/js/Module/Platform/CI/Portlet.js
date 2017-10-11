Ext.define('Module.Platform.CI.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.ciportlet',
	
	requires  : [
		'Module.Platform.CI.Operation',
		'Module.Platform.CI.Data',
		'Module.Platform.CI.store.CustomerInfo'
 	],
 		
 	VIEW : {
		'Module.Platform.CI.view.Grid' : LABEL.grid,
		'Module.Platform.CI.view.ContactLogEdit' : "沟通记录"
	},
    
	title: "客户信息管理",
			
	iconCls : 'info',
	
	moduleName : 'Module.Platform.CI',
    
    moduleSessionView : 'Module.Platform.CICurrentView',
    
    dataObj : Module.Platform.CI.Data,
    
    configObj : Module.Platform.CI.Config,
	
    defaultView : 'Module.Platform.CI.view.Grid',
	
    supportView :['Module.Platform.CI.view.Grid', 'Module.Platform.CI.view.ContactLogEdit'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildCIOptMenu : function () {

		var menu = Ext.create('Ext.menu.Menu', {

			name : 'useroperation',
			style: {
				overflow: 'visible'     // For the Combo popup
			},
			items: [
				{
					text: "新建客户信息",
					disabled:false,
					name : 'addCI',
					iconCls : 'x-add-icon'
				}, {
					text: "修改客户信息",
					disabled:true,
					name : 'modifyCI',
					iconCls : 'update'
				}, {
					text: "删除客户信息",
					disabled:true,
					name : 'delCI',
					iconCls : 'x-del-icon'
				}, {
					text: "管理沟通记录",
					disabled:true,
					name : 'editCL',
					icon : '/img/icon/show.png'
				}, {
					text: "绑定服务商账户",
					disabled:true,
					name : 'bindingSO',
					icon : '/img/icon/port.png'
				}, {
					text: "服务商店铺详情",
					disabled:true,
					name : 'soDetail',
					icon : '/img/icon/monitor-info.png'
				}
			]

		});
		return menu;
	},

    initToolbar : function(){
		var me = this;
		var opt = Module.Platform.CI.Operation;
		var toolbar = this.callParent(arguments);
		var ciMenu = {
			    name : 'cioperation',
				text: "客户信息操作",
				iconCls: 'pool_setting',
				menu: this.buildCIOptMenu()
			};
		var backBtn = {
		    name : 'backpperation',
			text: "返回列表",
			iconCls: 'pool_setting',
			handler: function(){
				me.gotoView("Module.Platform.CI.view.Grid", {}, me);
			}
		};


		var addCuMenu = {
			text : "新建客户信息",
			name : 'addCuMenu',
			iconCls: 'x-add-icon',
			handler : function(){
				opt.doAddCI(null, function(){
					me.updateView(me);
				});
			}
		};

		toolbar.push(ciMenu);
		toolbar.push(addCuMenu);
		toolbar.push(backBtn);
		return toolbar;
	}
});