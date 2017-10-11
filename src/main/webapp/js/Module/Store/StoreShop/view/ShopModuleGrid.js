Ext.define('Module.Store.StoreShop.view.ShopModuleGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.shopModulegrid',

    requires: [
        'Module.Store.StoreShop.store.ShopModuleStore',
        'Module.Store.StoreShop.Renderer'
    ],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Store.StoreShop.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: SHOP_MODULE_LABEL.name,
                dataIndex: 'name',
                searchType: 'string',
                align: 'left',
                flex: 1
            }, {

                text: SHOP_MODULE_LABEL.status,
                dataIndex: 'status',
                searchType: 'combo',
                align: 'center',
                width: 80,	
                renderer: renders.translateShopModuleStatus,
                comboData: SHOP_MODULE_LABEL.status

            },{
            	text: "续费",
				xtype : 'actioncolumn',
				dataIndex : 'status',
				width: 80,
				editor : false,
				align : 'center',
	            sortable:false,
				items : [{
					icon : '/img/icon/dollar_red.png',
					tooltip : '计费详情',
					scope : this,
					handler : this.onBillingClick
				}]
			} , {
				text: "是否购买",
				dataIndex: 'isPayed',
				searchType: 'boolean',
				align: 'center',
				width: 80,	
				renderer: Soul.util.RendererUtil.getBoolean
			}, {
                text: SHOP_MODULE_LABEL.btime,
                dataIndex: 'btime',
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
                text: SHOP_MODULE_LABEL.etime,
                dataIndex: 'etime',
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
        
        var store = Ext.create("Module.Store.StoreShop.store.ShopModuleStore");
		store.proxy.api = {
			read : "/storeapi/shop/"+ me.shopId +"/modules/"
		};
		store.load();
        Ext.apply(this, {
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: store
        });

        this.callParent(arguments);
    },

    onBillingClick : function(){
	
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    }


});