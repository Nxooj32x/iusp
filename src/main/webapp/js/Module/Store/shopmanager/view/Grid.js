Ext.define('Module.Store.shopmanager.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.shopgrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Store.shopmanager.Data',
		'Module.Store.shopmanager.Renderer'
	],
    
	checkIndexes : [], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Store.shopmanager.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: STORE_LABEL.name,
				dataIndex: 'name',
				searchType: 'string',
				align: 'left',
				width: 200
			}, {
				text: STORE_LABEL.appId,
				dataIndex: 'appId',
				searchType: 'string',
				align: 'left',
				width: 200
			}, {
				text: STORE_LABEL.storeOwnerId,
				dataIndex: 'storeOwnerId',
				searchType: 'string',
				align: 'left',
				width: 200
			}, {
				text: STORE_LABEL.business,
				dataIndex: 'business',
				searchType: 'string',
				align: 'left',
				width: 200
			},  {
				text:STORE_LABEL.logo, dataIndex:'logo',sortable: false,  searchType:'string', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					if(v == null){
						return "";
					}
					v=v+"?imageView2/1/w/100/h/50/format/jpg";
					return "<img style='width:50px;height:25px;' src="+v+" ></img>";
				}

			}, {

				text:STORE_LABEL.status, dataIndex:'status', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateShopStatus(v);
				},
				comboData : STORE_LABEL.status

			}, {
				text: STORE_LABEL.viewTplId,
				dataIndex: 'viewTplId',
				searchType: 'string',
				align: 'left',
				width: 200
			}, {
				text: STORE_LABEL.createUserId,
				dataIndex: 'createUserId',
				searchType: 'string',
				align: 'left',
				width: 200
			}, {
				text: STORE_LABEL.ctime,
				dataIndex: 'ctime',
				searchType: 'date',
				align: 'center',
				flex: 1,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					if (v == null) {
						return "未知";
					}
					return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
				}
			}, {
				text: STORE_LABEL.lastCountTime,
				dataIndex: 'lastCountTime',
				searchType: 'date',
				align: 'center',
				flex: 1,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					if (v == null) {
						return "未知";
					}
					return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
				}

			}
		);
		var me = this;
		me.contextMenu = me.portlet.buildStoreShopOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

					var editShopRight = me.contextMenu.down('menuitem[name=editShop]');
					var editShoplTop = me.portlet.down('menuitem[name=editShop]');

					var staticShopRight = me.contextMenu.down('menuitem[name=staticShop]');
					var staticShopTop = me.portlet.down('menuitem[name=staticShop]');

					var shopModuleRight = me.contextMenu.down('menuitem[name=shopModule]');
					var shopModuleTop = me.portlet.down('menuitem[name=shopModule]');

					staticShopRight.disable();
					staticShopTop.disable();
					if(records.length == 1)
					{
						editShopRight.enable();
						editShoplTop.enable();
						shopModuleRight.enable();
						shopModuleTop.enable();

					}else{
						editShopRight.disable();
						editShoplTop.disable();
						shopModuleRight.disable();
						shopModuleTop.disable();
					}

				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : STORESHOP_LABEL.noShop
			},
			store : Ext.data.StoreManager.lookup("Module.Store.shopmanager.store.StoreShopStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};

		var sm = me.selModel;

		var editShopRight = me.contextMenu.down('menuitem[name=editShop]');
		var editShoplTop = me.portlet.down('menuitem[name=editShop]');

		var staticShopRight = me.contextMenu.down('menuitem[name=staticShop]');
		var staticShopTop = me.portlet.down('menuitem[name=staticShop]');

		var shopModuleRight = me.contextMenu.down('menuitem[name=shopModule]');
		var shopModuleTop = me.portlet.down('menuitem[name=shopModule]');



        //编辑
        var editShopFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length > 0) {
        		Module.Store.shopmanager.Operation.doEditShopFunction(records, callbackFun);
        	}
        };
		editShopRight.on('click', editShopFunc);
		editShoplTop.on('click', editShopFunc);


        var stateShopFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length > 0) {
				SureMsg.msg("静态化功能暂不实现，后期完善！")
        	}
        };
		staticShopRight.on('click', stateShopFunc);
		staticShopTop.on('click', stateShopFunc);


        var shopModuleFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length > 0) {
				Module.Store.shopmanager.Operation.doShowModuleFunction(records, callbackFun);
	        	}
        };
		shopModuleRight.on('click', shopModuleFunc);
		shopModuleTop.on('click', shopModuleFunc);
    }
});