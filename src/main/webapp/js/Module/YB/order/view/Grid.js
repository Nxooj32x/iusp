Ext.define('Module.YB.order.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.ordergrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn',
        'Module.YB.order.Data',
        'Module.YB.order.Renderer',
        'Module.YB.order.Tools',
        'Module.YB.order.Config'
    ],

    checkIndexes: [],
    disableIndexes: ['defaultMoney', 'payMoney'],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.YB.order.Renderer;
        var comboData = Module.YB.order.Config.COMBO_DATA;

        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: ORDER_PROPERTY.code,
                dataIndex: 'code',
                searchType: 'string',
                align: 'center',
                width: 150
            },{
                text: ORDER_PROPERTY.cUserId,
                dataIndex: 'cUserId',
                searchType: 'number',
                align: 'center',
                width: 100
            },{
                text: ORDER_PROPERTY.name,
                dataIndex: 'name',
                searchType: 'string',
                align: 'center',
                width: 150
            }, {
                text: "商品明细",
                xtype: 'actioncolumn',
                width: 100,
                dataIndex: 'name',
                sortable : false,
                editor: false,
                align: 'center',
                items: [{
                    icon: '/img/icon/download.png',
                    tooltip: '商品信息',
                    name: 'view',
                    scope: this,
                    handler: this.onGoodsClick,
                    isDisabled: function (v, r, c, item, r) {
                    }
                }]
            },  {
                text: ORDER_PROPERTY.ctime,
                dataIndex: 'ctime',
                searchType: 'date',
                align: 'center',
                width: 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    var val = new Date(v);
                    return Ext.util.Format.date(val, 'Y-m-d H:i:s');
                }
            },{
                text: ORDER_PROPERTY.defaultMoney,
                dataIndex: 'defaultMoney',
                searchType: 'string',
                align: 'center',
                width: 100
            }, {
                text: ORDER_PROPERTY.payMoney,
                dataIndex: 'payMoney',
                searchType: 'string',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {                  
                	if(r.data['state']=='payed'||r.data['state']=='producing'||r.data['state']=='deliveryed'||r.data['state']=='completed')
                		return v;
                	else
                		return "";
                }
            }, {
                text: ORDER_PROPERTY.totaoNub,
                dataIndex: 'totalNub',
                searchType: 'number',
                align: 'center',
                width: 100
            }, {
                text: ORDER_PROPERTY.state,
                dataIndex: 'state',
                searchType: 'combo',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateOrderStatus(v);
                },
                comboData: comboData.state
            }, {
                text: ORDER_PROPERTY.payWay,
                dataIndex: 'payWay',
                searchType: 'combo',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateOrderPayWay(v);
                },
                comboData: comboData.payWay
            }, {
                text: ORDER_PROPERTY.payTime,
                dataIndex: 'payTime',
                searchType: 'date',
                align: 'center',
                width: 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    if (v != null && v != "null") {
                        var val = new Date(v);
                        return Ext.util.Format.date(val, 'Y-m-d H:i:s');
                    } else {
                        return "未付款";
                    }

                }
            }
        );

        var me = this;

        //右击事件
        me.contextMenu = me.portlet.buildOrderOptRightMenu();

        //双击事件 --> 订单详情
        me.doubleClick = function (view, record, item, index, e) {
            Module.YB.order.Operation.detailOrderFunc(record, null);
        };

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();

                    var topDetailOrder = me.portlet.down('menuitem[name=detailOrder]');
                    var topCancelOrder = me.portlet.down('menuitem[name=cancelOrder]');
                    var topProduceOrder = me.portlet.down('menuitem[name=produceOrder]');
                    var topDeliveryOrder = me.portlet.down('menuitem[name=deliveryOrder]');
                    var topDeliveryInfo = me.portlet.down('menuitem[name=deliveryInfo]');

                    var rightDetailOrder = me.contextMenu.down('menuitem[name=detailOrder]');
                    var rightCancelOrder = me.contextMenu.down('menuitem[name=cancelOrder]');
                    var rightProduceOrder = me.contextMenu.down('menuitem[name=produceOrder]');
                    var rightDeliveryOrder = me.contextMenu.down('menuitem[name=deliveryOrder]');
                    var rightDeliveryInfo = me.contextMenu.down('menuitem[name=deliveryInfo]');
                    var righCommentInfo = me.contextMenu.down('menuitem[name=commentInfo]');

                    topDetailOrder.disable();
                    topCancelOrder.disable();
                    topProduceOrder.disable();
                    topDeliveryOrder.disable();
                    topDeliveryInfo.disable();

                    rightDetailOrder.disable();
                    rightCancelOrder.disable();
                    rightProduceOrder.disable();
                    rightDeliveryOrder.disable();
                    rightDeliveryInfo.disable();
                    righCommentInfo.disable();

                    if (records.length != 1) {
                        return;
                    }
                    topDetailOrder.enable();
                    rightDetailOrder.enable();

                    var state = records[0].data.state;
                    if (state == ORDER_DATA.STATE_PLACED || state == ORDER_DATA.STATE_WAITPAY) {
                        topCancelOrder.enable();
                        rightCancelOrder.enable();
                    } else if (state == ORDER_DATA.STATE_PAYED) {
                        topProduceOrder.enable();
                        rightProduceOrder.enable();
                    } else if (state == ORDER_DATA.STATE_PRODUCING) {
                        topDeliveryOrder.enable();
                        rightDeliveryOrder.enable();
                    } else if (state == ORDER_DATA.STATE_DELIVERYED) {
                        topDeliveryInfo.enable();
                        rightDeliveryInfo.enable();
                    }

                    var commentState=records[0].data.commentState;
                    if(commentState==ORDER_DATA.ORDER_COMMENT_STATUS_COMMENTED){
                        righCommentInfo.setText("评论信息");
                        righCommentInfo.enable();
                    }else if(commentState==ORDER_DATA.ORDER_COMMENT_STATUS_MODIFIED){
                        righCommentInfo.setText("评论信息（已改)");
                        righCommentInfo.enable();
                    }else {
                        righCommentInfo.setText("评论信息（未评）");
                        righCommentInfo.disable();
                    }

                }
            }
        });

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: ORDER_MESSAGE.empty
            },
            store: Ext.data.StoreManager.lookup("Module.YB.order.store.OrderStore")
        });

        this.callParent(arguments);
    },

    onGoodsClick : function(view ,rowIndex, colIndex, item, e, record, row){

    	if (record.get('type') == "PHOTO") {
    		window.open("/admin/order/" + record.get("id") + "/detail");
        } else if (record.get('type') == "BOOK"||record.get('type') == "COOKBOOK"){
    		Soul.Ajax.request({
	            url : "/order/" + record.get("id") + "/goods",
	            method : 'GET',
	            timeout : 1000 * 60 * 20,
	            headers : {
					Accept : 'application/json',
				},
	            loadMask : true,
	            loadMsg : '获取商品信息',
	            successMsg : '获取成功',
	            success : function(response, opts) {
                    var goodsGrid
                    if(record.get('type') == "BOOK"){
                         goodsGrid = Ext.create("Module.YB.order.view.BookGoodsGrid", {
                            order : record.data,
                            width : 800,
                        });
                    }else {
                         goodsGrid = Ext.create("Module.YB.order.view.CookBookGoodsGrid", {
                            order : record.data,
                            width : 1000,
                        });
                    }
                    console.log(response);
	            	goodsGrid.getStore().loadData(response);
	            	Soul.util.ObjectView.showInNewWin(goodsGrid, "商品信息");
	            }
	        });
    	}
    },
    onPreviewClick : function(view ,rowIndex, colIndex, item, e, record, row){
        var downloadUrl = "/book/" + record.get("bookId") + "/preview?mode=turn&booktype=printBook&layout=small";
        window.open(downloadUrl);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var sm = me.selModel;
        var callbackFn = function () {
            me.updateView(me);
            sm.deselectAll();
        };

        var topDetailOrder = me.portlet.down('menuitem[name=detailOrder]');
        var topCancelOrder = me.portlet.down('menuitem[name=cancelOrder]');
        var topProduceOrder = me.portlet.down('menuitem[name=produceOrder]');
        var topDeliveryOrder = me.portlet.down('menuitem[name=deliveryOrder]');
        var topDeliveryInfo = me.portlet.down('menuitem[name=deliveryInfo]');
       // var topExportExcel = me.portlet.down('menuitem[name=exportExcel]');
        //var topPrintExportExcel = me.portlet.down('menuitem[name=printExportExcel]');

        var rightDetailOrder = me.contextMenu.down('menuitem[name=detailOrder]');
        var rightCancelOrder = me.contextMenu.down('menuitem[name=cancelOrder]');
        var rightProduceOrder = me.contextMenu.down('menuitem[name=produceOrder]');
        var rightDeliveryOrder = me.contextMenu.down('menuitem[name=deliveryOrder]');
        var rightDeliveryInfo = me.contextMenu.down('menuitem[name=deliveryInfo]');
        //var rightExportExcel = me.contextMenu.down('menuitem[name=exportExcel]');
        //var rightPrintExportExcel = me.contextMenu.down('menuitem[name=printExportExcel]');
        var righCommentInfo = me.contextMenu.down('menuitem[name=commentInfo]');
        
        var sm = me.selModel;

       /* var callbackFun = function(){
			me.updateView(me);
		};*/

        //订单评论详情
        var commentInfoFunc = function () {
            var records = sm.getSelection();
            if (records.length == 1) {
                Module.YB.order.Operation.commentDetailFunc(records[0], null);
            }
        };
        righCommentInfo.on('click', commentInfoFunc);


        //订单详情
        var detailOrderFunc = function () {
            var records = sm.getSelection();
            if (records.length == 1) {
                Module.YB.order.Operation.detailOrderFunc(records[0], null);
            }
        };
        topDetailOrder.on('click', detailOrderFunc);
        rightDetailOrder.on('click', detailOrderFunc);

        //取消订单
        var cancelOrderFunc = function () {
            var records = sm.getSelection();
            if (records.length == 1) {
                Module.YB.order.Operation.cancelOrderFunc(records[0], callbackFn);
            }
        };
        topCancelOrder.on('click', cancelOrderFunc);
        rightCancelOrder.on('click', cancelOrderFunc);

        //订单生产
        var produceOrderFunc = function () {
            var records = sm.getSelection();
            if (records.length == 1) {
                Module.YB.order.Operation.produceOrderFunc(records[0], callbackFn);
            }
        };
        topProduceOrder.on('click', produceOrderFunc);
        rightProduceOrder.on('click', produceOrderFunc);

        //订单发货
        var deliveryOrderFunc = function () {
            var records = sm.getSelection();
            if (records.length == 1) {
                Module.YB.order.Operation.deliveryOrderFunc(records[0], callbackFn);
            }
        };
        topDeliveryOrder.on('click', deliveryOrderFunc);
        rightDeliveryOrder.on('click', deliveryOrderFunc);

        //订单物流信息
        var deliveryInfoFunc = function () {
            var records = sm.getSelection();
            if (records.length == 1) {
                Module.YB.order.Operation.deliveryInfoFunc(records[0], callbackFn);
            }
        };
        topDeliveryInfo.on('click', deliveryInfoFunc);
        rightDeliveryInfo.on('click', deliveryInfoFunc);

        //导出订单列表
     /*   var exportExcelFunc = function (item,e,eOpts) {
            var store = Ext.data.StoreManager.lookup("Module.YB.order.store.OrderStore");
            var filter = store.proxy.extraParams.filter;
            if (filter != null) {
                filter = filter.replace(new RegExp('%', 'gm'), '%25');
            }
            var exportExcelUrl = '/api/admin/export/xls/orderlist';
            var records = sm.getSelection();
            if(records.length>0)
            	Module.YB.order.Operation.doExportExcelFuncForIDFunction(records, callbackFun);
            else
            	location.href = exportExcelUrl + "?filter=" + filter;
        };*/

        //topExportExcel.on('click', exportExcelFunc);
       //  rightExportExcel.on('click', exportExcelFuncForID);
        
      //导出印刷品订单
      /*  var printExportExcelFunc = function () {
        	 var records = sm.getSelection();
        	 if(records.length==0)
        	 {
        		 Soul.uiModule.Message.msg("","请选择需要下载的的订单");
        		 return false;
        	 }
        	 Module.YB.order.Operation.doExportExcelDetailFuncForIDFunction(records, callbackFun);
        };*/
       // topPrintExportExcel.on('click', printExportExcelFunc);
       // rightPrintExportExcel.on('click', printExportExcelFunc);
    }
});