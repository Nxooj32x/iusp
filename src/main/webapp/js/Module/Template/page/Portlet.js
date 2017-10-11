Ext.define('Module.Template.page.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.ptplportlet',

	requires : [ 'Module.Template.page.Data',
			'Module.Template.page.store.PtplStore',
			'Module.Template.page.Operation'],

	VIEW : {
		'Module.Template.page.view.Grid' : "编辑模式",
		'Module.Template.page.view.DataView' : '预览模式',
		'Module.Template.page.view.SingleView' : '模板详情'
	},

	title : "书页模板管理",

	iconCls : 'md-page',

	moduleName : 'Module.Template.page',

	moduleSessionView : 'Module.Template.pageCurrentView',

	dataObj : Module.Template.page.Data,

	configObj : Module.Template.page.Config,

	defaultView : 'Module.Template.page.view.DataView',

	supportView : [ 'Module.Template.page.view.Grid', 'Module.Template.page.view.DataView', 'Module.Template.page.view.SingleView' ],

	havUpdateButton : false,
	
	selected : [],

	initComponent : function() {
		this.initContextMenu();
		this.callParent(arguments);
	},

	addPtplOptMenu : function() {
		var me = this;
		var opt = Module.Template.page.Operation;
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'pageTplAtion',
			style : {
				overflow : 'visible' // For the Combo popup
			},
			items : [{
				text : "预览模式",
				name : 'viewTpl',
				iconCls : 'view',
				handler : function(){
					me.gotoView("Module.Template.page.view.SingleView", {pageTpl : me.selected[0].data}, me);
				}
			},{
				text : "修改属性",
				name : 'modifyAttr',
				iconCls : 'update',
				handler : function(){
					opt.onSetBaseAttrClick(me.selected, function(){
						me.updateView(me);
					});	
				}
			},{
				text : "修改状态",
				name : 'modifyStatus',
				iconCls : 'update',
				handler : function(){
					opt.onBatchModifyStatusClick(me.selected, function(){
						me.updateView(me);
					});	
				}
			}, {
				text : "设置关联封面",
				name : 'setCover',
				hidden : true,
				iconCls : 'update',
				handler : function(){
					opt.onSetCoverClick(me.selected, function(){
						me.updateView(me);
					});	
				}
			} , {
				text : "设置关联封底",
				name : 'setBackCover',
				hidden : true,
				iconCls : 'update',
				handler : function(){
					opt.onSetBackCoverClick(me.selected, function(){
						me.updateView(me);
					});	
				}
			}, {
				text : "删除",
				name : 'del',
				iconCls : 'delete',
				handler : function(){
					opt.onBatchRemoveClick(me.selected, function(){
						me.updateView(me);
					});	
				}
			} ]
		});
		return menu;
	},
	
	initContextMenu : function(scope){
		var me = scope ||this;
		me.contextMenu = this.addPtplOptMenu();
	},

	initToolbar : function() {
		var me = this;
		var opt = Module.Template.page.Operation;
		
		var toolbar = this.callParent(arguments), loadBtn = {
			text : "载入系统模板",
			iconCls : 'pool_setting',
			name : 'loadPtpl',
			handler : function(){
				opt.onLoadTplClick(function(){
					me.updateView(me);
				});	
			}
		}, saveBtn = {
			text : "保存修改",
			iconCls : 'save',
			disabled : true,
			name : 'updatePtpl'
		}, optMenu = {
			text : "模板操作",
			name : 'opt',
			hidden : true,
			iconCls : 'pool_setting',
			menu : this.addPtplOptMenu()
		};

		var exportPageBtn = {
			text : "导出模板",
			name : 'exportPage',
			hidden : false,
			iconCls : 'pool_setting',
			handler : function(){
				opt.onExportClick(function(){
					me.updateView(me);
				});
			}
		};

		var importPageBtn = {
			text : "导入模板",
			name : 'importPage',
			hidden : false,
			iconCls : 'pool_setting',
			handler : function(){
				opt.doAddImportFunction(function(){
					me.updateView(me);
				});
			}
		};

		toolbar.push(loadBtn);
		toolbar.push(optMenu);
		toolbar.push(saveBtn);
		toolbar.push(exportPageBtn);
		toolbar.push(importPageBtn);

		return toolbar;
	},
	
	
	executeOptMenu : function(selected, scope){
		var me = scope || this;
		me.selected = selected;
		var optMenu = me.down('button[name=opt]');
		var cxMenu = me.contextMenu;
		if (me.selected.length > 0) {
			optMenu.show();
			var canDel = true;
			Ext.each(me.selected, function(r, i, rs) {
				if (r.data.status != 3) {
					canDel = false;
					return false;
				}
			});
			if (canDel) {
				cxMenu.down('menuitem[name=del]').enable();
				optMenu.down('menuitem[name=del]').enable();
			} else {
				cxMenu.down('menuitem[name=del]').disable();
				optMenu.down('menuitem[name=del]').disable();
			}
		} else {
			optMenu.hide();
		}
	
		if (me.selected.length == 1) {
			cxMenu.down('menuitem[name=viewTpl]').enable();
			optMenu.down('menuitem[name=viewTpl]').enable();	
		} else {
			cxMenu.down('menuitem[name=viewTpl]').disable();
			optMenu.down('menuitem[name=viewTpl]').disable();
		}
		
		if (me.selected.length == 1) {
			cxMenu.down('menuitem[name=modifyAttr]').enable();
			optMenu.down('menuitem[name=modifyAttr]').enable();	
		} else {
			cxMenu.down('menuitem[name=modifyAttr]').disable();
			optMenu.down('menuitem[name=modifyAttr]').disable();
		}
		
		if (me.selected.length == 1 && me.selected[0].data.type == "BACK_COVER") {
			cxMenu.down('menuitem[name=setCover]').show();
			optMenu.down('menuitem[name=setCover]').show();
		} else {
			cxMenu.down('menuitem[name=setCover]').hide();
			optMenu.down('menuitem[name=setCover]').hide();
		}
		
		if (me.selected.length == 1 && me.selected[0].data.type == "COVER") {
			cxMenu.down('menuitem[name=setBackCover]').show();
			optMenu.down('menuitem[name=setBackCover]').show();	
		} else {
			cxMenu.down('menuitem[name=setBackCover]').hide();
			optMenu.down('menuitem[name=setBackCover]').hide();
		}
	},
	
	initUI : function(){
		var me = this;
		me.callParent(arguments);
		me.executeOptMenu([], me);
	},
	
	afterRender : function() {
		var me = this;
		me.callParent(arguments);
		
		//更新版本
		Soul.Ajax.request({
			url : "/api/tpl/page/repoVersion",
			parseFailure : false,
			method : 'get',
			success : function(response, opts) {
				console.log(response);
				me.setTitle("书页模板管理(版本:" + response.version + ")");
			}
		});
		
	}
});
