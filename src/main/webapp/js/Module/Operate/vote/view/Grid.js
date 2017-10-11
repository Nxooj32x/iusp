Ext.define('Module.Operate.vote.view.Grid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.votegrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Operate.vote.Data',
        'Module.Operate.vote.Renderer'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Operate.vote.Renderer;
        var comboData = Module.Operate.vote.Config.COMBO_DATA;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: VOTE_TOPIC_LABEL.title,
                dataIndex: 'title',
                searchType: 'string',
                align: 'center',
                width: 200
            }, {
                text:VOTE_TOPIC_LABEL.logo, dataIndex:'logo',sortable: false,  searchType:'string', align:'center', flex:1,
                renderer : function(v, u, r, rowIndex, columnIndex, s){
                    if(v == null){
                        return "";
                    }
                    v=v+"?imageView2/1/w/100/h/50/format/jpg";
                    return "<img style='width:100px;height:50px;' src="+v+" ></img>";
                }

            }, {
                text: VOTE_TOPIC_LABEL.remark,
                dataIndex: 'remark',
                searchType: 'string',
                align: 'center',
                width: 600
            }, {
                text: VOTE_TOPIC_LABEL.source,
                dataIndex: 'source',
                searchType: 'combo',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateVoteTopicSource(v);
                },
                comboData: comboData.source
            }, {
                text: VOTE_TOPIC_LABEL.createrName,
                dataIndex: 'createrName',
                searchType: 'string',
                align: 'center',
                width: 100
            }, {
                text: VOTE_TOPIC_LABEL.useCount,
                dataIndex: 'useCount',
                searchType: 'number',
                align: 'center',
                width: 100
            }, {
                text: VOTE_TOPIC_LABEL.ctime,
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
                text: VOTE_TOPIC_LABEL.etime,
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
        me.contextMenu = me.portlet.buildVoteOptMenu();

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

                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: Ext.data.StoreManager.lookup("Module.Operate.vote.store.VoteTopicStore"),
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

    }
});