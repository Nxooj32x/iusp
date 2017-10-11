Ext.define('Module.Platform.CI.view.ContactLogGrid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.clgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Platform.CI.Data',
        'Module.Platform.CI.Renderer',
        'Module.Platform.CI.model.ContactLog'
    ],

    checkIndexes : [ ], // 默认选择的列
    disableIndexes: [],
    
    flex : 1,
    
    customerInfo: {},

    initComponent: function () {
		var me = this;
    
    	var dict = Module.Platform.CI.Data;
        var columns = new Array();
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: "沟通方式",
                dataIndex: 'contactWay',
                searchType : 'combo',
                comboData : dict.contactWayCombo,
                align: 'left',
                width: 80

            }, {
                text: "沟通号码",
                dataIndex: 'contactNum',
                searchType: 'string',
                align: 'left',
                width: 100
            }, {
	            text: "沟通时间",
	            dataIndex: 'contactTime',
	            searchType: 'date',
	            align: 'center',
	            width: 150,
	            renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                if (v == null) {
	                    return "未知";
	                }
	                return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
	            }
	        }, {
                text : "沟通内容",
                dataIndex: 'contactContent',
                searchType: 'string',
                align: 'left',
                width: 500
            }, {
                text : "客户反馈",
                dataIndex: 'customerFeedback',
                searchType: 'string',
                align: 'left',
                width: 100
            }, {
                text: "备注",
	            dataIndex: 'remarks',
	            searchType: 'string',
	            align: 'left',
	            width: 200
	        }, {
                text : "录入人",
                dataIndex: 'commerceName',
                searchType: 'string',
                align: 'left',
                width: 200
            },{
				xtype : 'actioncolumn',
				width : 80,
				text: "操作",
				dataIndex : 'pdf',
				editor : false,
				align : 'center',
				items : [{
					icon : '/img/icon/del.png',
					tooltip : '删除',
					name : 'view',
					scope : this,
					handler : this.onDeleteClick,
					isDisabled : function(v, r, c, item, r) {
					}
				}]
			}
        );

        var me = this;

        //me.contextMenu = me.portlet.buildCIOptMenu();
        var sm = new Ext.selection.CheckboxModel({
        	mode : 'SINGLE',
            listeners: {
                selectionchange: function (sm2) {
	            	var records = sm2.getSelection();
	            	if (records.length > 0) {
	            		var data = records[0].data;
	            		data.contactTime = new Date(data.contactTime);
	            		me.up('cleditview').down('addclview').getForm().setValues(data);
	            	}
	            	
                }
            }
        });
        var store = Ext.create('Ext.data.Store', {
        	model : 'Module.Platform.CI.model.ContactLog',
	        proxy: {
	            type: 'rest',
	            headers : {
	                "Content-Type": "application/json; charset=utf-8",
	                Accept : 'application/json'
	            },
	            extraParams : {
	                filter : {}
	            },
	            api: {
	                read: '/platformapi/ci/' + me.customerInfo.id + '/contactLog/',
	            },
	            reader: {
	                type: 'json',
	                root: 'data',
	                totalProperty : 'total'
	            },
	            listeners:{
	                exception:function( theproxy, response, operation, options ){
	                    Soul.util.MessageUtil.parseResponse(response);
	                }
	            }
	        },
        
        });
        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: store,
            listeners : {
    			itemclick : function( view, record, item, index, e, eOpts ) {
            		console.log(record);
	            	
    			}         
    		},
        });
        store.load();
        this.callParent(arguments);
    },
    
	onModifyClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		console.log(record.data);
		var data = record.data;
		data.contactTime = new Date(record.data.contactTime);
		me.up('cleditview').down('addclview').getForm().setValues(record.data);
		
	},

	onDeleteClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		Soul.Ajax.request({
			url : '/platformapi/ci/' + record.get('ciId') + '/contactLog/' + record.get('id'),
			method : 'delete',
			loadMask : true,
			loadMsg : '删除',
			successMsg : '成功',
			success : function(response, opts) {
				view.getStore().reload()
			}
		});
	
	},

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    }
});