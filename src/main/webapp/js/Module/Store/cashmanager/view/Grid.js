Ext.define('Module.Store.cashmanager.view.Grid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.cashgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Store.cashmanager.Data',
        'Module.Store.cashmanager.Renderer',
        ''
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: CASH_LABEL.applyUserName,
                dataIndex: 'applyUserName',
                searchType: 'string',
                align: 'left',
                width: 200

            },
            {
                text: CASH_LABEL.applyCashMoney,
                dataIndex: 'applyCashMoney',
                searchType: 'string',
                align: 'left',
                width: 200
            },
            {
                text: CASH_LABEL.actualCashMoney,
                dataIndex: 'actualCashMoney',
                searchType: 'string',
                align: 'left',
                width: 200
            },
            {
                text: CASH_LABEL.type,
                dataIndex: 'type',
                searchType: 'string',
                align: 'left',
                width: 200
            },
            {
                text : CASH_LABEL.way,
                dataIndex: 'way',
                searchType: 'string',
                align: 'left',
                width: 200
            },
            {
                text : CASH_LABEL.accout,
                dataIndex: 'accout',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: CASH_LABEL.applyTime,
                dataIndex: 'applyTime',
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
                text: CASH_LABEL.opTime,
                dataIndex: 'opTime',
                searchType: 'date',
                align: 'center',
                flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    if (v == null) {
                        return "未知";
                    }
                    return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
                }
            },
            {
                text : CASH_LABEL.opNote,
                dataIndex: 'opNote',
                searchType: 'string',
                align: 'left',
                width: 200
            },
            {
                text : CASH_LABEL.opUserName,
                dataIndex: 'opUserName',
                searchType: 'string',
                align: 'left',
                width: 200
            }
        );

        var me = this;

        me.contextMenu = me.portlet.buildCashOptMenu();
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

                    detailCash = me.portlet.down('menuitem[name=detailCash]');
                    rightDetailCash = me.contextMenu.down('menuitem[name=detailCash]');


                    if (sm2.getCount() > 0 && statusT != -1) {
                        if(sm2.getCount() > 1){
                            detailCash.disable();
                            rightDetailCash.disable();
                        }else{
                            detailCash.enable();
                            rightDetailCash.enable();
                        }
                    } else {
                        detailCash.disable();
                        rightDetailCash.disable();
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
            store: Ext.data.StoreManager.lookup("Module.Store.cashmanager.store.cashStore"),
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var keyupFunc = function(){
            var status = Ext.getCmp("status").getValue(),
                opNote = Ext.getCmp("opNote").getValue();
            var saveBtn = Ext.getCmp("saveBtn");
            if(status == '' || opNote == ''){
                saveBtn.disable();
            }else{
                saveBtn.enable();
            }
        }
        var me = this;
        me.callParent(arguments);

        var callbackFun = function(){
            me.selModel.deselectAll();
            me.updateView(me);
        };

        var sm = me.selModel,
            detailCash = me.portlet.down('menuitem[name=detailCash]');

        var detailCashFunc = function(){
            var records = sm.getSelection();
            Module.Store.cashmanager.Operation.doManagerDetailCashFunction(records[0].data,keyupFunc,callbackFun);
        };

        detailCash.on("click",detailCashFunc);
        me.contextMenu.down('menuitem[name=detailCash]').on('click', detailCashFunc);
    }
});