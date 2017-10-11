Ext.define('Module.Template.page.view.Grid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.ptplgrid',

	requires : [ 'Soul.util.RendererUtil', 'Soul.util.GridRendererUtil',
			'Module.Template.page.Data', 'Module.Template.page.Renderer',
			'Soul.util.ObjectView', 'Soul.ux.grid.feature.Searching',
			'Soul.ux.grid.column.ComboColumn','Module.Template.page.store.CoverPtplStore', 'Module.Template.page.store.BackCoverPtplStore', 'Module.Template.page.Tools', 'Module.Template.page.Config', 'Module.Template.page.Operation' ],

	checkIndexes : [ 'type', 'status' ], // 默认选择的列

	disableIndexes : [ 'opt', 'view' ],

	initComponent : function() {
		var me = this;
		var columns = new Array();
		var dict = Module.Template.page.Config;
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit : 2
		});
		
		columns.push(new Ext.grid.RowNumberer({
			editor : false
		}), {
			text : "名称",
			sortable : true,
			menuDisabled : false,
			dataIndex : 'name',
			editor : {
				allowBlank : false,
				regex : /^[^\s]*$/,
				regexText : '不能包含空格'
			}
		}, {
			text : "页面类型",
			width : 60,
			xtype : 'combocolumn',
			searchType : 'combo',
			sortable : true,
			editor : false,
			dataIndex : 'type',
			comboData : dict.COMBO_CFG.type
		}, {
			text : "编码",
			width : 40,
			searchType : 'number',
			sortable : true,
			dataIndex : 'code',
			editor : {
				xtype : 'numberfield',
				allowBlank : false
			}
		}, {
			xtype : 'actioncolumn',
			width : 30,
			dataIndex : 'view',
			editor : false,
			align : 'center',
			items : [ {
				icon : '/img/icon/reboot.png',
				tooltip : '编译',
				name : 'view',
				scope : this,
				handler : this.onCompileClick,
				isDisabled : function(v, r, c, item, r) {
					if (r.get('status') == 3)
						return true;
					else
						return false;
				}
			}]
		}, {
			xtype : 'actioncolumn',
			width : 30,
			dataIndex : 'view',
			editor : false,
			align : 'center',
			items : [ {
				icon : '/img/icon/view.png',
				tooltip : '预览模板',
				name : 'view',
				scope : this,
				handler : this.onViewClick,
				isDisabled : function(v, r, c, item, r) {
					if (r.get('status') == 3)
						return true;
					else
						return false;
				}
			}]
		}, {
			xtype : 'actioncolumn',
			width : 30,
			dataIndex : 'info',
			editor : false,
			align : 'center',
			items : [ {
				icon : '/img/icon/monitor-info.png',
				tooltip : '模板属性',
				name : 'property',
				scope : this,
				handler : function(v, row, c, item, e, r){
					if (r != null) {
						Module.Template.page.Tools.showPtplViewAndProInEast(r.data); 
					}
				},
				isDisabled : function(v, row, c, item, r) {
					if (r.get('status') == 3)
						return true;
					else
						return false;
				}
			} ]
		}, {
			xtype : 'actioncolumn',
			width : 30,
			dataIndex : 'view',
			editor : false,
			align : 'center',
			items : [ {
				icon : '/img/icon/del.png',
				tooltip : '删除模板',
				name : 'delete',
				scope : this,
				handler : this.onRemoveClick,
				isDisabled : function(v, r, c, item, r) {
					if (r.get('status') == 3)
						return false;
					else
						return true;
				}
			} ]
		}, {
			text : "描述",
			width : 100,
			dataIndex : 'desc',
			editor : {
				allowBlank : false,
				regex : /^[^\s]*$/,
				regexText : '不能包含空格'
			}
		}, {
			text : "状态",
			width : 60,
			xtype : 'combocolumn',
			searchType : 'combo',
			dataIndex : 'status',
			comboData : dict.COMBO_CFG.status,
			editor : {
				xtype : 'combo',
				name : 'status',
				queryMode : 'local',
				store : dict.COMBO_CFG.statusEdit,
				editable : false,
				allowBlank : false,
				triggerAction : 'all'
			}
		}, {
			text : "编辑时间",
			width : 200,
//			xtype : 'datecolumn',
			renderer : function(val){
				val = new Date(val);
				return Soul.util.RendererUtil.getTimeStr(val);
			},
			searchType : 'date',
			dataIndex : 'etime'
		}, {
			text : "图片数",
			width : 60,
			searchType : 'number',
			sortable : true,
			hidden : true,
			dataIndex : 'imageNum'
		}, {
			text : "文本框",
			width : 60,
			searchType : 'number',
			sortable : true,
			hidden : true,
			dataIndex : 'textNum'
		}, {
			text : "左右一致",
			width : 60,
			searchType : 'boolean',
			dataIndex : 'lrSame',
			xtype : 'booleancolumn',
			hidden : true,
			trueText : '一致',
			falseText : '不同'

		}, {
			text : "对页模式",
			width : 60,
			xtype : 'combocolumn',
			dataIndex : 'dbMode',
			searchType : 'combo',
			hidden : true,
			comboData : dict.COMBO_CFG.dbMode,
			editor : {
				xtype : 'combo',
				name : 'dbMode',
				queryMode : 'local',
				store : dict.COMBO_CFG.dbMode,
				editable : false,
				allowBlank : false,
				triggerAction : 'all'
			}
		}, {
			text : "必须成对出现",
			xtype : 'checkcolumn',
			width : 80,
			searchType : 'number',
			hidden : true,
			dataIndex : 'needTwo'
		}, {
			text : "使用次数",
			width : 60,
			searchType : 'number',
			sortable : true,
			dataIndex : 'usedNum'
		}, {
			text : "主风格",
			width : 150,
			flex : 1,
			dataIndex : 'majorStyle',
			editor : {
				allowBlank : false,
				regex : /^[^\s]*$/,
				regexText : '不能包含空格'
			}
		}, {
			text : "辅助风格",
			width : 150,
			dataIndex : 'minorStyle',
			editor : {
				allowBlank : false,
				regex : /^[^\s]*$/,
				regexText : '不能包含空格'
			}
		}, {
			text : "主颜色",
			width : 150,
			flex : 1,
			dataIndex : 'majorColor',
			editor : {
				allowBlank : false,
				regex : /^[^\s]*$/,
				regexText : '不能包含空格'
			}
		}, {
			text : "辅助颜色",
			width : 150,
			dataIndex : 'minorColor',
			editor : {
				allowBlank : false,
				regex : /^[^\s]*$/,
				regexText : '不能包含空格'
			}
		}, {
			text : "标签",
			width : 150,
			flex : 1,
			dataIndex : 'tag',
			editor : {
				allowBlank : false,
				regex : /^[^\s]*$/,
				regexText : '不能包含空格'
			}
		}, {
			text : "目录条目",
			width : 30,
			searchType : 'number',
			hidden : true,
			dataIndex : 'catalogItemNum'
		}, {
			text : "对应封面编码",
			width : 100,
			dataIndex : 'coverCode',
			hidden : true,
			searchType : 'combo',
			comboCfg : {
	            store: Ext.data.StoreManager
				.lookup("Module.Template.page.store.CoverPtplStore"),
				displayField: 'name',
	            valueField : 'code',
	            anchor: '100%',
	            width : 250,
	            listConfig: {
	                // Custom rendering template for each item
	                getInnerTpl: function() {
	                    return '<img height="150" src="/pageTplRes/{type}/{code}/img/thumbnail/left.jpg" /><strong>{name}</strong>';
	                }
	            },
	            pageSize: 10
			},
			editor : {
				/*fieldLabel : '封面',*/
				xtype : 'combo',
	            store: Ext.data.StoreManager
				.lookup("Module.Template.page.store.CoverPtplStore"),
	            displayField: 'name',
	            valueField : 'code',
	            anchor: '100%',
	            width : 250,
	            listConfig: {
	                // Custom rendering template for each item
	                getInnerTpl: function() {
	                    return '<img height="150" src="/pageTplRes/{type}/{code}/img/thumbnail/left.jpg" /><strong>{name}</strong>';
	                }
	            },
	            pageSize: 10
	        }
		});

		var sm = new Ext.selection.CheckboxModel({
			listeners : {
				selectionchange : function(sm2) {
					//处理顶栏模板菜单
					me.portlet.executeOptMenu(this.getSelection(), me.portlet);
				}
			}
		});

		Ext.apply(this, {
			store : Ext.data.StoreManager
					.lookup("Module.Template.page.store.PtplStore"),
			selModel : sm,
			viewConfig : {
				emptyText : "没有书页模板"
			},
			plugins : [ this.cellEditing ],
			columns : {
				items : columns,
				defaults : {
					searchType : 'string',
					sortable : false,
					menuDisabled : true,
					align : 'center'
				}
			}
		});
		this.callParent(arguments);
	},

	onViewClick : function(view, rowIndex, colIndex, item, e, r, row) {
		var me = this;
		me.portlet.gotoView("Module.Template.page.view.SingleView", {pageTpl : r.data}, me.portlet);
	},

	onCompileClick : function(view, rowIndex, colIndex, item, e, r, row) {
		var me = this;

		var compileUrl = "/api/tpl/page/" + r.get("id") + "/" + "compile";
		Soul.Ajax.request({
			url : compileUrl,
			method : 'put',
			timeout : 1000 * 60 * 20,
			loadMask : true,
			loadMsg : '编译css',
			successMsg : '编译成功',
			success : function(response, opts) {
				//window.open(downloadUrl);
				me.updateView(me);
			}
		});
	},

	onRemoveClick : function(grid, rowIndex) {
		this.getStore().removeAt(rowIndex);
	},

	saveMask : new Ext.LoadMask(Ext.getBody(), {
		msg : "同步中"
	}),

	onSaveClick : function(btn) {
		var me = this;
		btn.disable();
		this.getStore().sync({
			callback : function() {
				me.saveMask.hide();
				me.updateView(me);
			}
		});
	},

	afterRender : function() {
		var me = this;
		me.callParent(arguments);
		var saveBtplItem = me.portlet.down('button[name=updatePtpl]');
		me.getStore().on({
			add : function() {
				saveBtplItem.enable();
			},
			update : function() {
				saveBtplItem.enable();
			},
			datachanged : function() {
				saveBtplItem.enable();
			},
			remove : function() {
				saveBtplItem.enable();
			},
			write : function() {
				saveBtplItem.disable();
			},
			
			load : function() {
				saveBtplItem.disable();
			},
			beforesync : function() {
				me.saveMask.show();
			},
		});
		saveBtplItem.on('click', me.onSaveClick, me, saveBtplItem);
		
		me.contextMenu = me.portlet.contextMenu;
	},

	updateView : function(scope) {
		var me = scope || this;
		me.pagingBar.doRefresh();
	}

});
