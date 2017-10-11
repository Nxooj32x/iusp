Ext.define('Module.Store.shopmanager.view.ShopModuleGrid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.shopModulegrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.CustomModule.modulemanager.Data',
        'Module.Store.shopmanager.Data',
        'Module.Store.shopmanager.store.ShopModuleStore',
        'Module.Store.shopmanager.Renderer',
        'Module.CustomModule.modulemanager.Renderer'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Store.shopmanager.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: SHOP_MODULE_LABEL.name,
                dataIndex: 'name',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {

                text: SHOP_MODULE_LABEL.status,
                dataIndex: 'status',
                searchType: 'combo',
                align: 'center',
                flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateShopStatus(v);
                },
                comboData: SHOP_MODULE_LABEL.status

            }, {
                text: SHOP_MODULE_LABEL.ctime,
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
                text: SHOP_MODULE_LABEL.utime,
                dataIndex: 'utime',
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
            }, {
                text: SHOP_MODULE_LABEL.currentBillingEtime,
                dataIndex: 'currentBillingEtime',
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

        function buildModuleOptMenu() {
            var menu = Ext.create('Ext.menu.Menu', {
                name: 'billingoperation1',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: [{
                    text: "模块配置信息",
                    disabled: true,
                    name: 'moduleConfigInfo',
                    iconCls: 'pool_setting'
                }, {
                    text: "模块计费明细",
                    disabled: true,
                    name: 'moduleBillingInfo',
                    iconCls: 'pool_setting'
                }, {
                    text: "删除模块",
                    disabled: true,
                    name: 'delModule',
                    iconCls: 'x-del-icon'
                }]
            });
            return menu;
        }

        me.contextMenu = buildModuleOptMenu();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {

                    var records = sm2.getSelection(),
                        moduleConfigInfo = me.contextMenu.down('menuitem[name=moduleConfigInfo]'),
                        delModule = me.contextMenu.down('menuitem[name=delModule]'),
                        moduleBillingInfo = me.contextMenu.down('menuitem[name=moduleBillingInfo]');

                    // moduleConfigInfo.enable();
                    //delModule.enable();
                    moduleBillingInfo.enable();


                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: Ext.data.StoreManager.lookup("Module.Store.shopmanager.store.ShopModuleStore")
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var callbackFun = function () {
            me.updateView(me);
        };

        var sm = me.selModel;

        var doEditBillingFunc = function () {
            var records = sm.getSelection();

            Module.Store.shopmanager.Operation.doShowModuleBillingFunction(records, callbackFun);
        };
        me.contextMenu.down('menuitem[name=moduleBillingInfo]').on('click', doEditBillingFunc);


    },


});