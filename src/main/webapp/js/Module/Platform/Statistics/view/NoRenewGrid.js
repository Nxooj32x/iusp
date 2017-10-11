Ext.define('Module.Platform.Statistics.view.NoRenewGrid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.NoRenewGrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Store.StoreShop.Data',
		'Module.Store.StoreShop.Renderer',
		'Module.Platform.CI.Operation',
		'Module.Store.StoreOwner.Operation'
	],
	
	checkIndexes : [], //默认选择的列
	disableIndexes : ['shopLogo'],
	
	customFilter : [],
	
	icon : '/img/icon/shop.png',
	
	title : "试用未续费统计",

	initComponent : function() {
		var columns = new Array();
		var renders = Module.Store.StoreShop.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: "店铺名称",
				dataIndex: 'shopName',
				sortable : false,
				searchType: 'string',
				align: 'left',
				width: 100
			}, {
				text: "模块名称",
				dataIndex: 'moduleName',
				sortable : false,
				searchType: 'string',
				width: 100
			},{
				text: "服务商联系人",
				dataIndex: 'contacts',
				sortable : false,
				searchType: 'string',
				width: 80
			},{
				text: "电话",
				dataIndex: 'phone',
				sortable : false,
				searchType: 'string',
				width: 100
			},{
				text:STORE_LABEL.logo, dataIndex:'shopLogo',sortable: false,  searchType:'string', align:'center', width: 100,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					if(v == null){
						return "";
					}
					v=v+"?imageView2/1/w/100/h/50/format/jpg";
					return "<img style='width:50px;height:25px;' src="+v+" ></img>";
				}

			}, {
				text:"店铺状态", dataIndex:'shopStatus', searchType:'combo', align:'center', width: 100,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateShopStatus(v);
				},
				sortable : false,
				comboData : STORE_SHOP_COMBO.status
			}, {
				text:"模块状态", dataIndex:'moduleStatus', searchType:'combo', align:'center', width: 100,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateShopModuleStatus(v);
				},
				sortable : false,
				comboData : SHOP_MODULE_COMBO.status
			}, {
				text: "启用时间",
				dataIndex: 'btime',
				searchType: 'date',
				align: 'center',
				width: 150,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					var val = new Date(v);
					return Ext.util.Format.date(val, 'Y-m-d H:i:s');
				}
			}, {
				text: "结束时间",
				dataIndex: 'etime',
				searchType: 'date',
				align: 'center',
				width: 150,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					var val = new Date(v);
					return Ext.util.Format.date(val, 'Y-m-d H:i:s');
				}
			},{
            	text: "客户信息",
				xtype : 'actioncolumn',
				width: 80,
				editor : false,
				align : 'center',
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
			},{
            	text: "店铺详情",
				xtype : 'actioncolumn',
				width: 80,
				editor : false,
				align : 'center',
				items : [{
					icon : '/img/icon/shop.png',
					tooltip : '店铺信息',
					scope : this,
					handler : this.onShopInfoClick
				}]
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
		    	attr : 'etime',
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
		    	attr : 'etime',
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
		    	attr : 'etime',
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
		    	attr : 'etime',
		    	logicalOp : 'between',
		    	value : [monthBegin, monthEnd]
	    	}],
	    }
	    me.customFilter = [];
	    me.customFilter.push(todayFilter);
	    me.customFilter.push(yesterdayFilter);
	    me.customFilter.push(weekOderFilter);
        me.customFilter.push(monthOderFilter);
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

				}
			}
		});
		
		var store = Ext.create('Module.Platform.Statistics.store.RenewShopModuleStore');
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : "没有未续费的模块"
			},
			store : store,
		});
		
		this.callParent(arguments);
	},
	
	onCustomerInfoClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		var callbackFun = function(){
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
			Module.Platform.CI.Operation.doAddCI(record.data.soId,callbackFun);
		}
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

	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.store.on('beforeload', function (store, options) {
			var filter = Ext.JSON.decode(store.proxy.extraParams.filter);
			var num = 1;
			$.each(filter.sesl, function(i, ses){
				$.each(ses.sel, function(j, se){
					if (se.property == "num") {
						Ext.Array.remove(ses.sel, se);
						num = se.value[0];
						if (se.matchMode != ">") {
							Soul.uiModule.Message.msg("错误", '订单数目只支持">"的查询方式');
						}
					}
						
				})
			});
			if (num < 1) {
				Soul.uiModule.Message.msg("错误", "订单数目只支持>1的查询条件");
				num = 1;
			}
			store.proxy.extraParams.filter = Ext.encode(filter);
			store.proxy.extraParams.minOrderNum = num;
	    });
        me.updateView(me);
    }
});