Ext.define('Module.Store.storemanager.view.StoreShopGrid', {
    extend: 'Soul.view.SearchGrid',
    alias: 'widget.storegrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Store.storemanager.Data',
        'Module.Store.storemanager.Renderer',
        'Module.Store.storemanager.store.StoreshopStore'
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
                text: STORE_LABEL.name,
                dataIndex: 'name',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STORE_LABEL.appId,
                dataIndex: 'appId',
                searchType: 'string',
                align: 'left',
                width: 200
            },  {
                text:STORE_LABEL.logo, dataIndex:'logo',sortable: false,  searchType:'string', align:'center', flex:1,
                renderer : function(v, u, r, rowIndex, columnIndex, s){
                    if(v == null){
                        return "";
                    }
                    v=v+"?imageView2/1/w/100/h/50/format/jpg";
                    return "<img style='width:50px;height:25px;' src="+v+" ></img>";
                }

            }, {
                text: STORE_LABEL.status,
                dataIndex: 'status',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STORE_LABEL.viewTplId,
                dataIndex: 'viewTplId',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STORE_LABEL.createUserId,
                dataIndex: 'createUserId',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text: STORE_LABEL.ctime,
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
                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: Ext.data.StoreManager.lookup("Module.Store.storemanager.store.StoreshopStore")
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var callbackFun = function(){
            me.updateView(me);
        };

    }
});