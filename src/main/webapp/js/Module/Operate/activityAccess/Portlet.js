Ext.define('Module.Operate.activityAccess.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Operate.activityAccess.Operation',
		'Module.Operate.activityAccess.Data',
		'Module.Operate.activityAccess.store.ActivityAccessStore'
 	],
 		
 	VIEW : {
		'Module.Operate.activityAccess.view.Grid' : LABEL.grid
	},
    
	title: ACTIVITYACCESS_LABEL.activityAccessInfo,
			
	iconCls : 'md-voucher',
	
	moduleName : 'Module.Operate.activityAccess',
    
    moduleSessionView : 'Module.Operate.activityAccessCurrentView',
    
    dataObj : Module.Operate.activityAccess.Data,
    
    configObj : Module.Operate.activityAccess.Config,
	
    defaultView : 'Module.Operate.activityAccess.view.Grid',
	
    supportView :['Module.Operate.activityAccess.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	
	
	buildActivityAccessOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'activityAccessoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: ACTIVITYACCESS_LABEL.addActivityAccess,
					disabled: false,
					name: 'addActivityAccess',
					iconCls: 'x-add-icon'
				},{
	        		text: ACTIVITYACCESS_LABEL.delActivityAccess,
					disabled: true,
					name: 'delActivityAccess',
					iconCls: 'extensive-edit'	
				},{
	        		text: ACTIVITYACCESS_LABEL.openActivityAccess,
					disabled: true,
					name: 'openActivityAccess',
					iconCls: 'extensive-edit'
				},{
	        		text: ACTIVITYACCESS_LABEL.closeActivityAccess,
					disabled: true,
					name: 'closeActivityAccess',
					iconCls: 'extensive-edit'
				}]
	    });
		return menu;
    },
	 		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		activityMenu = {
			text: ACTIVITY_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildActivityAccessOptMenu()
		};
		toolbar.push(activityMenu);
		return toolbar;
    }
});