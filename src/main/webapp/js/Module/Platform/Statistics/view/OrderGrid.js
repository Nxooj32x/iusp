Ext.define('Module.Platform.Statistics.view.OrderGrid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.orderstatisticsgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn',
        'Module.Platform.Statistics.Renderer',
        'Module.Platform.Statistics.Tools',
        'Module.Platform.Statistics.Config'
    ],

    checkIndexes: ['orderType','orderCtime'],
    disableIndexes: [],

    customFilter : [],
    
    icon : '/img/icon/order.png',
    
    title : "订单统计",


    initComponent: function () {
        var columns = new Array();
        var renders = Module.Platform.Statistics.Renderer;
        var comboData = Module.Platform.Statistics.Config.COMBO_DATA;

        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: ORDER_PROPERTY.code,
                dataIndex: 'orderCode',
                searchType: 'string',
                align: 'center',
                width: 150
            },{
                text: "服务商",
	            dataIndex: 'contacts',
	            searchType: 'string',
	            align: 'center',
	            width: 100
	        },{
                text: "电话",
	            dataIndex: 'phone',
	            searchType: 'string',
	            align: 'center',
	            width: 100
	        },{
                text: "店铺",
	            dataIndex: 'shopName',
	            searchType: 'string',
	            align: 'center',
	            width: 100
	        },{
                text: ORDER_PROPERTY.name,
                dataIndex: 'orderName',
                searchType: 'string',
                align: 'center',
                width: 150
            }, {
                text: ORDER_PROPERTY.type,
	            dataIndex: 'orderType',
	            searchType: 'combo',
	            comboData: comboData.type,
	            align: 'center',
	            width: 150,
	            renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                return renders.translateOrderType(v);
	            }
	        }, {
                text: ORDER_PROPERTY.ctime,
                dataIndex: 'orderCtime',
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
                text: ORDER_PROPERTY.state,
                dataIndex: 'orderStatus',
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
        
        var now = new Date();
        var todayBegin = Ext.Date.clearTime(now);
        var todayEnd = Ext.Date.add(todayBegin, Ext.Date.DAY, 1);
        var yesterdayBegin = Ext.Date.subtract(todayBegin, Ext.Date.DAY, 1);
        var yesterdayEnd = todayBegin;
        var weekBegin = Ext.Date.subtract(now, Ext.Date.DAY, 7);
        var weekEnd = now;
        var monthBegin = Ext.Date.getFirstDateOfMonth(now);
        var monthEnd = Ext.Date.getLastDateOfMonth(now);
        monthEnd = Ext.Date.add(monthEnd, Ext.Date.DAY, 1);
        var lastMonthBegin = Ext.Date.getFirstDateOfMonth(Ext.Date.subtract(monthBegin, Ext.Date.DAY, 1));
        var lastMonthEnd = Ext.Date.getLastDateOfMonth(Ext.Date.subtract(monthBegin, Ext.Date.DAY, 1));
        lastMonthEnd = Ext.Date.add(lastMonthEnd, Ext.Date.DAY, 1);
        

        var todayFilter = {
	    	searchText : '今天', 
	    	icon : '/img/icon/quota.png',
	    	name : 'todayOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'orderCtime',
		    	logicalOp : 'between',
		    	value : [todayBegin, todayEnd]
	    	}],
	    };
	    var yesterdayFilter = {
	    	searchText : '昨天', 
	    	icon : '/img/icon/quota.png',
	    	name : 'yesterdayOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'orderCtime',
		    	logicalOp : 'between',
		    	value : [yesterdayBegin, yesterdayEnd]
	    	}],
	    };
        

        var weekOderFilter = {
	    	searchText : '最近7天', 
	    	icon : '/img/icon/quota.png',
	    	name : 'weekOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'orderCtime',
		    	logicalOp : 'between',
		    	value : [weekBegin, weekEnd]
	    	}],
	    };
	    var monthOderFilter = {
	    	searchText : '本月', 
	    	icon : '/img/icon/quota.png',
	    	name : 'monthOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'orderCtime',
		    	logicalOp : 'between',
		    	value : [monthBegin, monthEnd]
	    	}],
	    }
	    var lastMonthOderFilter = {
	    	searchText : '上月', 
	    	icon : '/img/icon/quota.png',
	    	name : 'lastmonthOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'orderCtime',
		    	logicalOp : 'between',
		    	value : [lastMonthBegin, lastMonthEnd]
	    	}],
	    }
	    me.customFilter = [];
	    me.customFilter.push(todayFilter);
	    me.customFilter.push(yesterdayFilter);
	    me.customFilter.push(weekOderFilter);
        me.customFilter.push(monthOderFilter);
        me.customFilter.push(lastMonthOderFilter);
        
        var store = Ext.create('Module.Platform.Statistics.store.OrderStore');

        Ext.apply(this, {
            columns: columns,
            viewConfig: {
                emptyText: ORDER_MESSAGE.empty
            },
            store: store
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
    }
});