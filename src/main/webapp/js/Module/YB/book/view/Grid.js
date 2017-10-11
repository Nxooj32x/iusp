Ext.define('Module.YB.book.view.Grid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.bookgrid',

	requires : [ 'Soul.util.RendererUtil', 'Soul.util.GridRendererUtil',
			'Module.YB.book.Data', 'Module.YB.book.Renderer',
			'Soul.util.ObjectView', 'Soul.ux.grid.feature.Searching',
			'Soul.ux.grid.column.ComboColumn', 'Module.YB.book.Tools', 'Module.YB.book.Config', 'Module.YB.book.Operation' ],

	checkIndexes : [ 'type', 'status', 'ctime', 'etime' ], // 默认选择的列

	disableIndexes : [ 'opt', 'view' ],

	initComponent : function() {
		var me=this;
		var columns = new Array();
		var dict = Module.YB.book.Config;

		columns.push(new Ext.grid.RowNumberer({
			editor : false
		}),{
			text : "书籍id",
			width : 100,
			sortable : true,
			menuDisabled : false,
			searchType : 'number',
			dataIndex : 'id'
		}, {
			text : "名称",
			width : 200,
			sortable : true,
			menuDisabled : false,
			dataIndex : 'name'
		}, {
			text : "创建者",
			width : 100,
			sortable : true,
			menuDisabled : false,
			dataIndex : 'createrId',
			searchType : 'number',
		}, {
			text : "书册类型",
			width : 80,
			xtype : 'combocolumn',
			searchType : 'combo',
			sortable : true,
			editor : false,
			dataIndex : 'type',
			comboData : dict.COMBO_CFG.type
		}, {
			text : "邀请码",
			width : 120,
			sortable : false,
			menuDisabled : false,
			dataIndex : 'identifyCode'
		}, {
			text : "状态",
			width : 60,
			xtype : 'combocolumn',
			searchType : 'combo',
			dataIndex : 'status',
			comboData : dict.COMBO_CFG.status
		}, {
			text : "创建时间",
			width : 200,
			sortable : true,
			renderer : function(val){
				val = new Date(val);
				return Soul.util.RendererUtil.getTimeStr(val);
			},
			searchType : 'date',
			dataIndex : 'ctime'
		}, {
			text : "编辑时间",
			width : 200,
			sortable : true,
			renderer : function(val){
				val = new Date(val);
				return Soul.util.RendererUtil.getTimeStr(val);
			},
			searchType : 'date',
			dataIndex : 'etime'
		}, {
			text : "完成状态",
			width : 80,
			sortable : true,
			renderer : function(val){
				return val.toFixed(2) * 100 + "%";
			},
			dataIndex : 'percent'
		}, {
			xtype : 'actioncolumn',
			width : 30,
			dataIndex : 'upPercent',
			editor : false,
			align : 'center',
			items : [ {
				icon : '/img/icon/update.png',
				tooltip : '更新完成状态',
				name : 'view',
				scope : this,
				handler : this.onUpPercentClick,
				isDisabled : function(v, r, c, item, r) {
				}
			}]
		}, {
			xtype : 'actioncolumn',
			width : 30,
			dataIndex : 'pdf',
			editor : false,
			align : 'center',
			items : [ {
				icon : '/img/icon32/filetype_pdf.png',
				tooltip : '查看预览',
				name : 'view',
				scope : this,
				handler : this.onPreviewClick,
				isDisabled : function(v, r, c, item, r) {
				}
			}]
		});
		 //右击事件
        me.contextMenu = me.portlet.buildOrderOptRightMenu();
        
		var sm = new Ext.selection.CheckboxModel({
			listeners : {
				selectionchange : function(sm2) {
					
                    var records = sm2.getSelection();
                    if(records.length>0){
	                    var status = records[0].data.status;
	                    
	                    var rightBookrecover = me.contextMenu.down('menuitem[name=bookrecover]');
	                    rightBookrecover.disable();
	                    
	                    if (status == Module.YB.book.model.BookModel.BOOK_STATE_DEL) {
	                    	rightBookrecover.enable();
	                    }else{
	                    	rightBookrecover.disable();
	                    }
                    }
				}
			}
		});

		Ext.apply(this, {
			store : Ext.data.StoreManager
					.lookup("Module.YB.book.store.BookStore"),
			selModel : sm,
			viewConfig : {
				emptyText : "没有书册 "
			},
			columns : {
				items : columns,
				defaults : {
					searchType : 'string',
					menuDisabled : true,
					align : 'center'
				}
			}
		});
		this.callParent(arguments);
	},

	afterRender : function() {
		var me = this;
		me.callParent(arguments);
		var sm = me.selModel;
		var callbackFn = function () {
            me.updateView(me);
        };
        
		var transformbtn = me.portlet.down('button[name=transformbtn]');
		transformbtn.setHandler(function(){
			me.onTransformpTPLClick();
		});
		//改变书籍状态
        var rightBookrecoverFunc = function () {
            var records = sm.getSelection();
            if (records.length == 1) {
            	Module.YB.book.Operation.changeBookStatus(records[0].get('id'),Module.YB.book.model.BookModel.BOOK_STATE_EDIT, callbackFn);
            }
        };
		var rightBookrecover = me.contextMenu.down('menuitem[name=bookrecover]');
		rightBookrecover.on('click', rightBookrecoverFunc);
	},

	updateView : function(scope) {
		var me = scope || this;
		me.pagingBar.doRefresh();
	},
	
	onUpPercentClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		var bookId = record.get("id");
		Soul.Ajax.request({
			url : "/book/" + bookId + "/resStatus?_dc=" + new Date().getTime(),
			type : "GET",
			loadMsg : true,
			success : function(data) {
				me.updateView(me);
			}
		});
		
	},
	
	onPreviewClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var status = record.get("status");
		if (status != "-1") {
			var downloadUrl = "/book/" + record.get("identifyCode") + "/share/preview";
			window.open(downloadUrl);
		} else {
			alert("书册已经删除");
		}
	},
	onTransformpTPLClick : function(btn) {
		var me = this;
		var opt = Module.YB.book.Operation;
		var selected = me.getSelectionModel().getSelection(); 
		if (selected.length > 1) {
			Soul.uiModule.Message.msg("","只能 选择一个模板进行模板转换");
			return;
		} else if(selected.length == 0) {
			Soul.uiModule.Message.msg("","请选择需要转换的书册");
			return;
		}
		//if(selected[0].data.status!=99)
		//{
		//	Soul.uiModule.Message.msg("","只能转换状态已经提交的书册");
		//	return;
		//}

		opt.onTransformTplClick(selected[0].data.id, function(){
			me.updateView(me);
		});
	}
});
