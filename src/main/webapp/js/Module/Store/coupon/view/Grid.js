Ext.define('Module.Store.coupon.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.storegrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Store.coupon.Data',
        'Module.Store.coupon.Renderer',
        'Module.Platform.CI.Operation'
    ],

    checkIndexes: ['type','status'], //默认选择的列
    disableIndexes: [''],

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
            	text: "创建者ID",
	            dataIndex: 'createUserId',
	            searchType: 'number',
	            align: 'left',
	            width: 80
	        }, {
                text: "名称",
	            dataIndex: 'name',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        },  {
                text: "描述",
	            dataIndex: 'description',
	            searchType: 'string',
	            align: 'left',
	            width: 200
	        }, {
                text: "模块ID",
	            dataIndex: 'moduleId',
	            searchType: 'string',
	            align: 'left',
	            width: 80
	        }, {
                text: "类型",
	            dataIndex: 'type',
	            align: 'left',
	            width: 80,
		        searchType : 'combo',
				comboData : dict.typeCombo,
		        renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                var map = {system:"系统",distributor:"渠道商", user : '用户'}
	                return map[v];
	            }
	        },{
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
                text: "价格",
	            dataIndex: 'price',
	            align: 'left',
	            width: 80,
		        searchType : 'number'
	        },{
                text: "服务时长（次数）",
	            dataIndex: 'serviceTime',
	            align: 'left',
	            width: 80,
		        searchType : 'number',
		        renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                return v + "(" + v / 3600 / 24 + "天)";
	            }
	        },{
                text: "创建时间",
                dataIndex: 'ctime',
                searchType: 'date',
                align: 'left',
                width: 150,
		        renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                if (v == null) {
	                    return "未知";
	                }
	                return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
	            }
            }, {
                text: "更新时间",
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
            }, {
                text: "状态",
                dataIndex: 'status',
                align: 'left',
                width: 80,
	            searchType : 'combo',
				comboData : dict.statusCombo,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    var map = {online:"启用",offline:"停用"}
                    return map[v];
                }
            }, {
                text: "兑换码数量",
                dataIndex: 'codeNum',
                searchType: 'number',
                align: 'left',
                width: 100
            }
        );

        var me = this;
        me.contextMenu = me.portlet.buildOptMenu();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                    var editBtn = me.portlet.down('menuitem[name=edit]');
                    var rightEditBtn = me.contextMenu.down('menuitem[name=edit]');

                    var viewBillBtn = me.portlet.down('menuitem[name=viewBill]');
                    var rightViewBill = me.contextMenu.down('menuitem[name=viewBill]');

                    if (sm2.getCount() == 1) {
                    	editBtn.enable();
                    	rightEditBtn.enable();

                    	viewBillBtn.enable();
                    	rightViewBill.enable();
                    } else {
                    	editBtn.disable();
                    	rightEditBtn.disable();

                    	viewBillBtn.disable();
                    	rightViewBill.disable();
                    }
                }
            }
        });

        var store = Ext.create('Module.Store.coupon.store.CouponStore');

        Ext.apply(this, {
            selModel: sm,
            viewConfig: {
                emptyText: "没有兑换码类型"
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

        var callbackFun = function(){
            me.selModel.deselectAll();
            me.updateView(me);
        };

        var sm = me.selModel;

        var addBtn = me.portlet.down('menuitem[name=add]');
        var rightAddBtn = me.contextMenu.down('menuitem[name=add]');

        var editBtn = me.portlet.down('menuitem[name=edit]');
        var rightEditBtn = me.contextMenu.down('menuitem[name=edit]');

        var viewBillBtn = me.portlet.down('menuitem[name=viewBill]');
        var rightViewBill = me.contextMenu.down('menuitem[name=viewBill]');	

        var addBtnFunc = function () {
        	Module.Store.coupon.Operation.doAdd(callbackFun);
        };

        addBtn.on("click",addBtnFunc);
        rightAddBtn.on('click', addBtnFunc);
        
        var editBtnFunc = function () {
        	var records = sm.getSelection();
        	Module.Store.coupon.Operation.doEdit(records[0].data, callbackFun);
        };

        editBtn.on("click",editBtnFunc);
        rightEditBtn.on('click', editBtnFunc);
        
        var viewBillBtnFunc = function () {
        	var records = sm.getSelection();
        	Module.Store.coupon.Operation.doViewBill(records[0].data, callbackFun);
        };

        viewBillBtn.on("click",viewBillBtnFunc);
        rightViewBill.on('click', viewBillBtnFunc);
    }
});