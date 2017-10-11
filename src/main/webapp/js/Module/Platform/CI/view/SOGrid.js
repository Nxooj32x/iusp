Ext.define('Module.Platform.CI.view.SOGrid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.sogrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
    ],

    checkIndexes: ['phone'], //默认选择的列
    disableIndexes: [],
    
    initFilter : [],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Store.StoreOwner.Renderer;
        var comboData = Module.Store.StoreOwner.Config.COMBO_DATA;
        columns.push(
            {
                text: "ID",
                dataIndex: 'id',
                searchType: 'number',
                align: 'left',
                width: 30
            },
            {
                text: STOREOWNER_LABEL.contacts,
                dataIndex: 'contacts',
                searchType: 'string',
                align: 'left',
                width: 100
            }, {
                text: STOREOWNER_LABEL.phone,
                dataIndex: 'phone',
                searchType: 'string',
                align: 'left',
                width: 100
            }, {
                text: STOREOWNER_LABEL.storeNum,
                dataIndex: 'storeNum',
                searchType: 'number',
                align: 'center',
                width: 80
            }, {
                text: STOREOWNER_LABEL.status,
                dataIndex: 'status',
                searchType: 'combo',
                align: 'left',
                width: 50,
	            comboData : comboData.status,
	            renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                return STORE_COMBO.status[v] || v;
	            }
            }, {
                text: STOREOWNER_LABEL.ctime,
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
            },{
            	text: "绑定",
				xtype : 'actioncolumn',
				dataIndex : 'contactLogs',
				width: 80,
				editor : false,
				align : 'center',
				items : [{
					icon : '/img/icon/port.png',
				    text : '绑定',
					tooltip : '绑定',
					name : 'view',
					scope : this,
					handler : this.onBindingClick,
					isDisabled : function(v, r, c, item, r) {
					}
				}]
			}
        );

        var me = this;
        //me.contextMenu = me.portlet.buildStoreOptMenu();

        var sm = new Ext.selection.CheckboxModel({
        	mode : 'SINGLE',
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();
                }
            }
        });

        var store = Ext.create("Module.Store.StoreOwner.store.StoreOwnerStore");

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "没有未绑定的服务商账户"
            },
            store: store
        });
        me.getStore().load();
        this.callParent(arguments);
    },

    onBindingClick : function(view ,rowIndex, colIndex, item, e, record, row){
    	var me = this;
		var soid = record.data.id;
		Module.Store.StoreOwner.Operation.doSoCiBinding(soid, me.customerInfo.id, function(){
			view.up('window').close();
		});
    },

    afterRender: function () {
        var me = this;

        me.callParent(arguments);

        var callbackFun = function(){
            me.selModel.deselectAll();
            me.updateView(me);
        };
        
        me.updateView(me);
    }

});