Ext.define('Module.Store.coupon.view.BillGrid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.couponbillgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Store.coupon.Data',
        'Module.Store.coupon.Renderer',
        'Module.Platform.CI.Operation'
    ],

    checkIndexes: ['status'], //默认选择的列
    disableIndexes: [''],
    
    initFilter : [],
    
    coupon : null,

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Store.coupon.Renderer;
        var dict =  Module.Store.coupon.Data;
        columns.push(
            {
            	text: "ID",
	            dataIndex: 'id',
	            searchType: 'number',
	            align: 'left',
	            width: 30
            },{
            	text: "兑换码",
	            dataIndex: 'code',
	            searchType: 'string',
	            align: 'left',
	            width: 280
	        },{
                text: "状态",
	            dataIndex: 'status',
	            align: 'left',
	            width: 80,
	            searchType : 'combo',
				comboData : dict.billStatusCombo,
	            renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                var map = {used:"已使用",unuse:"未使用"}
	                return map[v];
	            }
	        } ,{
                text: "模块名称",
	            dataIndex: 'moduleName',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        },  {
                text: "模块CODE",
	            dataIndex: 'moduleCode',
	            searchType: 'string',
	            align: 'left',
	            width: 80
	        }, {
                text: "渠道商ID",
	            dataIndex: 'distributorId',
	            searchType: 'number',
	            align: 'left',
	            width: 60
	        }, {
                text: "计费类型",
	            dataIndex: 'billingType',
	            align: 'left',
	            width: 80,
		        searchType : 'combo',
				comboData : dict.billingTypeCombo,
		        renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                var map = {TIME:"按时",PPV:"按次"}
	                return map[v];
	            }
	        },{
                text: "服务时长（次数）",
	            dataIndex: 'serviceTime',
	            align: 'left',
	            width: 100,
		        searchType : 'number',
		        renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                return v + "(" + v / 3600 / 24 + "天)";
	            }
	        }, {
                text: "生成时间",
	            dataIndex: 'ctime',
	            searchType: 'date',
	            align: 'left',
	            width: 150,
	            sortable : true,
	            renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                if (v == null) {
	                    return "未知";
	                }
	                return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
	            }
	        }, {
                text: "使用时间",
                dataIndex: 'utime',
                searchType: 'date',
                align: 'left',
                width: 150,
	            renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                if (v == null) {
	                    return "未知";
	                }
	                return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
	            }
            }
        );

        var me = this;
        me.initFilter = [{
			relationOp : 'and',
			attr : 'couponId',
			logicalOp : '=',
			value : me.coupon.id
	    }];

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                }
            }
        });

        var store = Ext.create('Module.Store.coupon.store.CouponBillStore');
        Ext.apply(this, {
            selModel: sm,
            viewConfig: {
                emptyText: "没有兑换码",
                enableTextSelection:true  
            },
            store: store,
			columns : {
				items : columns,
				defaults : {
					searchType : 'string',
					sortable : false,
					menuDisabled : true,
					align : 'center'
				}
			}
        });
        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;

        me.callParent(arguments);
        me.updateView(me);
    }
});