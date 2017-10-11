Ext.define('Module.Operate.isay.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Operate.isay.Operation',
		'Module.Operate.isay.Data',
		'Module.Operate.isay.store.ISayTopicStore'
 	],
 		
 	VIEW : {
		'Module.Operate.isay.view.Grid' : LABEL.grid
	},
    
	title: ARTICLE_LABEL.articleInfo,
			
	iconCls : 'md-voucher',
	
	moduleName : 'Module.Operate.isay',
    
    moduleSessionView : 'Module.Operate.isayCurrentView',
    
    dataObj : Module.Operate.isay.Data,
    
    configObj : Module.Operate.isay.Config,
	
    defaultView : 'Module.Operate.isay.view.Grid',
	
    supportView :['Module.Operate.isay.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildIsayOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'isayoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: ISAY_TOPIC_LABEL.show,
					disabled: false,
					name: 'show',
					iconCls: 'x-view-icon'
				}]
	    });
		return menu;
    },
	 		
    
    importIsayData : function() {
    	var button = new Ext.Button({
    		iconCls : 'update',
    		text: "导入",
			width: 100,
			handler: function(){
				var configUrl = '/sync/tag';
				Soul.Ajax.restAction(configUrl, 'post', {'fetch' : 'True'}, 
					{'fetch' : 'True'}, function(){
					  var handleStaticUrl = '/handleStatic/';			   
						Soul.Ajax.restAction(handleStaticUrl, 'post', {'path' : 'all'}, 
								{'fetch' : 'True'}, function(){
								}, null, null);
					}, null, null);
			}
		});
		return button;
    },
    
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
		ISayMenu = {
			text: "操作",
			iconCls: 'pool_setting',
			menu: this.buildIsayOptMenu()
		};
		toolbar.push(ISayMenu);
		toolbar.push(this.importIsayData());
		return toolbar;
    }
});