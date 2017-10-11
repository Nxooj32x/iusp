Ext.define('Module.Platform.Statistics.view.SMBTRGrid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.smbstatisticsgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.CustomModule.modulemanager.Data',
        'Module.Store.StoreShop.Data',
        'Module.Store.StoreShop.Renderer',
        'Module.CustomModule.modulemanager.Renderer',
        'Module.Platform.TradeRecord.Renderer',
        'Module.Platform.TradeRecord.Config',
        'Module.Store.StoreShop.Operation'
    ],

    modulePanel  : null,
    
    icon : '/img/icon/dollar_red.png',
    
    title : "模块购买统计",

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Store.StoreShop.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: "计费包名称",
                dataIndex: 'mbName',
                width : 100,
                searchType: 'string',
                align: 'left'
            }, {
                text: "模块名称",
	            dataIndex: 'moduleName',
	            width : 100,
	            searchType: 'string',
	            align: 'left'
	        }, {
                text: "所属店铺",
	            dataIndex: 'shopName',
	            width : 100,
	            searchType: 'string',
	            align: 'left'
	        }, {
				text : "店铺详情",
				xtype : 'actioncolumn',
				width : 60,
				dataIndex: 'shopId',
				searchType: 'number',
				align: 'center',
				sortable : false,
				menuDisabled : true,
				items : [ {
					icon : '/img/icon/shop.png',
					tooltip : '店铺详情',
					scope : this,
					handler : this.onShopInfoClick
				} ]
			},{
            	text: "客户信息",
				xtype : 'actioncolumn',
				dataIndex : 'ciId',
				width: 80,
				editor : false,
				align : 'center',
	            sortable:false,
				items : [{
					icon : '/img/icon/info.png',
					tooltip : '客户信息',
					name : 'view',
					scope : this,
					handler : this.onCustomerInfoClick,
					isDisabled : function(v, r, c, item, r) {
						if (r.data.ciId)
							return false;
						else
							return true;
					}
				}]
			} , {

                text:SHOP_MODULE_BILLING_LABEL.billingType, dataIndex:'billingType', searchType:'combo', align:'center', width : 80,
                renderer : function(v, u, r, rowIndex, columnIndex, s){
                    return renders.translateShopModuleBillingTypeStatus(v);
                },
                comboData : SHOP_MODULE_BILLING_LABEL.billingType
            }, {
                text: SHOP_MODULE_BILLING_LABEL.serviceTime,
	            dataIndex: 'serviceTime',
	            searchType: 'number',
	            align: 'left'
	        }, {
                text: SHOP_MODULE_BILLING_LABEL.money,
                dataIndex: 'money',
                width : 80,
                searchType: 'string',
                align: 'left'
            }, {
                text: "购买时间",
                dataIndex: 'completeTime',
                searchType: 'date',
                align: 'center',
                width : 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    if (v == null) {
                        return "未知";
                    }
                    return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
                }
            }, {
                text: SHOP_MODULE_BILLING_LABEL.opUserName,
                dataIndex: 'opUserName',
                searchType: 'string',
                align: 'left'
            }, {
                text: "交易流水号",
	            dataIndex: 'tradeCode',
	            searchType: 'string',
	            align: 'center',
	            width: 150
	        }, {
                text: "支付方式",
	            dataIndex: 'payType',
	            searchType: 'combo',
	            align: 'center',
	            width: 150,
	            renderer: Module.Platform.TradeRecord.Renderer.translatePayType,
	            comboData: Module.Platform.TradeRecord.Config.COMBO_DATA.payType
	        }, {
	            text: "第三方支付方式",
	            dataIndex: 'payWay',
	            searchType: 'combo',
	            align: 'center',
	            width: 150,
	            renderer: Module.Platform.TradeRecord.Renderer.translatePayWay,
	            comboData: Module.Platform.TradeRecord.Config.COMBO_DATA.payWay
	        }, {
	            text: "第三方支付流水号",
	            dataIndex: 'outTradeCode',
	            searchType: 'string',
	            align: 'center',
	            width: 150
	        }, {
	            text: "冻结流水号",
	            dataIndex: 'frozenCode',
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
        var todayFilter = {
	    	searchText : '今天', 
	    	icon : '/img/icon/quota.png',
	    	name : 'todayOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'completeTime',
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
		    	attr : 'completeTime',
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
		    	attr : 'completeTime',
		    	logicalOp : 'between',
		    	value : [weekBegin, weekEnd]
	    	}],
	    };
	    var monthOderFilter = {
	    	searchText : '本月', 
	    	icon : '/img/icon/quota.png',
	    	name : 'btime',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'completeTime',
		    	logicalOp : 'between',
		    	value : [monthBegin, monthEnd]
	    	}],
	    }
	    me.customFilter = [];
	    me.customFilter.push(todayFilter);
	    me.customFilter.push(yesterdayFilter);
	    me.customFilter.push(weekOderFilter);
        me.customFilter.push(monthOderFilter);

        var store = Ext.create("Module.Platform.Statistics.store.SMBTRStore");
        Ext.apply(this, {
            //selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: store
        });

        this.callParent(arguments);
    },
    
	onShopInfoClick : function(view ,rowIndex, colIndex, item, e, record, row){
		Soul.Ajax.request({
			url : '/storeapi/shop/' + record.data.shopId,
			method : 'get',
			loadMask : true,
			loadMsg : '载入中',
			successMsg : '读取商铺信息完成',
			success : function(response, opts) {
				Module.Store.StoreShop.Operation.doShowShopDetialFuncion(response);
			}
		});
	},
	
	onCustomerInfoClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		var callbackFun = function(){
		    me.selModel.deselectAll();
		    me.updateView(me);
		};
		if (record.data.ciId) {
			Soul.Ajax.request({
				url : '/platformapi/ci/' + record.data.ciId,
				method : 'get',
				loadMask : true,
				loadMsg : '载入中',
				success : function(response, opts) {
					if (response)
						Module.Platform.CI.Operation.doModifyCI(response,callbackFun);
					else
						Module.Platform.CI.Operation.doAddCI(record.data.id,callbackFun);
					
				}
			});
		} else {
			Module.Platform.CI.Operation.doAddCI(record.data.id,callbackFun);
		}
	},

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
    }


});