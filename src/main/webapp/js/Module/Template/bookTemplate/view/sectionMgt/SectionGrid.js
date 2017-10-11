Ext.define('Module.Template.bookTemplate.view.sectionMgt.SectionGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.btplsectiongrid',

	uses : 'Ext.data.Store',

	requires : ['Soul.util.RendererUtil', 'Soul.ux.grid.column.ComboColumn'],

	btpl : {},
	
	initComponent : function() {
		var me = this;
		var dict = Module.Template.bookTemplate.Config;
		
		me.store = Ext.create('Module.Template.bookTemplate.store.BtplSectionStore', {
			proxy : {
				type : 'rest',
		        headers : {
		        	"Content-Type": "application/json; charset=utf-8", 
		        	Accept : 'application/json'
		        },
		        extraParams : {
		        	filter : {}
		        },
		        api: {
		        	read: '/api/bps/' + me.btpl.id + '/section/',
		        	update : '/api//bps/' + me.btpl.id + '/section/',
		        },
		        reader: {
		            type: 'json',
		        },
		        listeners:{
		            exception:function( theproxy, response, operation, options ){
		            	Soul.util.MessageUtil.parseResponse(response);
		            }
		        }
			},
			autoLoad : true
		});
		
		var columns = new Array();
		
		columns.push(new Ext.grid.RowNumberer({
			text : '位置',
			align : 'center',
			width : 40
		}),{
			text : "类型",
			width : 100,
			dataIndex : 'type',
			xtype : 'combocolumn',
			comboData : dict.COMBO_CFG.sectionType,
			renderer : function(val, u,r, rowIndex, columnIndex, s){
				var cd = dict.COMBO_CFG.sectionType;
				Ext.each(cd, function(d, i, ds) {
					if (val == d[0]) {
						val = d[1];
						return false;
					}
				});
				return val;
			}
		}, {
			text : "名称",
			dataIndex : 'name'
		}, {
			xtype : 'actioncolumn',
			width : 40,
			text : "配置",
			dataIndex : 'view',
			align : 'center',
			items : [ {
				icon : '/img/icon/setup.png',
				tooltip : '配置章节',
				name : 'view',
				scope : this,
				handler : this.onSetupClick,
				isDisabled : function(v, r, c, item, r) {
					/*if (r.get('status') == 3)
						return true;
					else
						return false;*/
				}
			}]
		}, {
			text : "描述",
			sortable : true,
			flex : 1,
			dataIndex : 'desc'
		}, {
			text : "在目录中显示",
			dataIndex : 'showInCatalog',
			renderer : function(val, m, rec){
				return Soul.util.RendererUtil.getBoolean(val);
			}
		}, {
			text : "默认模板",
			width : 80,
			dataIndex : 'defaultPageTpl',
			renderer : function(val){
				if (val)
					return val.name;
			}
		}, {
			text : "页面数目",
			width : 80,
			dataIndex : 'pageNum'
		}, {
			text : "章节开始页码",
			width : 80,
			sortable : true,
			dataIndex : 'beginPagination'
		}, {
			xtype : 'actioncolumn',
			width : 30,
			dataIndex : 'view',
			align : 'center',
			items : [ {
				icon : '/img/icon/delete.png',
				tooltip : '删除章节',
				name : 'view',
				scope : this,
				handler : this.onRemoveClick,
				isDisabled : function(v, r, c, item, r) {
					/*if (r.get('status') == 3)
						return true;
					else
						return false;*/
				}
			}]
		});
		Ext.apply(this, {
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
		Module.Template.bookTemplate.Operation.onModifySectionClick(me.btpl.id, r.data, function(){
			me.getStore().load();
		});
	},
	
	onRemoveClick : function(view, rowIndex, colIndex, item, e, r, row){
		var me = this;
		Soul.Ajax.request({
			url : '/api/bps/' + me.btpl.id + '/section/' + r.data.id + "?force=true" ,
			method : 'delete',
			confirm : '确认要删除章节吗?',
			headers : {
				Accept : 'application/json'
			},
			success : function(){
				me.getStore().load();
			}
		});
	},
	
	saveMask : new Ext.LoadMask(Ext.getBody(), {
		msg : "同步中"
	}),
	
	onSaveClick : function(btn) {
		var me = this;
		var rs = this.store.getRange();
		var idArray = [];
		
		Ext.each(rs, function(r){
			idArray.push(r.data.id);
		});
		Soul.Ajax.request({
			url : '/api/bps/' + me.btpl.id + '/section/' ,
			method : 'put',
			jsonData : idArray,
			headers : {
				Accept : 'application/json'
			},
			success : function(){
				me.getStore().load();
			}
		});
	},
	
	afterRender : function() {
		var me = this;
		me.callParent(arguments);
		var saveBtplItem = me.up('btplportlet').down('button[name=updateBtpl]');
		
		
		me.getStore().on({
			update : function() {
				saveBtplItem.enable();
			},
			datachanged : function() {
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
		
		saveBtplItem.setHandler(function(){
			me.onSaveClick(saveBtplItem);
		});
	}
});
