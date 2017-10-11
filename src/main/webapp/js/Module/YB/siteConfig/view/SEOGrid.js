Ext.define('Module.YB.siteConfig.view.SEOGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.paramgrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Module.YB.siteConfig.Tools',
		'Module.YB.siteConfig.Config'
	],
	
	initComponent : function() {
		var columns = new Array();
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: "页面SEO配置",flex:1, sortable: false, 
				menuDisabled:true, dataIndex: 'key', align : 'left',
			},
			{
				text: "说明", flex:1, dataIndex:'desc', 
				menuDisabled:true, align : 'left',
			},
			{
				text: "值", flex:2, dataIndex:'value', 
				menuDisabled:true, align : 'left',
			}
		);
		
		var me = this;
		me.contextMenu = Module.YB.siteConfig.Tools.buildParamOptMenu();
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					rightEI = me.contextMenu.down('menuitem[name=editparam]');
					rightDI = me.contextMenu.down('menuitem[name=delparam]');
					if (sm2.getCount() == 1) {
						rightEI.enable();
						rightDI.enable();
					} else {
						rightEI.disable();
						rightDI.disable();
					}
				}
			}
		});
		
		var paramFields = [];
		paramFields.push('key');
		paramFields.push('value');
		paramFields.push('desc');
		
		var paramStore = new Ext.create('Ext.data.Store', {
			storeId : 'paramStore',
			fields : paramFields
		});

		
		Ext.apply(this, {
			selModel: sm,
			store : paramStore,
			viewConfig : {
				emptyText : "没有 SEO配置"
			},
			columns : columns,
			listeners : {
				itemcontextmenu : me.itemcontextmenuFunction
			}
		});
		this.callParent(arguments);
	},
	
	itemcontextmenuFunction : function(view,record,htmlElement,index,event,eopts){
		event.preventDefault();
		var me = this;
		if (me.contextMenu != null)
			me.contextMenu.showAt(event.getXY());
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.portlet.setTitle('网站配置-SEO');
        Soul.Ajax.request({
			url : "/globalconfig/seo/yearbook",
			method : 'get',
			headers  : {
				Accept : 'application/json'
			},
			success : function(response, opts) {
				var paramData = [];
				for (var key in response) {
					var param = {};
					param['key'] = key;
					param['value'] = response[key];
					param['desc'] = Module.YB.siteConfig.Config.seoDesc[key];
					paramData.push(param);
				}
				me.getStore().loadData(paramData);
				me.getStore().sort('key', 'ASC');
			}
		});

		var sm = me.selModel;
		var editparamItem = me.contextMenu.down('menuitem[name=editparam]');
		var addparamItem = me.contextMenu.down('menuitem[name=addparam]');
		var delparamItem = me.contextMenu.down('menuitem[name=delparam]');
        
		var editparamFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			var store = me.getStore();

			Module.YB.siteConfig.Operation.doEditParamFunction(records[0], store);
        };
        editparamItem.on('click', editparamFunc);

        var addparamFunc = function(e, eOpts){
        	var store = me.getStore();

        	Module.YB.siteConfig.Operation.doAddParamFunction(store);
        };
        addparamItem.on('click', addparamFunc);

        var delparamFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	var store = me.getStore();

        	Module.YB.siteConfig.Operation.doDelParamFunction(records[0], store);
        };
        delparamItem.on('click', delparamFunc);
    }
});
