Ext.define('Module.Store.StoreOwner.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.storegrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Store.StoreOwner.Data',
        'Module.Store.StoreOwner.Renderer',
        'Module.Platform.CI.Operation'
    ],

    checkIndexes: [], //默认选择的列
    disableIndexes: [''],

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Store.StoreOwner.Renderer;
        var comboData = Module.Store.StoreOwner.Config.COMBO_DATA;
        columns.push(
        	new Ext.grid.RowNumberer(),
            {
            	text: "ID",
	            dataIndex: 'id',
	            searchType: 'number',
	            align: 'left',
	            width: 30
            },{
                text: STOREOWNER_LABEL.storeType,
                dataIndex: 'storeType',
                searchType: 'string',
                align: 'left',
                width: 100
            }, {
                text: STOREOWNER_LABEL.storeNum,
                dataIndex: 'storeNum',
                searchType: 'number',
                align: 'left',
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
                text: STOREOWNER_LABEL.ctime,
                dataIndex: 'ctime',
                searchType: 'date',
                align: 'center',
                width: 150,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    if (v == null) {
                        return "未知";
                    }
                    return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
                }
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
			} ,{
            	text: "店铺信息",
				xtype : 'actioncolumn',
				dataIndex : 'storeNum',
				width: 80,
				editor : false,
				align : 'center',
	            sortable:false,
				items : [{
					icon : '/img/icon/shop.png',
					tooltip : '店铺信息',
					scope : this,
					handler : this.onShopInfoClick,
					isDisabled : function(v, r, c, item, r) {
						if (r.data.storeNum > 0)
							return false;
						else
							return true;
					}
				}]
			} 
        );

        var me = this;
        me.contextMenu = me.portlet.buildStoreOptMenu();
        
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
	    	searchText : '今天注册', 
	    	icon : '/img/icon/quota.png',
	    	name : 'todayOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'ctime',
		    	logicalOp : 'between',
		    	value : [todayBegin, todayEnd]
	    	}],
	    };
	    var yesterdayFilter = {
	    	searchText : '昨天注册', 
	    	icon : '/img/icon/quota.png',
	    	name : 'yesterdayOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'ctime',
		    	logicalOp : 'between',
		    	value : [yesterdayBegin, yesterdayEnd]
	    	}],
	    };
        

        var weekOderFilter = {
	    	searchText : '最近7天注册', 
	    	icon : '/img/icon/quota.png',
	    	name : 'weekOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'ctime',
		    	logicalOp : 'between',
		    	value : [weekBegin, weekEnd]
	    	}],
	    };
	    var monthOderFilter = {
	    	searchText : '本月注册', 
	    	icon : '/img/icon/quota.png',
	    	name : 'monthOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'ctime',
		    	logicalOp : 'between',
		    	value : [monthBegin, monthEnd]
	    	}],
	    }
	    var lastMonthOderFilter = {
	    	searchText : '上月注册', 
	    	icon : '/img/icon/quota.png',
	    	name : 'lastmonthOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'ctime',
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

        var sm = new Ext.selection.CheckboxModel({
            listeners: {
                selectionchange: function (sm2) {
                	editCI = me.portlet.down('menuitem[name=editCI]');
                	righteditCI = me.contextMenu.down('menuitem[name=editCI]');
                    if (sm2.getCount() == 1) {
                    	editCI.enable();
                    	righteditCI.enable();
                    } else {
                    	editCI.disable();
                    	righteditCI.disable();
                    }
                }
            }
        });

        var store = Ext.create('Module.Store.StoreOwner.store.StoreOwnerStore');

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: store
        });

        this.callParent(arguments);
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
    
	onShopInfoClick : function(view ,rowIndex, colIndex, item, e, record, row){
    	var me = this;
    	Module.Store.StoreOwner.Operation.doShowShopDetialFuncion(record.data);
	},

    afterRender: function () {
        var me = this;

        me.callParent(arguments);

        var callbackFun = function(){
            me.selModel.deselectAll();
            me.updateView(me);
        };

        var sm = me.selModel,

        editCI = me.portlet.down('menuitem[name=editCI]');

        var editCIFunc = function () {
            var records = sm.getSelection();
            if (records[0].data.ciId) {
            	Soul.Ajax.request({
					url : '/platformapi/ci/' + records[0].data.ciId,
					method : 'get',
					loadMask : true,
					loadMsg : '载入中',
					successMsg : '成功',
					success : function(response, opts) {
            			Module.Platform.CI.Operation.doModifyCI(response,callbackFun);
					}
				});
            } else {
            	Module.Platform.CI.Operation.doAddCI(records[0].data.id,callbackFun);
            }
        };

        editCI.on("click",editCIFunc);
        me.contextMenu.down('menuitem[name=editCI]').on('click', editCIFunc);

    }
});