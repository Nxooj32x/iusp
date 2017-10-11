Ext.define('Module.Template.page.view.DataView', {
	extend : 'Soul.view.AdvanceSearchView',
	alias : 'widget.ptplview',

	uses: 'Ext.data.Store',
	
	requires : ['Module.Template.page.Tools', 'Module.Template.page.Config', 'Module.Template.page.Operation',  'Module.Template.page.store.CoverPtplStore', 'Module.Template.page.store.BackCoverPtplStore'],
	
	border : false,

	checkIndexes : [ 'type', 'status' ], // 默认选择的列

	disableIndexes : [ 'opt', 'view' ],
	
	initComponent: function() {
		var me = this;
		me.store = Ext.data.StoreManager
		.lookup("Module.Template.page.store.PtplStore");
		
		me.contextMenu = me.portlet.contextMenu;
		
		this.columns = new Array();
		var dict = Module.Template.page.Config;
		this.columns.push({
			text : "名称",
			dataIndex : 'name'
		}, {
			text : "编码",
			searchType : 'number',
			dataIndex : 'code'
		}, {
			text : "描述",
			dataIndex : 'desc'
		}, {
			text : "页面类型",
			searchType : 'combo',
			dataIndex : 'type',
			comboData : dict.COMBO_CFG.type
		}, {
			text : "状态",
			searchType : 'combo',
			dataIndex : 'status',
			comboData : dict.COMBO_CFG.status
		}, {
			text : "图片数",
			searchType : 'number',
			dataIndex : 'imageNum'
		}, {
			text : "文本框",
			searchType : 'number',
			dataIndex : 'textNum'
		}, {
			text : "左右一致",
			searchType : 'boolean',
			dataIndex : 'lrSame'
		}, {
			text : "对页模式",
			dataIndex : 'dbMode',
			searchType : 'combo',
			comboData : dict.COMBO_CFG.dbMode
		}, {
			text : "必须成对出现",
			xtype : 'checkcolumn',
			searchType : 'number',
			dataIndex : 'needTwo'
		}, {
			text : "使用次数",
			searchType : 'number',
			dataIndex : 'usedNum'
		}, {
			text : "风格",
			dataIndex : 'style'
		}, {
			text : "标签",
			dataIndex : 'labels'
		}, {
			text : "目录条目",
			searchType : 'number',
			dataIndex : 'catalogItemNum'
		}, {
			text : "对应封面",
			dataIndex : 'coverCode',
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
			}
		}, {
			text : "编辑时间",
			width : 200,
			searchType : 'date',
			dataIndex : 'etime'
		});

		
	    this.items = [
	      Ext.create('Ext.view.View', {
			store : me.store,
			cls : 'pageTplCl',
			itemSelector : 'div.template',
			multiSelect : true,
			width : 1024,
			autoScroll : true,
			listeners:
				{
					itemclick:function(view, record,item,index,e,eOpts){
						if(record!=null){
							Module.Template.page.Tools.showTemplateInEast(record.data); 
						}
					},
					itemcontextmenu:function(view, record,item,index,e,eOpts ){
						e.preventDefault();
						view.fireEvent('itemclick', view, record, item, index);
						if (me.portlet.selected.length > 0)	
							me.contextMenu.showAt(e.getXY());
					},
					selectionchange:function( model,  selected, eOpts ){
						//处理顶栏模板菜单
						me.portlet.executeOptMenu(selected, me.portlet);
					}
				},
			tpl : Ext.create(
					'Ext.XTemplate',
					'<tpl for=".">',
					/**'<div  class="template" onclick="Module.YB.template.Tools.showTemplateInEast(\'{id}\')" >',*/
					'<div  class="template">',
					'<img src="/pageTplRes/{type}/{code}/img/thumbnail/left.jpg" height="100px" />',
					 '<tpl if="status == 1">',
					 '<img src="/img/icon/monitor-offline.png" title="停用，不在使用">',
					 '<tpl elseif="status == 2">',
					 '<img src="/img/icon/monitor-warn.png" title="未验证，需要验证后启用">',
					 '<tpl elseif="status == 3">',
					 '<img src="/img/icon/monitor-failed.png" title="失效，系统中不存在">',
					 '</tpl>',
					'<br/><span><strong>{name}</strong></span>',
					'</div>', '</tpl>'),
			viewConfig : {
				emptyText : "系统中没有模板，请载入系统模板"
			}
		})];
	    
	    this.callParent(arguments);
	},
		
	afterRender : function() {
		var me = this;
		me.callParent(arguments);
	}
});
