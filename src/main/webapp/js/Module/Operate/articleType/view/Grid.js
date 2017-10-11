Ext.define('Module.Operate.articleType.view.Grid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.activitygrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Operate.articleType.Data',
        'Module.Operate.articleType.Renderer'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Operate.articleType.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: ARTICLE_LABEL.name, dataIndex: 'name', searchType: 'string', align: 'center', flex: 1

            }, {
                text: ARTICLE_LABEL.seq, dataIndex: 'seq', searchType: 'number', align: 'center', flex: 1
            }, {
                text: ARTICLE_LABEL.tag, dataIndex: 'tag', searchType: 'string', align: 'center', flex: 1

            }, {
                text: ARTICLE_LABEL.module, dataIndex: 'module', searchType: 'string', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateModule(v);
                }
            }, {
                text: ARTICLE_LABEL.state, dataIndex: 'state', searchType: 'combo', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateArticleStatus(v);
                },
                comboData: ARTICLE_LABEL.state
            }, {
                text: ARTICLE_LABEL.describtion,
                dataIndex: 'describtion',
                searchType: 'string',
                align: 'center',
                flex: 1

            }, {
                text: ARTICLE_LABEL.ctime, dataIndex: 'ctime', searchType: 'date', align: 'center', flex: 1,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateCtime(v);
                }
            }, {
                text: ARTICLE_LABEL.userName, dataIndex: 'userName', searchType: 'string', align: 'center', flex: 1
            }
        );

        var me = this;
        me.contextMenu = me.portlet.buildArticleOptMenu();

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


                    var rightAddArticle = me.contextMenu.down('menuitem[name=addArticle]');
                    var topAddArticle = me.portlet.down('menuitem[name=addArticle]');

                    var delArticleRight = me.contextMenu.down('menuitem[name=delArticle]');
                    var delArticleTop = me.portlet.down('menuitem[name=delArticle]');


                    var editArticleRight = me.contextMenu.down('menuitem[name=editArticle]');
                    var editArticleTop = me.portlet.down('menuitem[name=editArticle]');


                    var openArticleRight = me.contextMenu.down('menuitem[name=openArticle]');
                    var openArticleTop = me.portlet.down('menuitem[name=openArticle]');

                    var closeArticleRight = me.contextMenu.down('menuitem[name=closeArticle]');
                    var closeArticleTop = me.portlet.down('menuitem[name=closeArticle]');

                    rightAddArticle.enable();
                    topAddArticle.enable();

                    if (records.length > 0) {
                        delArticleRight.enable();
                        delArticleTop.enable();
                    } else {
                        delArticleRight.disable();
                        delArticleTop.disable();
                    }

                    if (records.length == 1) {
                        editArticleRight.enable();
                        editArticleTop.enable();
                        if (statusT == Module.Operate.articleType.model.ArticleTypeModel.STATE_OPEN) {
                            closeArticleRight.enable();
                            closeArticleTop.enable();
                            openArticleRight.disable();
                            openArticleTop.disable();

                        } else {
                            openArticleRight.enable();
                            openArticleTop.enable();
                            closeArticleRight.disable();
                            closeArticleTop.disable();
                        }

                    } else {

                        editArticleRight.disable();
                        editArticleTop.disable();

                        if (statusT == -1) {
                            openArticleRight.disable();
                            openArticleTop.disable();
                            closeArticleRight.disable();
                            closeArticleTop.disable();
                        } else {
                            if (statusT == Module.Operate.articleType.model.ArticleTypeModel.STATE_OPEN) {
                                closeArticleRight.enable();
                                closeArticleTop.enable();
                                openArticleRight.disable();
                                openArticleTop.disable();

                            } else {
                                openArticleRight.enable();
                                openArticleTop.enable();
                                closeArticleRight.disable();
                                closeArticleTop.disable();
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
                emptyText: ARTICLE_LABEL.noActivity
            },
            store: Ext.data.StoreManager.lookup("Module.Operate.articleType.store.ArticleTypeStore"),
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


        var rightAddArticle = me.contextMenu.down('menuitem[name=addArticle]');
        var topAddArticle = me.portlet.down('menuitem[name=addArticle]');

        var delArticleRight = me.contextMenu.down('menuitem[name=delArticle]');
        var delArticleTop = me.portlet.down('menuitem[name=delArticle]');


        var editArticleRight = me.contextMenu.down('menuitem[name=editArticle]');
        var editArticleTop = me.portlet.down('menuitem[name=editArticle]');


        var openArticleRight = me.contextMenu.down('menuitem[name=openArticle]');
        var openArticleTop = me.portlet.down('menuitem[name=openArticle]');

        var closeArticleRight = me.contextMenu.down('menuitem[name=closeArticle]');
        var closeArticleTop = me.portlet.down('menuitem[name=closeArticle]');


        //新增
        var rightAddArticleFunc = function () {
            Module.Operate.articleType.Operation.doAddArticleFunction(callbackFun);
        };
        rightAddArticle.on('click', rightAddArticleFunc);
        topAddArticle.on('click', rightAddArticleFunc);

        //编辑
        var editArticleFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length == 1) {
                Module.Operate.articleType.Operation.doEditArticleFunction(records[0].data, callbackFun);
            }
        };
        editArticleRight.on('click', editArticleFunc);
        editArticleTop.on('click', editArticleFunc);

        //删除 
        var delArticleTypeFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {

                Module.Operate.articleType.Operation.doDelArticleFunc(records, callbackFun);
            }
        };

        delArticleRight.on('click', delArticleTypeFunc);
        delArticleTop.on('click', delArticleTypeFunc);

        //开启
        var openArticleTypeFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Operate.articleType.Operation.doChangeArticleStateFunc(records, Module.Operate.articleType.model.ArticleTypeModel.STATE_OPEN, callbackFun);
            }
        };
        openArticleRight.on('click', openArticleTypeFunc);
        openArticleTop.on('click', openArticleTypeFunc);


        //关闭
        var closeArticleTypeFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Operate.articleType.Operation.doChangeArticleStateFunc(records, Module.Operate.articleType.model.ArticleTypeModel.STATE_CLOSE, callbackFun);
            }
        };
        closeArticleRight.on('click', closeArticleTypeFunc);
        closeArticleTop.on('click', closeArticleTypeFunc);
    }
});