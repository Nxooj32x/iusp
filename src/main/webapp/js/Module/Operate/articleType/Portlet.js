Ext.define('Module.Operate.articleType.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Operate.articleType.Operation',
		'Module.Operate.articleType.Data',
		'Module.Operate.articleType.store.ArticleTypeStore'
 	],
 		
 	VIEW : {
		'Module.Operate.articleType.view.Grid' : LABEL.grid
	},
    
	title: ARTICLE_LABEL.articleInfo,
			
	iconCls : 'md-voucher',
	
	moduleName : 'Module.Operate.articleType',
    
    moduleSessionView : 'Module.Operate.articleTypeCurrentView',
    
    dataObj : Module.Operate.articleType.Data,
    
    configObj : Module.Operate.articleType.Config,
	
    defaultView : 'Module.Operate.articleType.view.Grid',
	
    supportView :['Module.Operate.articleType.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
    
	
	
	buildArticleOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'articleOperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: ARTICLE_LABEL.addArticle,
					disabled: false,
					name: 'addArticle',
					iconCls: 'x-add-icon'
				},{
	        		text: ARTICLE_LABEL.delArticle,
					disabled: true,
					name: 'delArticle',
					iconCls: 'x-del-icon'				
				},{
	        		text: ARTICLE_LABEL.editArticle,
					disabled: true,
					name: 'editArticle',
					iconCls: 'extensive-edit'
				},{
	        		text: ARTICLE_LABEL.openArticle,
					disabled: true,
					name: 'openArticle',
					iconCls: 'extensive-edit'
				},{
	        		text: ARTICLE_LABEL.closeArticle,
					disabled: true,
					name: 'closeArticle',
					iconCls: 'extensive-edit'
				}]
	    });
		return menu;
    },
	
    syncGlobalConfig : function() {
    	var button = new Ext.Button({
    		iconCls : 'update',
    		text: "同步标签配置",
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
		articleMenu = {
			text: ARTICLE_LABEL.operation,
			iconCls: 'pool_setting',
			menu: this.buildArticleOptMenu()
		};
		toolbar.push(articleMenu);
		toolbar.push(this.syncGlobalConfig());
		return toolbar;
    }
});