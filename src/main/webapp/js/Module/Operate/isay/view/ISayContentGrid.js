Ext.define('Module.Operate.isay.view.ISayContentGrid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.ISayContentGrid',
    config : {
        isayTopicRecord : undefined
    },
    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Operate.isay.store.ISayContentStore'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: ISAY_CONTENT_LABEL.userName,
                dataIndex: 'userName',
                searchType: 'string',
                align: 'center',
                width: 100
            }, {
                text: ISAY_CONTENT_LABEL.content,
                dataIndex: 'content',
                searchType: 'string',
                align: 'left',
                width: 600
            }, {
                text: ISAY_CONTENT_LABEL.ctime,
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
            }
        );

        var me = this;

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {}
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: Ext.data.StoreManager.lookup("Module.Operate.isay.store.ISayContentStore")
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
    }
});