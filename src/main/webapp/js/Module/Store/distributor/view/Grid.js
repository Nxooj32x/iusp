Ext.define('Module.Store.distributor.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.storegrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Store.distributor.Data',
        'Module.Store.distributor.Renderer',
        'Module.Platform.CI.Operation'
    ],

    checkIndexes: ['userId', 'contacts', 'phone', 'type', 'status'], //默认选择的列
    disableIndexes: ['contactLogs'],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Store.distributor.Renderer;
        var dict =  Module.Store.distributor.Data;
        columns.push(
            {
            	text: "ID",
	            dataIndex: 'id',
	            searchType: 'number',
	            align: 'left',
	            width: 30
            },{
            	text: "用户ID",
	            dataIndex: 'userId',
	            searchType: 'number',
	            align: 'left',
	            width: 80
	        }, {
                text: "联系人",
	            dataIndex: 'contacts',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        }, {
	            text: "电话",
	            dataIndex: 'phone',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        }, {
                text: "类型",
	            dataIndex: 'type',
	            align: 'left',
	            width: 80,
		        searchType : 'combo',
				comboData : dict.typeCombo,
		        renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                var map = {platform:"平台",shop:"网站"}
	                return map[v];
	            }
	        },{
                text: "申请时间",
                dataIndex: 'applyTime',
                searchType: 'date',
                align: 'left',
                width: 200,
		        renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                if (v == null) {
	                    return "未知";
	                }
	                return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
	            }
            }, {
                text: "批准时间",
                dataIndex: 'approveTime',
                searchType: 'date',
                align: 'left',
                width: 200,
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
                    var map = {apply:"申请",offline:"停用",reject:"拒绝",online:"正常"}
                    return map[v];
                }
            }, {
                text: "等级",
                dataIndex: 'level',
                searchType: 'number',
                align: 'left',
                width: 100
            }
        );

        var me = this;
        me.contextMenu = me.portlet.buildDrOptMenu();

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                	var records = sm2.getSelection();

                    var approveDr = me.portlet.down('menuitem[name=approve]');
                    var rightApproveDr = me.contextMenu.down('menuitem[name=approve]');

                    var rejectDr = me.portlet.down('menuitem[name=reject]');
                    var rightRejectDr = me.contextMenu.down('menuitem[name=reject]');

                    var ssDr = me.portlet.down('menuitem[name=startStop]');
                    var rightSsDr = me.contextMenu.down('menuitem[name=startStop]');

                    if (sm2.getCount() == 1) {
                        if (records[0].data.status == "apply" ) {
                        	approveDr.enable();
                        	rightApproveDr.enable();

                        	rejectDr.enable();
                        	rightRejectDr.enable();

                        	ssDr.disable();
                            rightSsDr.disable();
                        } if (records[0].data.status == "reject" ) {
                        	approveDr.enable();
                        	rightApproveDr.enable();

                        	rejectDr.disable();
                        	rightRejectDr.disable();

                        	ssDr.disable();
                            rightSsDr.disable();
                        } else  if (records[0].data.status == "online" || records[0].data.status == "offline"   ) {
                        	approveDr.disable();
                        	rightApproveDr.disable();

                        	rejectDr.disable();
                        	rightRejectDr.disable();

                        	ssDr.enable();
                            rightSsDr.enable();
                        } 
                    } else {
                    	approveDr.disable();
                    	rightApproveDr.disable();

                    	rejectDr.disable();
                    	rightRejectDr.disable();

                    	ssDr.disable();
                        rightSsDr.disable();
                    }
                }
            }
        });

        var store = Ext.create('Module.Store.distributor.store.DistributorStore');

        Ext.apply(this, {
            selModel: sm,
            viewConfig: {
                emptyText: "没有渠道商"
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

        var sm = me.selModel,

        addDistributor = me.portlet.down('menuitem[name=add]'),

        approveDistributor = me.portlet.down('menuitem[name=approve]'),

        rejectDistributor = me.portlet.down('menuitem[name=reject]'),
        
        ssDistributor = me.portlet.down('menuitem[name=startStop]');

        var addDistributorFunc = function () {
        	var records = sm.getSelection();
        	Module.Store.distributor.Operation.doAdd(callbackFun);
        };

        addDistributor.on("click",addDistributorFunc);
        me.contextMenu.down('menuitem[name=add]').on('click', addDistributorFunc);


        var approveDistributorFunc = function(){
            var records = sm.getSelection();
            Module.Store.distributor.Operation.doModifyStatus(records[0].data, 'online',callbackFun);
        };

        approveDistributor.on("click",approveDistributorFunc);
        me.contextMenu.down('menuitem[name=approve]').on('click', approveDistributorFunc);


        var rejectDistributorFunc = function(){
            var records = sm.getSelection();
            Module.Store.distributor.Operation.doModifyStatus(records[0].data, 'reject',callbackFun);
        };

        rejectDistributor.on("click",rejectDistributorFunc);
        me.contextMenu.down('menuitem[name=reject]').on('click', rejectDistributorFunc);
        
         var ssDistributorFunc = function(){
            var records = sm.getSelection();
            var status = "online";
            if (records[0].data.status == "online")
            	status = "offline";
            	
            Module.Store.distributor.Operation.doModifyStatus(records[0].data, status, callbackFun);
        };

        ssDistributor.on("click",ssDistributorFunc);
        me.contextMenu.down('menuitem[name=startStop]').on('click', ssDistributorFunc);


    }
});