Ext.define('Module.YB.printBook.view.Grid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.bookgrid',

	requires : [ 'Soul.util.RendererUtil', 'Soul.util.GridRendererUtil',
			'Module.YB.printBook.Data', 'Module.YB.printBook.Renderer',
			'Soul.util.ObjectView', 'Soul.ux.grid.feature.Searching',
			'Soul.ux.grid.column.ComboColumn', 'Module.YB.printBook.Tools', 'Module.YB.printBook.Config', 'Module.YB.printBook.Operation' ],

	checkIndexes : [ 'type', 'status', 'ctime' ], // 默认选择的列

	disableIndexes : [ 'pdf', 'view' ],	//不进行检索的列

	initComponent : function() {
		var columns = new Array();
		
		columns.push(new Ext.grid.RowNumberer({
			editor : false
		}),{
			text : "ID",
			width : 40,
			sortable : true,
			editor : false,
			dataIndex : 'id',
			searchType : 'number',
		}, {
			text : "名称",
			width : 200,
			sortable : true,
			menuDisabled : false,
			dataIndex : 'name'
		}, {
			text : "书册ID",
			width : 80,
			sortable : true,
			menuDisabled : false,
			dataIndex : 'bookId',
			searchType : 'number',
		},  {
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
			xtype : 'actioncolumn',
			width : 30,
			dataIndex : 'view',
			editor : false,
			align : 'center',
			items : [ {
				icon : '/img/icon/download.png',
				tooltip : '下载压缩文件',
				name : 'view',
				scope : this,
				handler : this.onDownloadClick,
				isDisabled : function(v, r, c, item, r) {
				}
			}]
		}
		//由于页数较多的时候生成pdf效果不好，目前采取下载压缩包使用离线工具制作pdf
		//, {
		//	xtype : 'actioncolumn',
		//	width : 30,
		//	dataIndex : 'pdf',
		//	editor : false,
		//	align : 'center',
		//	items : [ {
		//		icon : '/img/icon32/filetype_pdf.png',
		//		tooltip : '生成pdf',
		//		name : 'view',
		//		scope : this,
		//		handler : this.onBuildPdfClick,
		//		isDisabled : function(v, r, c, item, r) {
		//		}
		//	}]
		//}
		);

		var sm = new Ext.selection.CheckboxModel({
			listeners : {
				selectionchange : function(sm2) {
					//处理顶栏模板菜单
				}
			}
		});

		Ext.apply(this, {
			store : Ext.data.StoreManager
					.lookup("Module.YB.printBook.store.PrintBookStore"),
			selModel : sm,
			viewConfig : {
				emptyText : "没有书册 "
			},
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

	onDownloadClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var downloadUrl = "/printBookRes/" + record.get("bookId") + "/" + record.get("id") + ".zip";
		window.open(downloadUrl);
	},
	
	onBuildPdfClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var downloadUrl = "/printBookRes/" + record.get("bookId") + "/" + record.get("id") + ".pdf";
		Soul.Ajax.request({
			url : "/printBook/" + record.get("id") + "/pdf",
			method : 'put',
			timeout : 1000 * 60 * 20,
			loadMask : true,
			loadMsg : '生成pdf书册',
			successMsg : '生成成功',
			success : function(response, opts) {
				window.open(downloadUrl);
			}
		});
	},
	
	afterRender : function() {
		var me = this;
		me.callParent(arguments);
	},

	updateView : function(scope) {
		var me = scope || this;
		me.pagingBar.doRefresh();
	}

});
