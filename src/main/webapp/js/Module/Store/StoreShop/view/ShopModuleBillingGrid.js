Ext.define('Module.Store.StoreShop.view.ShopModuleBillingGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.shopModuleBillingGrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.CustomModule.modulemanager.Data',
        'Module.Store.StoreShop.Data',
        'Module.Store.StoreShop.store.ShopModuleBillingStore',
        'Module.Store.StoreShop.Renderer',
        'Module.CustomModule.modulemanager.Renderer'
    ],

    modulePanel  : null,

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Store.StoreShop.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: SHOP_MODULE_BILLING_LABEL.name,
                dataIndex: 'name',
                width : 200,
                searchType: 'string',
                align: 'left'
            }, {

                text:SHOP_MODULE_BILLING_LABEL.status, dataIndex:'status', searchType:'combo', align:'center', width : 80,
                renderer : function(v, u, r, rowIndex, columnIndex, s){
                    return renders.translateShopModuleBillingStatus(v);
                },
                comboData : SHOP_MODULE_BILLING_LABEL.status
            }, {

                text:SHOP_MODULE_BILLING_LABEL.billingType, dataIndex:'billingType', searchType:'combo', align:'center', width : 80,
                renderer : function(v, u, r, rowIndex, columnIndex, s){
                    return renders.translateShopModuleBillingTypeStatus(v);
                },
                comboData : SHOP_MODULE_BILLING_LABEL.billingType
            }, {
                text: SHOP_MODULE_BILLING_LABEL.money,
                dataIndex: 'money',
                width : 80,
                searchType: 'string',
                align: 'left'
            }, {
                text: SHOP_MODULE_BILLING_LABEL.btime,
                dataIndex: 'btime',
                searchType: 'date',
                align: 'center',
                width : 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    if (v == null) {
                        return "未知";
                    }
                    return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
                }
            }, {
                text: SHOP_MODULE_BILLING_LABEL.startTime,
                dataIndex: 'startTime',
                searchType: 'date',
                align: 'center',
                width : 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    if (v == null) {
                        return "未知";
                    }
                    return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
                }
            }, {
                text: SHOP_MODULE_BILLING_LABEL.endTime,
                dataIndex: 'endTime',
                searchType: 'date',
                align: 'center',
                width : 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    if (v == null) {
                        return "未知";
                    }
                    return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
                }
            },{
                text: SHOP_MODULE_BILLING_LABEL.opUserName,
                dataIndex: 'opUserName',
                searchType: 'string',
                align: 'left'
            }, {
                text: SHOP_MODULE_BILLING_LABEL.serviceTime,
                dataIndex: 'serviceTime',
                searchType: 'number',
                align: 'left'
            }
        );


        var me = this;

        var store = Ext.create("Module.Store.StoreShop.store.ShopModuleBillingStore");
        store.proxy.api = {
			read : "/storeapi/shop/"+ me.shopModule.shopId+"/module/" + me.shopModule.moduleId + "/billing/"
		};
		store.load();
		
		var addShopMouleBilling = Ext.create("Ext.Button", {
			text: '添加计费包',
			name: 'addShopMouleBilling',
			iconCls: 'x-add-icon',
			disabled: false,
			handler : function(btn){
				var code = btn.up('toolbar').down('textfield[name=couponBill]').getValue();
				if (code.length < 10) {
					Soul.util.MessageUtil.showErrorInfo("错误", "请输入正确的兑换码");
					return;
				}
				Soul.Ajax.request({
					url : '/storeapi/coupon/bill/' + code,
					method : 'post',
					params : {
						smId : me.shopModule.id
					},
					loadMask : true,
					loadMsg : '兑换计费包',
					successMsg : '成功',
					success : function(response, opts) {
    					if (typeof(callbackFun) == "function")
    						callbackFun();
    					me.store.reload();
    					if (me.modulePanel && me.modulePanel.store)
    						me.modulePanel.store.reload();
					}
				});
			}
		});


        Ext.apply(this, {
            //selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: store, 
            dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: [{
					xtype : 'textfield',
					fieldLabel: "兑换码",
					name: 'couponBill',
					allowBlank: false,
				}, addShopMouleBilling,"-", {
					text: '获取兑换码',
					icon : '/img/icon/init.png',
					name: 'getCouponBill',
					handler : function(btn){
						var viewport = btn.up('sureadminviewportal')
					    viewport.gotoModule('Module.Store.coupon', viewport)
					}
				}]
			}],
            
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    }


});