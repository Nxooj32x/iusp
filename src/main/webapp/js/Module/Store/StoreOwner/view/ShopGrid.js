Ext.define('Module.Store.StoreOwner.view.ShopGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.soshopgrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Store.StoreShop.Data',
		'Module.Store.StoreShop.Renderer'
	],
    
	checkIndexes : ['name'], //默认选择的列
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
			},{
            	text: "详情",
				xtype : 'actioncolumn',
				dataIndex : 'contactLogs',
				width: 80,
				editor : false,
				align : 'center',
				items : [{
					icon : '/img/icon/info.png',
				    text : '详情',
					tooltip : '详情',
					name : 'view',
					scope : this,
					handler : this.onDetailClick,
					isDisabled : function(v, r, c, item, r) {
					}
				}]
			}
		);
		var me = this;
		
		var store = Ext.create('Module.Store.StoreShop.store.StoreShopStore');
		store.proxy.api = {
			read : '/storeapi/server/' + me.storeOwner.id + '/shop/'
		};
		store.proxy.extraParams = {};
		Ext.apply(this, {
			columns : columns,
			viewConfig : {
				emptyText : STORESHOP_LABEL.noShop
			},
			store : store,
		});
		store.load();
		this.callParent(arguments);
	},
	
	onDetailClick : function(view ,rowIndex, colIndex, item, e, record, row){
	},

	afterRender: function() {
        var me = this;
        me.callParent(arguments);
    }
});