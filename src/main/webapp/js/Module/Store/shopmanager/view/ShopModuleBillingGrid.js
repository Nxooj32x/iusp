Ext.define('Module.Store.shopmanager.view.ShopModuleBillingGrid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.shopModuleBillingGridd',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.CustomModule.modulemanager.Data',
        'Module.Store.shopmanager.Data',
        'Module.Store.shopmanager.store.ShopModuleBillingStore',
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
                text: SHOP_MODULE_BILLING_LABEL.name,
                dataIndex: 'name',
                searchType: 'string',
                align: 'left'
            }, {

                text:SHOP_MODULE_BILLING_LABEL.status, dataIndex:'status', searchType:'combo', align:'center', flex:1,
                renderer : function(v, u, r, rowIndex, columnIndex, s){
                    return renders.translateShopModuleBillingStatus(v);
                },
                comboData : SHOP_MODULE_BILLING_LABEL.status
            }, {

                text:SHOP_MODULE_BILLING_LABEL.billingType, dataIndex:'billingType', searchType:'combo', align:'center', flex:1,
                renderer : function(v, u, r, rowIndex, columnIndex, s){
                    return renders.translateShopModuleBillingTypeStatus(v);
                },
                comboData : SHOP_MODULE_BILLING_LABEL.billingType
            }, {
                text: SHOP_MODULE_BILLING_LABEL.money,
                dataIndex: 'money',
                searchType: 'string',
                align: 'left'
            }, {
                text: SHOP_MODULE_BILLING_LABEL.btime,
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
                text: SHOP_MODULE_BILLING_LABEL.startTime,
                dataIndex: 'startTime',
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
                text: SHOP_MODULE_BILLING_LABEL.endTime,
                dataIndex: 'endTime',
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

                text: SHOP_MODULE_BILLING_LABEL.note,
                dataIndex: 'note',
                searchType: 'string',
                align: 'left'
            }, {
                text: SHOP_MODULE_BILLING_LABEL.opUserName,
                dataIndex: 'opUserName',
                searchType: 'string',
                align: 'left'
            }, {
                text: SHOP_MODULE_BILLING_LABEL.serviceTime,
                dataIndex: 'serviceTime',
                searchType: 'string',
                align: 'left'
            }, {
                text: SHOP_MODULE_BILLING_LABEL.usedTime,
                dataIndex: 'usedTime',
                searchType: 'string',
                align: 'left'
            }
        );




        var me = this;
        function buildModuleOptMenu(){
            var menu = Ext.create('Ext.menu.Menu', {
                name : 'billingoperation1',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: [{
                    text: "修改",
                    disabled: true,
                    name: 'editmoduleBilling',
                    iconCls: 'pool_setting'
                }]
            });
            return menu;
        }
        me.contextMenu = buildModuleOptMenu();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {

                    var records = sm2.getSelection(),
                        editmoduleBilling = me.contextMenu.down('menuitem[name=editmoduleBilling]');
                        editmoduleBilling.enable();


                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: Ext.data.StoreManager.lookup("Module.Store.shopmanager.store.ShopModuleBillingStore")
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var callbackFun = function(){
            me.updateView(me);
        };

        var sm = me.selModel;

        var addShopMouleBilling = me.down('button[name=addShopMouleBilling]');
        var addShopMouleBillingFunc = function(item, e, eOpts){
          SureMsg.msg("暂未处理，后续完善！");
        }
        addShopMouleBilling.on('click', addShopMouleBillingFunc);



        var doEditShopModuleBillingFunc = function () {
            var records = sm.getSelection();
            Module.Store.shopmanager.Operation.doEditShopModuleBillingFunction(records, callbackFun);
        };
        me.contextMenu.down('menuitem[name=editmoduleBilling]').on('click', doEditShopModuleBillingFunc);


    },


});