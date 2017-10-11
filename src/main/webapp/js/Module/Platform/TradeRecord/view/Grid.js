Ext.define('Module.Platform.TradeRecord.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.orderstatisticsgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn',
        'Module.Platform.TradeRecord.Data',
        'Module.Platform.TradeRecord.Renderer',
        'Module.Platform.TradeRecord.Tools',
        'Module.Platform.TradeRecord.Config'
    ],

    checkIndexes: ['status','busType', 'money'],
    disableIndexes: [],

    customFilter : [],


    initComponent: function () {
        var columns = new Array();
        var renders = Module.Platform.TradeRecord.Renderer;
        var comboData = Module.Platform.TradeRecord.Config.COMBO_DATA;

        columns.push(
            {
                text: "ID",
                dataIndex: 'id',
                searchType: 'number',
                align: 'center',
                width: 30
            },{
                text: "状态",
	            dataIndex: 'status',
	            searchType: 'combo',
	            align: 'center',
	            width: 80,
	            renderer: renders.translateStatus,
	            comboData: comboData.status
	        }, {
                text: "流水号",
	            dataIndex: 'code',
	            searchType: 'string',
	            align: 'center',
	            width: 150
	        },{
                text: "业务类型",
	            dataIndex: 'busType',
	            searchType: 'combo',
	            align: 'center',
	            width: 90,
	            renderer: renders.translateBusType,
	            comboData: comboData.busType
	        }, {
	            text: "业务描述",
	            dataIndex: 'busDesc',
	            searchType: 'string',
	            align: 'center',
	            width: 150
	        }, {
                text: "产品ID",
	            dataIndex: 'productId',
	            searchType: 'number',
	            align: 'center',
	            width: 60
	        }, {
                text: "总金额",
	            dataIndex: 'money',
	            searchType: 'number',
	            align: 'center',
	            width: 100
	        }, {
	            text: "使用ID",
	            dataIndex: 'productUserId',
	            searchType: 'number',
	            align: 'center',
	            width: 60
	        }, {
	            text: "产品个数",
	            dataIndex: 'productNum',
	            searchType: 'number',
	            align: 'center',
	            width: 60
	        }, {
                text: "收入账号",
	            dataIndex: 'inAccoutId',
	            searchType: 'number',
	            align: 'center',
	            width: 60
	        },{
                text: "支出账号",
	            dataIndex: 'outAccoutId',
	            searchType: 'number',
	            align: 'center',
	            width: 60
	        },{
                text: "发起时间",
                dataIndex: 'applyTime',
                searchType: 'date',
                align: 'center',
                width: 150,
                renderer: renders.translateTime
            }, {
                text: "完成时间",
	            dataIndex: 'completeTime',
	            searchType: 'date',
	            align: 'center',
	            width: 150,
                renderer: renders.translateTime
	        }, {
                text: "支付金额",
                dataIndex: 'payMoney',
                searchType: 'number',
                align: 'center',
                width: 100
            },{
                text: "转账金额",
	            dataIndex: 'tansMoney',
	            searchType: 'number',
	            align: 'center',
	            width: 100
	        }, {
                text: "支付方式",
                dataIndex: 'payType',
                searchType: 'combo',
                align: 'center',
                width: 150,
                renderer: renders.translatePayType,
                comboData: comboData.payType
            }, {
                text: "第三方支付方式",
	            dataIndex: 'payWay',
	            searchType: 'combo',
	            align: 'center',
	            width: 150,
	            renderer: renders.translatePayWay,
	            comboData: comboData.payWay
	        }, {
                text: "冻结流水号",
	            dataIndex: 'frozenCode',
	            searchType: 'string',
	            align: 'center',
	            width: 150
	        }, {
	            text: "第三方支付流水号",
	            dataIndex: 'outTradeCode',
	            searchType: 'string',
	            align: 'center',
	            width: 150
	        }, {
                text: "发起人ID",
	            dataIndex: 'opUserId',
	            searchType: 'number',
	            align: 'center',
	            width: 150
	        }, {
                text: "发起人",
	            dataIndex: 'opUserName',
	            searchType: 'string',
	            align: 'center',
	            width: 150
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
		    	attr : 'applyTime',
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
		    	attr : 'applyTime',
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
		    	attr : 'applyTime',
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
		    	attr : 'applyTime',
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
		    	attr : 'applyTime',
		    	logicalOp : 'between',
		    	value : [lastMonthBegin, lastMonthEnd]
	    	}],
	    };
	    me.customFilter = [];
	    me.customFilter.push(todayFilter);
	    me.customFilter.push(yesterdayFilter);
	    me.customFilter.push(weekOderFilter);
        me.customFilter.push(monthOderFilter);
        me.customFilter.push(lastMonthOderFilter);
        
        var store = Ext.create('Module.Platform.TradeRecord.store.TradeRecordStore');

        Ext.apply(this, {
            columns: columns,
            viewConfig: {
                emptyText: ORDER_MESSAGE.empty,
                enableTextSelection:true  
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