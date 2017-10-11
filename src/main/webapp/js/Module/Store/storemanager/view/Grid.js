Ext.define('Module.Store.storemanager.view.Grid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.storegrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Store.storemanager.Data',
        'Module.Store.storemanager.Renderer'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Store.storemanager.Renderer;
        var comboData = Module.Store.storemanager.Config.COMBO_DATA;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: STOREOWNER_LABEL.storeType,
                dataIndex: 'storeType',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STOREOWNER_LABEL.storeNum,
                dataIndex: 'storeNum',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STOREOWNER_LABEL.status,
                dataIndex: 'status',
                searchType: 'string',
                align: 'left',
                width: 200,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    var map = {apply:"申请",pause:"暂停",reject:"拒绝",start:"启用",stop:"停止"}
                    return map[v];
                }
            }, {
                text: STOREOWNER_LABEL.contacts,
                dataIndex: 'contacts',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STOREOWNER_LABEL.phone,
                dataIndex: 'phone',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STOREOWNER_LABEL.email,
                dataIndex: 'email',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STOREOWNER_LABEL.wechat,
                dataIndex: 'wechat',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STOREOWNER_LABEL.city,
                dataIndex: 'city',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STOREOWNER_LABEL.address,
                dataIndex: 'address',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STOREOWNER_LABEL.ctime,
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
                text: STOREOWNER_LABEL.lastCountTime,
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
            }, {
                text: STOREOWNER_LABEL.note,
                dataIndex: 'note',
                searchType: 'string',
                align: 'left',
                width: 200
            }
        );

        var me = this;
        me.contextMenu = me.portlet.buildStoreOptMenu();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();
                    var statusT = -1;

                    /*判断所选状态是否一致*/
                    Ext.each(records, function (record, index, rs) {
                        if (statusT == -1) {
                            statusT = record.data.status;
                        } else if (statusT != record.data.status) {
                            statusT = -1;
                            return false;
                        }
                    });

                    editStore = me.portlet.down('menuitem[name=editStore]');
                    righteditStore = me.contextMenu.down('menuitem[name=editStore]');

                    executeStatistics = me.portlet.down('menuitem[name=executeStatistics]');
                    rightExecuteStatistics = me.contextMenu.down('menuitem[name=executeStatistics]');

                    statisticsDetail = me.portlet.down('menuitem[name=statisticsDetail]');
                    rightStatisticsDetail = me.contextMenu.down('menuitem[name=statisticsDetail]');

                    shopDetial = me.portlet.down('menuitem[name=shopDetial]');
                    rightShopDetial = me.contextMenu.down('menuitem[name=shopDetial]');

                    if (sm2.getCount() > 0 && statusT != -1) {
                        if(sm2.getCount() > 1){
                            editStore.disable();
                            righteditStore.disable();

                            executeStatistics.disable();
                            rightExecuteStatistics.disable();

                            statisticsDetail.disable();
                            rightStatisticsDetail.disable();

                            shopDetial.disable();
                            rightShopDetial.disable();
                        }else{
                            editStore.enable();
                            righteditStore.enable();

                            executeStatistics.enable();
                            rightExecuteStatistics.enable();

                            statisticsDetail.enable();
                            rightStatisticsDetail.enable();

                            shopDetial.enable();
                            rightShopDetial.enable();
                        }
                    } else {
                        editStore.disable();
                        righteditStore.disable();

                        executeStatistics.disable();
                        rightExecuteStatistics.disable();

                        statisticsDetail.disable();
                        rightStatisticsDetail.disable();

                        shopDetial.disable();
                        rightShopDetial.disable();
                    }
                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: Ext.data.StoreManager.lookup("Module.Store.storemanager.store.StoreOwnerStore")
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;

        me.callParent(arguments);

        var callbackFun = function(){
            me.updateView(me);
        };

        var sm = me.selModel,

        editStore = me.portlet.down('menuitem[name=editStore]'),

        statisticsDetail = me.portlet.down('menuitem[name=statisticsDetail]'),

        shopDetial = me.portlet.down('menuitem[name=shopDetial]');

        var editStoreFunc = function () {
            var records = sm.getSelection();
            Module.Store.storemanager.Operation.doEditStoreFunction(records[0].data,callbackFun);
        };

        editStore.on("click",editStoreFunc);
        me.contextMenu.down('menuitem[name=editStore]').on('click', editStoreFunc);


        var statisticDetilFunc = function(){
            var records = sm.getSelection();
            Module.Store.storemanager.Operation.doManagerStatisticDetilFuncion(records[0].data,callbackFun);
        };

        statisticsDetail.on("click",statisticDetilFunc);
        me.contextMenu.down('menuitem[name=statisticsDetail]').on('click', statisticDetilFunc);


        var shopDetialFunc = function(){
            var records = sm.getSelection();
            Module.Store.storemanager.Operation.doManagerShopDetialFuncion(records[0].data,callbackFun);
        };

        shopDetial.on("click",shopDetialFunc);
        me.contextMenu.down('menuitem[name=shopDetial]').on('click', shopDetialFunc);


    }
});