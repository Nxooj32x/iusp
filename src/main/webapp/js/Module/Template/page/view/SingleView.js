Ext.define('Module.Template.page.view.SingleView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ptplview',

	uses : 'Ext.data.Store',

	requires : ['Soul.view.AdvanceSearchView',"Module.Template.page.store.PtplStore"],

	pageTpl : {},
	
	layout : {
		type : 'vbox',
		align: 'center'
	},

	initComponent : function() {
		var me = this;
		me.store = Ext.data.StoreManager
		.lookup("Module.Template.page.store.PtplStore");
		
		me.showWin = Ext.create('Module.Template.page.view.PtplViewWin', {
			pageTpl : me.pageTpl
		});
		
		var dict = Module.Template.page.Config;
		this.items = [ {
			xtype : 'souladvancesearchView',
			width : "100%",
			maxHeight : '250',
			title : me.pageTpl.name ? me.pageTpl.name : "请选择模板",
			header : true,
			collapsed : true,
			collapsible : true,
			store : me.store,
			itemWidth : 140,
			checkIndexes : [ 'type', 'status' ], // 默认选择的列
			showPageConfigTool : false,
			columns : [
				{
					text : "页面类型",
					searchType : 'combo',
					dataIndex : 'type',
					comboData : dict.COMBO_CFG.type
				}, {
					text : "状态",
					searchType : 'combo',
					dataIndex : 'status',
					comboData : dict.COMBO_CFG.status
				}
			           ],
			items : [
			        Ext.create('Ext.view.View', {
						store : me.store,
						cls : 'pageTplCl',
						itemSelector : 'div.template',
						listeners:
							{
								itemclick:function(view, record,item,index,e,eOpts){
									me.pageTpl = record.data;
									me.showWin.updatePageTpl(record.data, me.showWin);
									me.down('souladvancesearchView').collapse();
									me.updateView(me);
								},
								itemcontextmenu:function(view, record,item,index,e,eOpts ){
									e.preventDefault();
								},
								selectionchange:function( model,  selected, eOpts ){
								}
							},
						tpl : Ext.create(
								'Ext.XTemplate',
								'<tpl for=".">',
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
					})
			        
			        ]

		}, Ext.create('Module.Template.page.view.PtplViewTab', {
			pageTpl : me.pageTpl,
			tools : [{
				type: 'maximize',
				handler : function(){
					if (me.pageTpl.id) {
						me.showWin.show();
					} else {
						Soul.uiModule.Message.msg("", "请选择模板");
					}
				}
			}, {
				type : 'prev',
				tooltip : '上一个',
				handler : function(){
					if (me.pageTpl.code) {
						if (me.pageTpl.code == 1) {
							Soul.uiModule.Message.msg("", '已经是"' + PAGETPL_TYPE[me.pageTpl.type] + '"的第一个模板');
						} else {
							var code = me.pageTpl.code - 1;
							code = code < 1 ? 1 : code;
							Soul.Ajax.request({
								url : '/api/tpl/page/type/' + me.pageTpl.type + "/" + code,
								success : function(ret){
									me.pageTpl = ret;
									me.updateView(me);
								}
							});
						}
					} 
				}
				
			}, {
				type : 'next',
				tooltip : '下一个',
				handler : function(){
					if (me.pageTpl.code) {
						var code = me.pageTpl.code + 1;
						Soul.Ajax.request({
							url : '/api/tpl/page/type/' + me.pageTpl.type + "/" + code,
							//loadMask : true,
							//loadMsg : '载入中',
							parseFailure : false,
							success : function(ret){
								me.pageTpl = ret;
								me.updateView(me);
							}, 
							failure : function(){
								Soul.uiModule.Message.msg("", '已经是"' + PAGETPL_TYPE[me.pageTpl.type] + '"的最后一个模板');
							}
						});
					} 
				}
				
			}]
		})];
		this.callParent(arguments);
	},

	afterRender : function() {
		var me = this;
		me.down('souladvancesearchView').on('expand', function(p, eOpts){
			p.down('pagingtoolbar').doRefresh();
		});
		me.store.load({
			start : 0,
			limit : 65536
		});
		me.callParent(arguments);
	},
	
	updateView : function(scope){
		var me = scope || this;
		if (me.pageTpl.id) {
			sessionStorage.setItem("currentPtplView", $.toJSON(me.pageTpl)); 
		} else {
			var cp = sessionStorage.getItem("currentPtplView");
			if (cp) {
				me.pageTpl =  $.parseJSON(cp);
				me.showWin.updatePageTpl(me.pageTpl, me.showWin);
			}
		}
		if (me.pageTpl.name) {
			me.down('ptplviewtab').setTitle("预览模板-" + me.pageTpl.name);
		} else {
			me.down('ptplviewtab').setTitle("预览模板");
		}
		me.down('tabpanel').pageTpl = me.pageTpl;
		var viewTab = me.down('tabpanel').getActiveTab();
		viewTab.fireEvent('activate');
	}
});
