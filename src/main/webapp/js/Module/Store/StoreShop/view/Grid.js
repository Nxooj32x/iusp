Ext.define('Module.Store.StoreShop.view.Grid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.shopgrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Store.StoreShop.Data',
		'Module.Store.StoreShop.Renderer'
	],
    
	checkIndexes : ['status'], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Store.StoreShop.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: STORE_LABEL.name,
				dataIndex: 'name',
				searchType: 'string',
				align: 'left',
				width: 100
			},  {
				text : "店铺详情",
				xtype : 'actioncolumn',
				width : 80,
				sortable : false,
				menuDisabled : true,
				items : [ {
					icon : '/img/icon/setup.png',
					tooltip : '店铺详情',
					scope : this,
					handler : this.onDetailClick
				} ]
			}, {
				text: STORE_LABEL.appId,
				dataIndex: 'appId',
				searchType: 'string',
				align: 'left',
				width: 100
			}, {
				text: STORE_LABEL.storeOwnerId,
				dataIndex: 'storeOwnerId',
				searchType: 'number',
				width: 80
			}, {
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
				comboData : STORE_SHOP_COMBO.status

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
			}
		);
		var me = this;

		//右击事件
		me.contextMenu = me.portlet.buildStoreShopOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
				}
			}
		});
		
		var store = Ext.create('Module.Store.StoreShop.store.StoreShopStore');

		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : STORESHOP_LABEL.noShop
			},
			store : store,
		});
		
		this.callParent(arguments);
	},
	
	onDetailClick : function(view, rowIndex, colIndex, item, e, r, row){
		var me = this;
		me.portlet.gotoView("Module.Store.StoreShop.view.ShopDetailPanel", {storeShop : r.data}, me.portlet);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
		var sm = me.selModel;
		var callbackFun = function(){
			current = me.store.currentPage;
			if (me.fireEvent('beforechange', me, current) !== false) {
				me.store.loadPage(current);
			}
		};
		
		if ( me.portlet && me.portlet.down('[name=back2list]'))
			me.portlet.down('[name=back2list]').hide();

		var delStoreShopRight = me.contextMenu.down('menuitem[name=delStoreShop]');
		var openStoreShopRight = me.contextMenu.down('menuitem[name=openStoreShop]');
		var pauseStoreShopRight = me.contextMenu.down('menuitem[name=pauseStoreShop]');

		//删除
		var delStoreShopFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length > 0) {
				Module.Store.StoreShop.Operation.doDelStoreShopFunction(records, callbackFun);
			}
		};
		delStoreShopRight.on('click', delStoreShopFunc);


		//开启
		var openStoreShopFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length > 0) {
				Module.Store.StoreShop.Operation.doChangeStoreShopStateFunction(records,"inuse", callbackFun);
			}
		};
		openStoreShopRight.on('click', openStoreShopFunc);


		//暂停
		var pauseStoreShopFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			if(records.length > 0) {
				Module.Store.StoreShop.Operation.doChangeStoreShopStateFunction(records,"pause", callbackFun);
			}
		};
		pauseStoreShopRight.on('click', pauseStoreShopFunc);

	}
});