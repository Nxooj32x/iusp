Ext.define('Module.Operate.vote.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Operate.vote.Operation',
		'Module.Operate.vote.Data',
		'Module.Operate.vote.store.VoteTopicStore'
 	],
 		
 	VIEW : {
		'Module.Operate.vote.view.Grid' : LABEL.grid
	},
    
	title: ARTICLE_LABEL.articleInfo,
			
	iconCls : 'md-voucher',
	
	moduleName : 'Module.Operate.vote',
    
    moduleSessionView : 'Module.Operate.voteCurrentView',
    
    dataObj : Module.Operate.vote.Data,
    
    configObj : Module.Operate.vote.Config,
	
    defaultView : 'Module.Operate.vote.view.Grid',
	
    supportView :['Module.Operate.vote.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildVoteOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'isayoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: VOTE_TOPIC_LABEL.show,
					disabled: false,
					name: 'show',
					iconCls: 'x-view-icon'
				}]
	    });
		return menu;
    },
	 		
    
    importVoteData : function() {
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
			menu: this.buildVoteOptMenu()
		};
		toolbar.push(ISayMenu);
		toolbar.push(this.importVoteData());
		return toolbar;
    }
});