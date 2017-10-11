Ext.define('Module.CustomModule.modulemanager.view.Grid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.modulegrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.CustomModule.modulemanager.Data',
        'Module.CustomModule.modulemanager.Renderer'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.CustomModule.modulemanager.Renderer;
        var comboData = Module.CustomModule.modulemanager.Config.COMBO_DATA;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: MODULE_LABEL.name,
                dataIndex: 'name',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text:MODULE_LABEL.logo, dataIndex:'logo',sortable: false,  searchType:'string', align:'center', flex:1,
                renderer : function(v, u, r, rowIndex, columnIndex, s){
                    if(v == null){
                        return "";
                    }
                    v=v+"?imageView2/1/w/100/h/50/format/jpg";
                    return "<img style='width:50px;height:25px;' src="+v+" ></img>";
                }

            }, {
                text: MODULE_LABEL.code,
                dataIndex: 'code',
                searchType: 'string',
                align: 'left',
                width: 200
            },{
                text: MODULE_LABEL.showInShop,
                dataIndex: 'showInShop',
                searchType: 'boolean',
                align: 'left',
                width: 200,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    if (v == null) {
                        return "未知";
                    }else if(v){
                        return "是";
                    }else{
                        return "否";
                    }
                }
            }, {
                text: MODULE_LABEL.type,
                dataIndex: 'type',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: MODULE_LABEL.defaultBillingWay,
                dataIndex: 'defaultBillingWay',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: MODULE_LABEL.createUserId,
                dataIndex: 'createUserId',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: MODULE_LABEL.status,
                dataIndex: 'status',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: MODULE_LABEL.useNum,
                dataIndex: 'useNum',
                searchType: 'number',
                align: 'center',
                width: 200
            }, {
                text: MODULE_LABEL.ctime,
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
                text: MODULE_LABEL.utime,
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
            }
        );

        var me = this;
        me.contextMenu = me.portlet.buildModuleOptMenu();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();
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

                    addModule = me.portlet.down('menuitem[name=addModule]');
                    addModule.enable();
                    editModule = me.portlet.down('menuitem[name=editModule]');
                    righteditModule = me.contextMenu.down('menuitem[name=editModule]');

                    delModule = me.portlet.down('menuitem[name=delModule]');
                    rightdelModule = me.contextMenu.down('menuitem[name=delModule]');

                    billingManager = me.portlet.down('menuitem[name=billingManager]');
                    rightbillingManager = me.contextMenu.down('menuitem[name=billingManager]');

                    configManager = me.portlet.down('menuitem[name=configManager]');
                    rightconfigManager = me.contextMenu.down('menuitem[name=configManager]');

                    if (sm2.getCount() > 0 && statusT != -1) {
                        if(sm2.getCount() > 1){
                            editModule.disable();
                            delModule.disable();
                            billingManager.disable();
                            configManager.disable();
                            righteditModule.disable();
                            rightdelModule.disable();
                            rightbillingManager.disable();
                            rightconfigManager.disable();
                        }else{
                            editModule.enable();
                            delModule.enable();
                            billingManager.enable();
                            configManager.enable();

                            righteditModule.enable();
                            rightdelModule.enable();
                            rightbillingManager.enable();
                            rightconfigManager.enable();
                        }
                    } else {
                        editModule.disable();
                        delModule.disable();
                        billingManager.disable();
                        configManager.disable();

                        righteditModule.disable();
                        rightdelModule.disable();
                        rightbillingManager.disable();
                        rightconfigManager.disable();
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
            store: Ext.data.StoreManager.lookup("Module.CustomModule.modulemanager.store.ModuleStore")
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var callbackFun = function(){
            me.selModel.deselectAll();
            me.updateView(me);
        };

        var sm = me.selModel,
            addModule = me.portlet.down('menuitem[name=addModule]'),
            editModule = me.portlet.down('menuitem[name=editModule]'),
            delModule =  me.portlet.down('menuitem[name=delModule]'),

            billingManager = me.portlet.down('menuitem[name=billingManager]'),
            configManager = me.portlet.down('menuitem[name=configManager]');


        var keyupFunc = function(){
            var name = Ext.getCmp("name").getValue(),
                code = Ext.getCmp("code").getValue();
            var saveBtn = Ext.getCmp("saveBtn");
            if(name == '' || code == ''){
                saveBtn.disable();
            }else{
                saveBtn.enable();
            }
        };
        var addModuleFunc = function(){
            Module.CustomModule.modulemanager.Operation.doAddModuleFunction(me,keyupFunc,callbackFun);
        };
        addModule.on('click', addModuleFunc);

        var editModuleFunc = function(){
            var records = sm.getSelection();
            Module.CustomModule.modulemanager.Operation.doEditModuleFunction(records[0].data,callbackFun);
        };
        editModule.on("click",editModuleFunc);

        var delModuleFunc = function(){
            var records = sm.getSelection();
            Module.CustomModule.modulemanager.Operation.doDelModuleFunction(records,callbackFun);
        };
        delModule.on("click",delModuleFunc);


        var billingFunc = function(){
            var records = sm.getSelection();
            Module.CustomModule.modulemanager.Operation.doManageBillingFunction(records[0].data,callbackFun);
        };
        billingManager.on("click",billingFunc);

        var configFunc = function(){
            var records = sm.getSelection();
            Module.CustomModule.modulemanager.Operation.doManageConfigFunction(records[0].data,callbackFun);
        };
        configManager.on("click",configFunc);

        me.contextMenu.down('menuitem[name=addModule]').on('click', addModuleFunc);

        me.contextMenu.down('menuitem[name=editModule]').on('click', editModuleFunc);
        me.contextMenu.down('menuitem[name=delModule]').on('click', delModuleFunc);

        me.contextMenu.down('menuitem[name=billingManager]').on('click', billingFunc);
        me.contextMenu.down('menuitem[name=configManager]').on('click', configFunc);

    }
});