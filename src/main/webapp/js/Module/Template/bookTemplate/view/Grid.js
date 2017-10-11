Ext.define('Module.Template.bookTemplate.view.Grid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.bptlgrid',

	requires : [ 'Soul.util.RendererUtil', 'Soul.util.GridRendererUtil',
			'Module.Template.bookTemplate.Data',
			'Module.Template.bookTemplate.Renderer',
			'Soul.ux.grid.column.ComboColumn',
			'Module.Template.bookTemplate.Operation'],

	checkIndexes : [ 'tplType', 'status' ], // 默认选择的列

	initComponent : function() {
		var columns = new Array();
		var dict = Module.Template.bookTemplate.Data;
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit : 1
		});
		
		this.opt = Module.Template.bookTemplate.Operation;

		columns.push(new Ext.grid.RowNumberer(), {
			text : "模板类型",
			width : 100,
			xtype : 'combocolumn',
			searchType : 'combo',
			sortable : true,
			dataIndex : 'tplType',
			comboData : dict.typeCombo,
			editor : {
				xtype : 'combo',
				name : 'tplType',
				queryMode : 'local',
				store : dict.typeCombo,
				editable : false,
				allowBlank : false,
				triggerAction : 'all'
			}
		}, {
			text : "名称",
			sortable : true,
			dataIndex : 'name',
			editor : {
				allowBlank : false
			}
		},  {
			text : "配置",
			xtype : 'actioncolumn',
			width : 40,
			sortable : false,
			menuDisabled : true,
			items : [ {
				icon : '/img/icon/setup.png',
				tooltip : '配置模板',
				scope : this,
				handler : this.onSetupClick
			} ]
		}, {
			text : "描述",
			width : 200,
			dataIndex : 'desc',
			editor : {
				allowBlank : false
			}
		}, {
			text : "风格",
			width : 200,
			dataIndex : 'style',
			flex : 1,
			editor : {
				allowBlank : false
			}
		},{
			text : "标签",
				width : 200,
				dataIndex : 'tag',
				flex : 1,
				editor : {
				allowBlank : true
			}
		}, {
			text : "状态",
			width : 60,
			dataIndex : 'status',
			xtype : 'combocolumn',
			searchType : 'combo',
			comboData : dict.statusCombo,
			editor : {
				xtype : 'combo',
				name : 'status',
				queryMode : 'local',
				store : dict.statusCombo,
				editable : false,
				allowBlank : false,
				triggerAction : 'all'
			}
		}, {
			text : "使用个数",
			width : 100,
			/*xtype : 'numberfield',*/
			searchType : 'number',
			dataIndex : 'usedNum',
			editor : {
				allowBlank : false
			}
		}, {
			text : "人气数目",
			width : 100,
			/*xtype : 'numberfield',*/
			searchType : 'number',
			dataIndex : 'popularityNum',
			editor : {
				allowBlank : false
			}
		}, {
			text : "好评数目",
			width : 100,
			/*xtype : 'numberfield',*/
			searchType : 'number',
			dataIndex : 'sayGoodNum',
			editor : {
				allowBlank : false
			}
		}, {
			text : "操作",
			xtype : 'actioncolumn',
			width : 30,
			sortable : false,
			menuDisabled : true,
			items : [ {
				icon : '/img/icon/del.png',
				tooltip : '删除模板',
				scope : this,
				handler : this.onRemoveClick
			} ]
		});
		var sm = new Ext.selection.CheckboxModel({
			listeners : {
				selectionchange : function(sm2) {
				}
			}
		});
		Ext.apply(this, {
			store : Ext.data.StoreManager
					.lookup("Module.Template.bookTemplate.store.BtplStore"),
			selModel : sm,
			viewConfig : {
				emptyText : "没有书册模板"
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

	onSetupClick : function(view, rowIndex, colIndex, item, e, r, row){
		var me = this;
		me.portlet.gotoView("Module.Template.bookTemplate.view.EditView", {btpl : r.data}, me.portlet);
	},
	
	onRemoveClick : function(grid, rowIndex) {
		this.getStore().removeAt(rowIndex);
	},

	onAddClick : function() {

		var bptl = Ext.create('Module.Template.bookTemplate.model.BtplModel', {
			name : "模板名称",
			desc : "模板描述",
			status : 0,
			tplType : 'ZPS',
			type : 'TPL',
			style : ''
		});
		this.getStore().insert(0, bptl);
		this.cellEditing.startEditByPosition({
			row : 0,
			column : 2
		});
	},

	onSaveClick : function(btn) {
		var me = this;
		this.getStore().sync({
			callback : function() {
				me.saveMask.hide();
				me.updateView(me);
			}
		});
	},
	
	onCopyClick : function(btn) {
		var me = this;
		var selected = me.getSelectionModel().getSelection(); 
		if (selected.length > 1) {
			Soul.uiModule.Message.msg("","只能 选择一个模板进行复制");
			return;
		} else if(selected.length == 0) {
			Soul.uiModule.Message.msg("","请选择模板");
			return;
		}
		console.log(selected[0].data);
		me.opt.onCopyBookClick(selected[0].data.id, function(){
			me.updateView(me);
		});
	},
	onStaticClick : function() {
		var me = this;
		var records = me.getSelectionModel().getSelection(); 
		if (records.length < 1) {
			Soul.uiModule.Message.msg("","请选择需要静态化的模板");
			return;
		}
		me.opt.onStaticBookClick(records, function(){
			me.updateView(me);
		});
	},

	afterRender : function() {
		var me = this;
		me.callParent(arguments);
		var createBtplItem = me.portlet.down('button[name=createBtpl]');
		var saveBtplItem = me.portlet.down('button[name=updateBtpl]');
		var copyBtplItem = me.portlet.down('button[name=copyBtpl]');

		var updateBookDataPoolItem = me.portlet.down('button[name=updateBookDataPool]');
		var bookTplThumbnailUpdateItem = me.portlet.down('button[name=bookTplThumbnailUpdate]');
		
		me.getStore().on('add', function(store, eOpts) {
			saveBtplItem.enable();
		});
		me.getStore().on('update', function(store, eOpts) {
			saveBtplItem.enable();
		});
		me.getStore().on('remove', function(store, eOpts) {
			saveBtplItem.enable();
		});
		me.getStore().on('write', function(store, eOpts) {
			saveBtplItem.disable();
		});
		me.saveMask = new Ext.LoadMask(Ext.getBody(), {
			msg : "保存中"
		});
		me.getStore().on('beforesync', function(){
			me.saveMask.show();
		});

		createBtplItem.enable();
		saveBtplItem.disable();	
		copyBtplItem.enable();
		
		createBtplItem.setHandler(function(){
			me.onAddClick();
		});
		saveBtplItem.setHandler(function(){
			me.onSaveClick(saveBtplItem);
		});
		copyBtplItem.setHandler(function(){
			me.onCopyClick(saveBtplItem);
		});

		updateBookDataPoolItem.setHandler(function(){
			me.opt.updateBookDataPoolClick(function(){
				me.updateView(me);
			});
		});

		bookTplThumbnailUpdateItem.setHandler(function(){

			var selected = me.getSelectionModel().getSelection();
			if (selected.length > 1) {
				Soul.uiModule.Message.msg("","只能 选择一个模板进行缩略图更新");
				return;
			} else if(selected.length == 0) {
				Soul.uiModule.Message.msg("","请选择模板");
				return;
			}
			me.opt.bookTplThumbnailUpdateClick(selected[0].data.id,function(){
				me.updateView(me);
			});
		});
	}

});
