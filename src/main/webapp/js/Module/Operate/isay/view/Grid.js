Ext.define('Module.Operate.isay.view.Grid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.activitygrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Operate.isay.Data',
        'Module.Operate.isay.Renderer'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Operate.isay.Renderer;
        var comboData = Module.Operate.isay.Config.COMBO_DATA;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: ISAY_TOPIC_LABEL.topic,
                dataIndex: 'topic',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text:ISAY_TOPIC_LABEL.logo, dataIndex:'logo',sortable: false,  searchType:'string', align:'center', flex:1,
                renderer : function(v, u, r, rowIndex, columnIndex, s){
                    if(v == null){
                        return "";
                    }
                    v=v+"?imageView2/1/w/100/h/50/format/jpg";
                    return "<img style='width:50px;height:25px;' src="+v+" ></img>";
                }

            }, {
                text: ISAY_TOPIC_LABEL.description,
                dataIndex: 'description',
                searchType: 'string',
                align: 'left',
                width: 600
            }, {
                text: ISAY_TOPIC_LABEL.source,
                dataIndex: 'source',
                searchType: 'combo',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateIsayTopicSource(v);
                },
                comboData: comboData.source
            }, {
                text: ISAY_TOPIC_LABEL.createrName,
                dataIndex: 'createrName',
                searchType: 'string',
                align: 'center',
                width: 100
            }, {
                text: ISAY_TOPIC_LABEL.useCount,
                dataIndex: 'useCount',
                searchType: 'number',
                align: 'center',
                width: 100
            }, {
                text: ISAY_TOPIC_LABEL.ctime,
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
                text: ISAY_TOPIC_LABEL.etime,
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
            }
        );

        var me = this;
        me.contextMenu = me.portlet.buildIsayOptMenu();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();
                    var showISayContentBtnRight = me.contextMenu.down('menuitem[name=show]');
                    showISayContentBtnRight.enable();
                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: Ext.data.StoreManager.lookup("Module.Operate.isay.store.ISayTopicStore")
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var callbackFun = function () {
            //	me.updateView(me);
            current = me.store.currentPage;
            if (me.fireEvent('beforechange', me, current) !== false) {
                me.store.loadPage(current);
            }
        };

        var sm = me.selModel;

        var showISayContentBtnRight = me.contextMenu.down('menuitem[name=show]');

        //消息明细
        var showISayContentFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            if (records.length > 0) {
                Module.Operate.isay.Operation.viewISayContentFunction(records[0].data, callbackFun);
            }
        };
        showISayContentBtnRight.on('click', showISayContentFunc);
    }
});