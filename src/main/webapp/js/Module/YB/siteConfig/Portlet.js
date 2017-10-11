Ext.define('Module.YB.siteConfig.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.bookportlet',
	
	requires  : [
		'Module.YB.siteConfig.Operation',
		'Module.YB.siteConfig.Data'
 	],
 		
 	VIEW : {
		'Module.YB.siteConfig.view.Grid' : "页面静态化",
		'Module.YB.siteConfig.view.SEOGrid' : "SEO配置"
	},
    
	title: '网站配置 ',
			
	icon : '/img/icon/advancedsettings.png',
	
	moduleName : 'Module.YB.siteConfig',
    
    moduleSessionView : 'Module.YB.siteConfigCurrentView',
    
    dataObj : Module.YB.siteConfig.Data,
    
    configObj : Module.YB.siteConfig.Config,
	
    defaultView : 'Module.YB.siteConfig.view.Grid',
	
    supportView :['Module.YB.siteConfig.view.Grid', 'Module.YB.siteConfig.view.SEOGrid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
     	
	syncGlobalConfig : function() {
    	var button = new Ext.Button({
    		iconCls : 'update',
    		text: "同步配置",
			width: 80,
			handler: function(){
				var configUrl = '/sync/all';
				Soul.Ajax.restAction(configUrl, 'post', {'fetch' : 'True'}, 
					{'fetch' : 'True'}, function(){}, null, null);
			}
		});
		return button;
    },
	
    initToolbar : function(){
    	var me = this;
		var toolbar = me.callParent(arguments);
		toolbar[0].text = "配置内容";
		toolbar.push(this.syncGlobalConfig());
		return toolbar;
    }
});
