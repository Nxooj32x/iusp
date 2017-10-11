Ext.define('Module.Operate.activity.view.Grid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.activitygrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Operate.activity.Data',
        'Module.Operate.activity.Renderer'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Operate.activity.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: ACTIVITY_LABEL.name, dataIndex: 'name', searchType: 'string', align: 'center', flex: 1

            }, {
                text: ACTIVITY_LABEL.code,
                dataIndex: 'code',
                sortable: false,
                searchType: 'string',
                align: 'center',
                flex: 1

            }, {
                text: ACTIVITY_LABEL.banner, dataIndex: 'banner', searchType: 'string', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateBanner(v);
                }

            }, {
                text: ACTIVITY_LABEL.describe,
                dataIndex: 'describe',
                sortable: false,
                searchType: 'string',
                align: 'center',
                flex: 1
            }, {
                text: ACTIVITY_LABEL.state, dataIndex: 'state', searchType: 'combo', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateActivityStatus(v);
                },
                comboData: ACTIVITY_LABEL.state
            }, {
                text: ACTIVITY_LABEL.beginTime, dataIndex: 'beginTime', searchType: 'date', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateCtime(v);
                }
            }, {
                text: ACTIVITY_LABEL.endTime, dataIndex: 'endTime', searchType: 'date', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateCtime(v);
                }
            }, {
                text: ACTIVITY_LABEL.ctime, dataIndex: 'ctime', searchType: 'date', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateCtime(v);
                }
            }, {
                text: ACTIVITY_LABEL.userName, dataIndex: 'userName', searchType: 'string', align: 'center', flex: 1
            }, {
                text: ACTIVITY_LABEL.browseNub,
                dataIndex: 'browseNub',
                sortable: false,
                searchType: 'number',
                align: 'center',
                flex: 1
            }, {
                text: ACTIVITY_LABEL.joinNub,
                dataIndex: 'joinNub',
                searchType: 'number',
                sortable: false,
                align: 'center',
                flex: 1
            }, {
                text: ACTIVITY_LABEL.link, dataIndex: 'link', searchType: 'string', align: 'center', flex: 1
            }
        );

        var me = this;
        me.contextMenu = me.portlet.buildActivityOptMenu();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();
                    var statusT = -1;
                    /*判断所选状态是否一致*/
                    Ext.each(records, function (record, index, rs) {
                        if (statusT == -1) {
                            statusT = record.data.state;
                        } else if (statusT != record.data.state) {
                            statusT = -1;
                            return false;
                        }
                    });


                    var rightAddActivity = me.contextMenu.down('menuitem[name=addActivity]');
                    var topAddActivity = me.portlet.down('menuitem[name=addActivity]');

                    var delActivityRight = me.contextMenu.down('menuitem[name=delActivity]');
                    var delActivityTop = me.portlet.down('menuitem[name=delActivity]');


                    var editActivityRight = me.contextMenu.down('menuitem[name=editActivity]');
                    var editActivityTop = me.portlet.down('menuitem[name=editActivity]');


                    var openActivityRight = me.contextMenu.down('menuitem[name=openActivity]');
                    var openActivityTop = me.portlet.down('menuitem[name=openActivity]');

                    var closeActivityRight = me.contextMenu.down('menuitem[name=closeActivity]');
                    var closeActivityTop = me.portlet.down('menuitem[name=closeActivity]');

                    var showActivityJoinInfoRight = me.contextMenu.down('menuitem[name=showActivityJoinInfo]');
                    var showActivityJoinInfoTop = me.portlet.down('menuitem[name=showActivityJoinInfo]');

                    rightAddActivity.enable();
                    topAddActivity.enable();

                    if (records.length > 0) {
                        delActivityRight.enable();
                        delActivityTop.enable();
                    } else {
                        delActivityRight.disable();
                        delActivityTop.disable();
                    }

                    if (records.length == 1) {
                        editActivityRight.enable();
                        editActivityTop.enable();
                        showActivityJoinInfoRight.enable();
                        showActivityJoinInfoTop.enable();

                        if (statusT == Module.Operate.activity.model.ActivityModel.STATE_PROCEED) {
                            closeActivityRight.enable();
                            closeActivityTop.enable();
                            openActivityRight.disable();
                            openActivityTop.disable();

                        } else {
                            openActivityRight.enable();
                            openActivityTop.enable();
                            closeActivityRight.disable();
                            closeActivityTop.disable();
                        }

                    } else {

                        editActivityRight.disable();
                        editActivityTop.disable();
                        showActivityJoinInfoRight.disable();
                        showActivityJoinInfoTop.disable();

                        if (statusT == -1) {
                            openActivityRight.disable();
                            openActivityTop.disable();
                            closeActivityRight.disable();
                            closeActivityTop.disable();
                        } else {
                            if (statusT == Module.Operate.activity.model.ActivityModel.STATE_PROCEED) {
                                closeActivityRight.enable();
                                closeActivityTop.enable();
                                openActivityRight.disable();
                                openActivityTop.disable();

                            } else {
                                openActivityRight.enable();
                                openActivityTop.enable();
                                closeActivityRight.disable();
                                closeActivityTop.disable();
                            }
                        }

                    }

                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: ACTIVITY_MESSAGE.noActivity
            },
            store: Ext.data.StoreManager.lookup("Module.Operate.activity.store.ActivityStore"),
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var callbackFun = function () {
            me.getSelectionModel().clearSelections();
            //	me.updateView(me);
            current = me.store.currentPage;
            if (me.fireEvent('beforechange', me, current) !== false) {
                me.store.loadPage(current);
            }

        };

        var sm = me.selModel;


        var rightAddActivity = me.contextMenu.down('menuitem[name=addActivity]');
        var topAddActivity = me.portlet.down('menuitem[name=addActivity]');

        var delActivityRight = me.contextMenu.down('menuitem[name=delActivity]');
        var delActivityTop = me.portlet.down('menuitem[name=delActivity]');


        var editActivityRight = me.contextMenu.down('menuitem[name=editActivity]');
        var editActivityTop = me.portlet.down('menuitem[name=editActivity]');


        var openActivityRight = me.contextMenu.down('menuitem[name=openActivity]');
        var openActivityTop = me.portlet.down('menuitem[name=openActivity]');

        var closeActivityRight = me.contextMenu.down('menuitem[name=closeActivity]');
        var closeActivityTop = me.portlet.down('menuitem[name=closeActivity]');

        var showActivityJoinInfoRight = me.contextMenu.down('menuitem[name=showActivityJoinInfo]');
        var showActivityJoinInfoTop = me.portlet.down('menuitem[name=showActivityJoinInfo]');

        //显示参与情况
        var showActivityJoinInfoFunc = function (item, e, eOpts) {

            var records = sm.getSelection();
            if (records.length == 1) {

                window.open("/admin/activity/" + records[0].data.code + "/detail/");
            }
        };
        showActivityJoinInfoRight.on('click', showActivityJoinInfoFunc);
        showActivityJoinInfoTop.on('click', showActivityJoinInfoFunc);


        //新增
        var rightAddActivityFunc = function () {
            Module.Operate.activity.Operation.doAddActivityFunction(callbackFun);
        };
        rightAddActivity.on('click', rightAddActivityFunc);
        topAddActivity.on('click', rightAddActivityFunc);

        //编辑
        var editActivityFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length == 1) {
                Module.Operate.activity.Operation.doEditActivityFunction(records[0].data, callbackFun);
            }
        };
        editActivityRight.on('click', editActivityFunc);
        editActivityTop.on('click', editActivityFunc);

        //删除 
        var delActivityFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Operate.activity.Operation.doDelActivityStateFunc(records, callbackFun);
            }
        };

        delActivityRight.on('click', delActivityFunc);
        delActivityTop.on('click', delActivityFunc);

        //开启
        var openActivityFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Operate.activity.Operation.doChangeActivityStateFunc(records, Module.Operate.activity.model.ActivityModel.STATE_PROCEED, callbackFun);
            }
        };
        openActivityRight.on('click', openActivityFunc);
        openActivityTop.on('click', openActivityFunc);


        //关闭
        var closeActivityFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Operate.activity.Operation.doChangeActivityStateFunc(records, Module.Operate.activity.model.ActivityModel.STATE_CLOSE, callbackFun);
            }
        };
        closeActivityRight.on('click', closeActivityFunc);
        closeActivityTop.on('click', closeActivityFunc);
    }
});