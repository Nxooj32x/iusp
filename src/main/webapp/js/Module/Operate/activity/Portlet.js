Ext.define('Module.Operate.activity.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Operate.activity.Operation',
		'Module.Operate.activity.Data',
		'Module.Operate.activity.store.ActivityStore'
 	],
 		
 	VIEW : {
		'Module.Operate.activity.view.Grid' : LABEL.grid
	},
    
	title: ACTIVITY_LABEL.activityInfo,
			
	iconCls : 'md-voucher',
	
	moduleName : 'Module.Operate.activity',
    
    moduleSessionView : 'Module.Operate.activityCurrentView',
    
    dataObj : Module.Operate.activity.Data,
    
    configObj : Module.Operate.activity.Config,
	
    defaultView : 'Module.Operate.activity.view.Grid',
	
    supportView :['Module.Operate.activity.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	
	
	buildActivityOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'activityoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: ACTIVITY_LABEL.addActivity,
					disabled: false,
					name: 'addActivity',
					iconCls: 'x-add-icon'
				},{
	        		text: ACTIVITY_LABEL.delActivity,
					disabled: true,
					name: 'delActivity',
					iconCls: 'x-del-icon'
				},{
	        		text: ACTIVITY_LABEL.editActivity,
					disabled: true,
					name: 'editActivity',
					iconCls: 'extensive-edit'
				},{
	        		text: ACTIVITY_LABEL.openActivity,
					disabled: true,
					name: 'openActivity',
					iconCls: 'extensive-edit'
				},{
	        		text: ACTIVITY_LABEL.closeActivity,
					disabled: true,
					name: 'closeActivity',
					iconCls: 'extensive-edit'
				},{
	        		text: ACTIVITY_LABEL.activityJoinInfo,
					disabled: true,
					name: 'showActivityJoinInfo',
					iconCls: 'view'
				}]
	    });
		return menu;
    },
	 		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		activityMenu = {
			text: ACTIVITY_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildActivityOptMenu()
		};
		toolbar.push(activityMenu);
		return toolbar;
    }
});