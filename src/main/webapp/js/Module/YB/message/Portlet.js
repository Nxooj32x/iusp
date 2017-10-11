Ext.define('Module.YB.message.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.messageportlet',
	
	requires  : [
		'Module.YB.message.Operation',
		'Module.YB.message.Data',
		'Module.YB.message.store.MessageStore'
	],
		
	VIEW : {
		'Module.YB.message.view.Grid' : LABEL.grid
	},
	
	title: MESSAGE_LABEL.title,

	iconCls : 'md-user',
	
	moduleName : 'Module.YB.message',
	
	moduleSessionView : 'Module.YB.messageCurrentView',
	
	dataObj : Module.YB.message.Data,
	
	configObj : Module.YB.message.Config,
	
	defaultView : 'Module.YB.message.view.Grid',
	
	supportView :['Module.YB.message.view.Grid'],
	
	havUpdateButton : false,
	
	initComponent : function() {
		this.callParent(arguments);
	},
	buildMessageOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'messageoperation',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: MESSAGE_LABEL.addMessage,
					disabled: false,
					name: 'addMessage',
					iconCls: 'x-add-icon'
				},{
					text: MESSAGE_LABEL.addMessageToAll,
					disabled: false,
					name: 'addMessageToAll',
					iconCls: 'x-add-icon'
				}]
		});
		return menu;
	},
	initToolbar : function(){
		var toolbar = this.callParent(arguments);
		var messageMenu = {
			text: MESSAGE_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildMessageOptMenu()
		};
		toolbar.push(messageMenu);
		return toolbar;
	}
});