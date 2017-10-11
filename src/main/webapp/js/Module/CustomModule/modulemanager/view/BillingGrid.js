Ext.define('Module.CustomModule.modulemanager.view.BillingGrid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.billgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.CustomModule.modulemanager.Data',
        'Module.CustomModule.modulemanager.Renderer',
        'Module.CustomModule.modulemanager.store.BillingStore'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.CustomModule.modulemanager.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: BILLING_LABEL.id,
                dataIndex: 'id',
                searchType: 'int',
                align: 'center',
                flex: 1
            },{
                text: BILLING_LABEL.name,
                dataIndex: 'name',
                searchType: 'string',
                align: 'center',
                flex: 1
            }, {
                text: BILLING_LABEL.billingType,
                dataIndex: 'billingType',
                searchType: 'string',
                align: 'center',
                flex: 1
            }, {
                text: BILLING_LABEL.price,
                dataIndex: 'price',
                searchType: 'float',
                align: 'center',
                flex: 1
            }, {
                text: BILLING_LABEL.moduleId,
                dataIndex: 'moduleId',
                searchType: 'int',
                align: 'center',
                flex: 1
            }, {
                text: BILLING_LABEL.createUserId,
                dataIndex: 'createUserId',
                searchType: 'int',
                align: 'center',
                flex: 1
            }, {
                text: BILLING_LABEL.onlyOne,
                dataIndex: 'onlyOne',
                searchType: 'int',
                align: 'center',
                flex: 1
            }, {
                text: BILLING_LABEL.global,
                dataIndex: 'global',
                searchType: 'int',
                align: 'center',
                flex: 1
            }, {
                text: BILLING_LABEL.ctime,
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
                text: BILLING_LABEL.utime,
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
                text: BILLING_LABEL.serviceTime,
                dataIndex: 'serviceTime',
                searchType: 'int',
                align: 'center',
                flex: 1
            }, {
                text: BILLING_LABEL.status,
                dataIndex: 'status',
                searchType: 'string',
                align: 'center',
                flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    var value = '';
                    if(v=='NO_USE'){
                        value = "未使用"
                    }else{
                        value = "使用中"

                    }
                    return value;
                }
            }
        );

        var me = this;

        function buildBillingOptMenu1(){
            var menu = Ext.create('Ext.menu.Menu', {
                name : 'billingoperation1',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: [{
                    text: BILLING_LABEL.defaultBilling,
                    disabled: true,
                    name: 'defaultBilling',
                    iconCls: 'pool_setting'
                },{
                    text: BILLING_LABEL.editBilling,
                    disabled: true,
                    name: 'editBilling',
                    iconCls: 'extensive-edit'
                },{
                    text: BILLING_LABEL.delBilling,
                    disabled: true,
                    name: 'delBilling',
                    iconCls: 'x-del-icon'
                }]
            });
            return menu;
        };


        me.contextMenu = buildBillingOptMenu1();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {


                    var records = sm2.getSelection(),
                        rightedefaultBilling = me.contextMenu.down('menuitem[name=defaultBilling]'),
                        righteditBilling = me.contextMenu.down('menuitem[name=editBilling]'),
                        rightdelBilling = me.contextMenu.down('menuitem[name=delBilling]');

                    var statusT = -1;

                    /*判断所选状态是否一致*/
                    Ext.each(records, function(record, index, rs){
                        if (statusT == -1) {
                            statusT = record.data.status;
                        } else if (statusT != record.data.status){
                            statusT = -1;
                            return false;
                        }
                    });


                    if (sm2.getCount() > 0 && statusT != -1) {
                        if(sm2.getCount() > 1){
                            rightedefaultBilling.disable();
                            righteditBilling.disable();
                            rightdelBilling.disable();
                        }else{
                            rightedefaultBilling.enable();
                            righteditBilling.enable();
                            rightdelBilling.enable();
                        }
                    } else {
                        rightedefaultBilling.disable();
                        righteditBilling.disable();
                        rightdelBilling.disable();
                    }

                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: BILLING_MESSAGE.noBilling
            },
            store: Ext.data.StoreManager.lookup("Module.CustomModule.modulemanager.store.BillingStore"),
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var callbackFun = function () {
            me.selModel.deselectAll();
            me.updateView(me);
        };

        var sm = me.selModel,
            addBillingItem = me.down('button[name=addBillingButton]');

        var keyupFunc = function(){
            var name = Ext.getCmp("name").getValue(),
                price = Ext.getCmp("price").getValue(),
                serviceTime= Ext.getCmp("serviceTime").getValue();
            var saveBtn = Ext.getCmp("saveBtn");
            if(name == '' || price == ''||serviceTime==''){
                saveBtn.disable();
            }else{
                saveBtn.enable();
            }
        }


        var doAddBillingFunc = function () {
            Module.CustomModule.modulemanager.Operation.doAddBillingFunction(me.moduleid,keyupFunc,callbackFun);
        }
        addBillingItem.on('click', doAddBillingFunc);


        var doEditBillingFunc = function () {
            var records = sm.getSelection();
            Module.CustomModule.modulemanager.Operation.doEditBillingFunction(me.moduleid,records[0].data,callbackFun);
        };
        me.contextMenu.down('menuitem[name=editBilling]').on('click', doEditBillingFunc);

        var doDelBillingFunc = function(){
            var records = sm.getSelection();
            Module.CustomModule.modulemanager.Operation.doDelBillingFunction(me,records,callbackFun);
        };

        me.contextMenu.down('menuitem[name=delBilling]').on('click', doDelBillingFunc);

        var doSetDefaultBillingFunc = function(){
            var records = sm.getSelection();
            Module.CustomModule.modulemanager.Operation.doSetDefaultBillingFunction(me.moduleid,records[0].data,callbackFun);

        }
        me.contextMenu.down('menuitem[name=defaultBilling]').on('click', doSetDefaultBillingFunc);

    }
});