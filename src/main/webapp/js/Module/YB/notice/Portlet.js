Ext.define('Module.YB.notice.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.noticeportlet',
	
	requires  : [
		'Module.YB.notice.Operation',
		'Module.YB.notice.Data',
		'Module.YB.notice.store.NoticeStore'
	],
		
	VIEW : {
		'Module.YB.notice.view.Grid' : LABEL.grid
	},
	
	title:'公告管理',

	iconCls : 'md-user',
	
	moduleName : 'Module.YB.notice',
	
	moduleSessionView : 'Module.YB.noticeCurrentView',
	
	dataObj : Module.YB.notice.Data,
	
	configObj : Module.YB.notice.Config,
	
	defaultView : 'Module.YB.notice.view.Grid',
	
	supportView :['Module.YB.notice.view.Grid'],
	
	havUpdateButton : false,
	
	initComponent : function() {
		this.callParent(arguments);
	},

	buildNoticerOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'noticeOperation',
			style: {
				overflow: 'visible'     // For the Combo popup
			},
			items: [{
				text: '创建首页置顶公告',
				disabled: false,
				name: 'addTopNotice',
				iconCls: 'x-add-icon'
			},{
				text: '创建功能更新公告',
				disabled: false,
				name: 'addPopNotice',
				iconCls: 'x-add-icon'
			}]
		});
		return menu;
	},


    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			noticeEditMenu = {
				text : "编辑",
				iconCls : 'pool_setting',
				name : 'editnotice',
				disabled: true
			},noticeAddMenu = {
			text: '添加公告',
			iconCls: 'pool_setting',
			menu: this.buildNoticerOptMenu()
		};
		toolbar.push(noticeEditMenu);
		toolbar.push(noticeAddMenu);
		return toolbar;
		
    }
});