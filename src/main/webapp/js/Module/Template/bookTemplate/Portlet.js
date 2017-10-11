Ext.define('Module.Template.bookTemplate.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.btplportlet',
	
	requires  : [
		'Module.Template.bookTemplate.Data',
		'Module.Template.bookTemplate.store.BtplStore'
 	],
 		
 	VIEW : {
		'Module.Template.bookTemplate.view.Grid' : LABEL.grid,
		'Module.Template.bookTemplate.view.EditView' : '编辑模式'
	},
    
	title: BTPL_LABEL.title,
			
	icon : '/img/icon/btpl.png',
	
	moduleName : 'Module.Template.bookTemplate',
    
    moduleSessionView : 'Module.Template.bookTemplateCurrentView',
    
    dataObj : Module.Template.bookTemplate.Data,
    
    configObj : Module.Template.bookTemplate.Config,
	
    defaultView : 'Module.Template.bookTemplate.view.Grid',
	
    supportView :['Module.Template.bookTemplate.view.Grid', 'Module.Template.bookTemplate.view.EditView'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
	
	buildBookTplOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'useroperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
				text: "新建模板",
				disabled:false,
				name : 'createBtpl',
				iconCls : 'add'
			}]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			addBtn = {
	            text: "添加模板",
	            iconCls: 'pool_setting', 
	            name : 'createBtpl'
	        },
			saveBtn = {
	            text: "保存修改",
	            iconCls: 'save', 
	            disabled: true,
	            name : 'updateBtpl'
	        },
			copyBtn = {
	            text: "复制模板",
	            iconCls: 'save', 
	            disabled: true,
	            name : 'copyBtpl'
	        };
		updateBookDataPoolBtn = {
			text: "更新模板数据池",
			iconCls: 'update',
			disabled: false,
			name : 'updateBookDataPool'
		};
		bookTplThumbnailUpdateBtn = {
			text: "更新模板缩略图",
			iconCls: 'update',
			disabled: false,
			name : 'bookTplThumbnailUpdate'
		};

		toolbar.push(addBtn);
		toolbar.push(saveBtn);
		toolbar.push(copyBtn);
		toolbar.push(updateBookDataPoolBtn);
		toolbar.push(bookTplThumbnailUpdateBtn);
		return toolbar;
    }
});




