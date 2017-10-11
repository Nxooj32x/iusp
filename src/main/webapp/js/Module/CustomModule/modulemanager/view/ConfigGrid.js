Ext.define('Module.CustomModule.modulemanager.view.ConfigGrid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.configgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.CustomModule.modulemanager.Data',
        'Module.CustomModule.modulemanager.Renderer',
        'Module.CustomModule.modulemanager.store.ConfigStore'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.CustomModule.modulemanager.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: CONFIG_LABEL.name,
                dataIndex: 'name',
                searchType: 'string',
                align: 'center',
                flex: 1
            }, {
                text: CONFIG_LABEL.key,
                dataIndex: 'key',
                searchType: 'string',
                align: 'center',
                flex: 1
            }, {
                text: CONFIG_LABEL.type,
                dataIndex: 'type',
                searchType: 'string',
                align: 'center',
                flex: 1
            }, {
                text: CONFIG_LABEL.moduleId,
                dataIndex: 'moduleId',
                searchType: 'int',
                align: 'center',
                flex: 1
            }, {
                text: CONFIG_LABEL.createUserId,
                dataIndex: 'createUserId',
                searchType: 'int',
                align: 'center',
                flex: 1
            }, {
                text: CONFIG_LABEL.maxNum,
                dataIndex: 'maxNum',
                searchType: 'int',
                align: 'center',
                flex: 1
            }, {
                text: CONFIG_LABEL.isOrder,
                dataIndex: 'isOrder',
                searchType: 'boolean',
                align: 'center',
                flex: 1
            }, {
                text: CONFIG_LABEL.required,
                dataIndex: 'required',
                searchType: 'boolean',
                align: 'center',
                flex: 1
            }, {
                text: CONFIG_LABEL.ctime,
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
                text: CONFIG_LABEL.utime,
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
                text: CONFIG_LABEL.defaultValue,
                dataIndex: 'defaultValue',
                searchType: 'string',
                align: 'center',
                flex: 1
            }
        );

        var me = this;

        function buildConfigOptMenu1(){
            var menu = Ext.create('Ext.menu.Menu', {
                name : 'configoperation1',
                style: {
                    overflow: 'visible'     // For the Combo popup
                },
                items: [{
                    text: CONFIG_LABEL.editConfig,
                    disabled: true,
                    name: 'editConfig',
                    iconCls: 'extensive-edit'
                },{
                    text: CONFIG_LABEL.delConfig,
                    disabled: true,
                    name: 'delConfig',
                    iconCls: 'x-del-icon'
                }]
            });
            return menu;
        };
        me.contextMenu = buildConfigOptMenu1();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection(),

                        righteditConfig = me.contextMenu.down('menuitem[name=editConfig]'),
                        rightdelConfig = me.contextMenu.down('menuitem[name=delConfig]');

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
                            righteditConfig.disable();
                            rightdelConfig.disable();
                        }else{
                            righteditConfig.enable();
                            rightdelConfig.enable();
                        }
                    } else {
                        righteditConfig.disable();
                        rightdelConfig.disable();
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
            store: Ext.data.StoreManager.lookup("Module.CustomModule.modulemanager.store.ConfigStore"),
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

        var sm = me.selModel;
        var addConfigItem = me.down('button[name=addConfigButton]');


        var keyupFunc = function(){
            var name = Ext.getCmp("name").getValue(),
                key = Ext.getCmp("key").getValue(),
                maxNum= Ext.getCmp("maxNum").getValue();
            var saveBtn = Ext.getCmp("saveBtn");
            if(name == '' || key == ''||maxNum==''){
                saveBtn.disable();
            }else{
                saveBtn.enable();
            }
        };
        var doAddConfigFunc = function (item, e, eOpts) {
            Module.CustomModule.modulemanager.Operation.doAddConfigFunction(me.moduleid,keyupFunc,callbackFun);
        }
        addConfigItem.on('click', doAddConfigFunc);

        var doEditConfigFunc =function(){
            var records = sm.getSelection();
            Module.CustomModule.modulemanager.Operation.doEditConfigFunction(me.moduleid,records[0].data,callbackFun);
        };
        me.contextMenu.down('menuitem[name=editConfig]').on('click', doEditConfigFunc);

        var doDelConfigFunc = function(){
            var records = sm.getSelection();
            Module.CustomModule.modulemanager.Operation.doDelConfigFunction(me.moduleid,records,callbackFun);
        }
        me.contextMenu.down('menuitem[name=delConfig]').on('click', doDelConfigFunc);
    }
});