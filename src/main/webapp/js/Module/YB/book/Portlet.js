Ext.define('Module.YB.book.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.bookportlet',
	
	requires  : [
		'Module.YB.book.Operation',
		'Module.YB.book.Data',
		'Module.YB.book.store.BookStore'
 	],
 		
 	VIEW : {
		'Module.YB.book.view.Grid' : LABEL.grid,
	},
    
	title: '书籍信息',
			
	icon : '/img/icon/btpl.png',
	
	moduleName : 'Module.YB.book',
    
    moduleSessionView : 'Module.YB.bookCurrentView',
    
    dataObj : Module.YB.book.Data,
    
    configObj : Module.YB.book.Config,
	
    defaultView : 'Module.YB.book.view.Grid',
	
    supportView :['Module.YB.book.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
     		
    initToolbar : function(){
    	var me = this;
    	var opt = Module.YB.book.Operation;
		var toolbar = this.callParent(arguments),
			userMenu = {
				text : "回收书册",
				iconCls : 'pool_setting',
				name : 'recycling',
				handler : function(){
					opt.onRecyclingClick(function(){
						me.updateView(me);
					});
				}
			};
			transformMenu = {
				text : "生成模板",
				iconCls : 'pool_setting',
				name : 'transformbtn'
			};
		toolbar.push(userMenu);
		toolbar.push(transformMenu);
		return toolbar;
    },
	buildOrderOptRightMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'bookoperation',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: BOOK_LABEL.recover,
					disabled: false,
					name: 'bookrecover',
					iconCls: 'x-add-icon'
				}]
		});
		return menu;
	}
});
