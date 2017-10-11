Ext.define('Module.YB.printBook.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.bookportlet',
	
	requires  : [
		'Module.YB.printBook.Operation',
		'Module.YB.printBook.Data',
		'Module.YB.printBook.store.PrintBookStore'
 	],
 		
 	VIEW : {
		'Module.YB.printBook.view.Grid' : LABEL.grid,
	},
    
	title: '书籍信息',
			
	icon : '/img/icon/printer.png',
	
	moduleName : 'Module.YB.printBook',
    
    moduleSessionView : 'Module.YB.printBookCurrentView',
    
    dataObj : Module.YB.printBook.Data,
    
    configObj : Module.YB.printBook.Config,
	
    defaultView : 'Module.YB.printBook.view.Grid',
	
    supportView :['Module.YB.printBook.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
     		
    initToolbar : function(){
    	var me = this;
    	var opt = Module.YB.printBook.Operation;
		var toolbar = this.callParent(arguments),
			userMenu = {
				text : "回收",
				iconCls : 'pool_setting',
				tooltip : '回收无效的打印书册资源',
				name : 'recycling',
				handler : function(){
					opt.onRecyclingClick(function(){
						me.updateView(me);
					});
				}
			};
		toolbar.push(userMenu);
		return toolbar;
    }
});
