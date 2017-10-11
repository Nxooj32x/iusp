Ext.define('Module.Platform.CI.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.cashgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Module.Platform.CI.Data',
        'Module.Platform.CI.Renderer',
        'Module.Platform.CI.view.SOSearchTab',
        'Module.Store.StoreOwner.Operation'
    ],

    checkIndexes : [  'name', 'ciType', 'status'], // 默认选择的列
    disableIndexes: ['contactLogs'],

    initComponent: function () {
    	var dict = Module.Platform.CI.Data;
    	
    	var userStore = Ext.create('Ext.data.Store', {
			fields: ['id', 'name', 'mobilePhone',],
			 proxy: {
		        type: 'rest',
		        headers : {
		        	Accept : 'application/json'
		        },
		        url: '/suresecurity/role/name/storeAdmin/user/',
		        reader: {
		            type: 'json'
		        },
		        autoLoad : true
		    }, 
			remoteSort: true,
		});

        var columns = new Array();
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: "客户类型",
                dataIndex: 'ciType',
                searchType : 'combo',
                comboData : dict.ciTypeCombo,
                align: 'left',
                width: 80

            }, {
                text: "客户名称",
                dataIndex: 'name',
                searchType: 'string',
                align: 'left',
                width: 100
			}, {
				text: "使用产品",
				dataIndex: 'useProducts',
				searchType: 'string',
				align: 'left',
				width: 100
			}, {
				text: "主营业务",
				dataIndex: 'mainBusiness',
				searchType: 'string',
				align: 'left',
				width: 100
			}, {
				text: "店铺级别",
				dataIndex: 'tbShopLevel',
				searchType: 'string',
				align: 'left',
				width: 100
            }, {
                text : "沟通记录",
	            dataIndex: 'contactLogs',
	            searchType: 'string',
	            align: 'left',
	            width: 80,
	            renderer : function(val, u, r, rowIndex, columnIndex, s, v){
					return val.length + "条记录"
				}
            },{
				xtype : 'actioncolumn',
				dataIndex : 'contactLogs',
				width: 80,
				editor : false,
				align : 'center',
				items : [ {
					icon : '/img/icon/change.png',
					tooltip : '管理沟通记录',
					name : 'view',
					scope : this,
					handler : this.onPreviewClick,
					isDisabled : function(v, r, c, item, r) {
					}
				},{
					icon : '/img/icon/userpasswd.png',
					tooltip : '绑定服务商账户',
					name : 'view',
					scope : this,
					handler : this.onBindingClick,
					isDisabled : function(v, r, c, item, r) {
					}
				},{
					icon : '/img/icon/info.png',
					tooltip : '服务商店铺信息',
					name : 'view',
					scope : this,
					handler : this.onSoInfoClick,
					isDisabled : function(v, r, c, item, r) {
						if (r.data.soId)
							return false;
						else 
							return true;
					}
				}]
			}, {
				text : "录入人(选择)",
				dataIndex: 'commerceId',
				hidden : true,
				searchType: 'combo',
				align: 'left',
				width: 200,
				comboCfg : {
					store: userStore,
					displayField: 'name',
		            valueField : 'id',
		            multiSelect: true,
		            anchor: '100%',
		            width : 200,
					listConfig: {
		                // Custom rendering template for each item
		                getInnerTpl: function() {
		                    return '{name}({mobilePhone})';
		                }
		            }
				}
			},{
				text : "录入人",
				dataIndex: 'commerceName',
				searchType: 'string',
				align: 'left',
				width: 150
			}, {

                text: "地址/网址",
                dataIndex: 'address',
                searchType: 'string',
                align: 'left',
                width: 200,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return "<a href='"+v+"' target='_blank'>"+v+"<a/>";
				}
            }, {
                text: "备注",
                dataIndex: 'remarks',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text : "状态",
	            dataIndex: 'status',
	            searchType : 'combo',
	            comboData : dict.statusCombo,
	            align: 'left',
	            width: 80
	        }, {
	            text: "创建时间",
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
	        }, {
                text : "联系人",
                dataIndex: 'contacts',
                searchType: 'string',
                align: 'left',
                width: 80
            }, {
                text : "电话",
                dataIndex: 'phone',
                searchType: 'string',
                align: 'left',
                width: 100
            }, {
                text : "手机",
	            dataIndex: 'mobile',
	            searchType: 'string',
	            align: 'left',
	            width: 100
            }, {
                text : "QQ",
	            dataIndex: 'qq',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        }, {
                text : "微信",
	            dataIndex: 'wechat',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        }, {
                text : "旺旺",
	            dataIndex: 'aliww',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        }, {
                text : "EMAIL",
	            dataIndex: 'email',
	            searchType: 'string',
	            align: 'left',
	            width: 100

            }
        );

        var me = this;

        me.contextMenu = me.portlet.buildCIOptMenu();
        var sm = new Ext.selection.CheckboxModel({
        	mode : 'SINGLE',
            listeners: {
                selectionchange: function (sm2) {
	            	var records = sm2.getSelection();
	
	                var addCI = me.portlet.down('menuitem[name=addCI]');
	                var rightAddCI = me.contextMenu.down('menuitem[name=addCI]');
	                
	                var modifyCI = me.portlet.down('menuitem[name=modifyCI]');
	                var rightModifyCI = me.contextMenu.down('menuitem[name=modifyCI]');
	                
	                var delCI = me.portlet.down('menuitem[name=delCI]');
	                var rightDelCI = me.contextMenu.down('menuitem[name=delCI]');
	                
	                var bindingSO = me.portlet.down('menuitem[name=bindingSO]');
	                var rightBindingSO = me.contextMenu.down('menuitem[name=bindingSO]');
	                
	                var editCL = me.portlet.down('menuitem[name=editCL]');
	                var rightEditCL = me.contextMenu.down('menuitem[name=editCL]');
	                
	                var soDetail = me.portlet.down('menuitem[name=soDetail]');
	                var rightSoDetail = me.contextMenu.down('menuitem[name=soDetail]');
	                
	                if (records.length == 1) {
	                	modifyCI.enable();
	                	rightModifyCI.enable();
	                	delCI.enable();
	                	rightDelCI.enable();
	                	bindingSO.enable();
	 	                rightBindingSO.enable();
	 	                editCL.enable();
	 	                rightEditCL.enable();
	 	                soDetail.enable();
	 	                rightSoDetail.enable();
	                } else {
	                	modifyCI.disable();
	                	rightModifyCI.disable();
	                	delCI.disable();
	                	rightDelCI.disable();
	                	bindingSO.disable();
	 	                rightBindingSO.disable();
	 	                editCL.disable();
	 	                rightEditCL.disable();
	 	                soDetail.disable();
	 	                rightSoDetail.disable();
	                }
                }
            }
        });

        var store = Ext.create('Module.Platform.CI.store.CustomerInfo');

        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "未查询到数据"
            },
            store: store,
        });

        this.callParent(arguments);
    },

    onPreviewClick : function(view ,rowIndex, colIndex, item, e, record, row){
    	var me = this;
		me.portlet.gotoView("Module.Platform.CI.view.ContactLogEdit", {customerInfo: record.data}, me.portlet);
    },
    
	onBindingClick : function(view ,rowIndex, colIndex, item, e, record, row){
    	var me = this;
		var callbackFun = function(){
	        me.updateView(me);
	    };
    	Module.Platform.CI.Operation.showBindingWin(record.data, callbackFun);
    },
    
	onSoInfoClick : function(view ,rowIndex, colIndex, item, e, record, row){
		Module.Platform.CI.Operation.doShowStoreShopInfo(record.data);
	},

	doubleClick : function(view, record, item, index, e, eOpts){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(record.data, Module.Platform.CI.Config.getRendererConfig(), CI_PROPERIES, Module.Platform.CI.Config.showProperties, { sortableColumns : false, 
		header : false, frame : false, bodyBorder : true});
		
		var activeTab = Ext.getCmp('info-panel').getActiveTab();
		if(activeTab != null){
			activeTab.close();
		}
		Soul.util.ObjectView.showInEast(property,record.data.name);
	},

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.portlet.down('[name=cioperation]').show();
        me.portlet.down('[name=backpperation]').hide();
        var callbackFun = function(){
            me.updateView(me);
        };

        var sm = me.selModel,
        		addCI = me.portlet.down('menuitem[name=addCI]'),
        		delCI = me.portlet.down('menuitem[name=delCI]'),
        		bindingSO = me.portlet.down('menuitem[name=bindingSO]'),
        		editCL = me.portlet.down('menuitem[name=editCL]'),
        		soDetail = me.portlet.down('menuitem[name=soDetail]'),
        		modifyCI = me.portlet.down('menuitem[name=modifyCI]');

        var addCIFunc = function(){
        	Module.Platform.CI.Operation.doAddCI(null, callbackFun);
        }
        addCI.on('click', addCIFunc);
        me.contextMenu.down('menuitem[name=addCI]').on('click', addCIFunc);
        
        var modifyCIFunc = function(){
        	var records = sm.getSelection();
        	Module.Platform.CI.Operation.doModifyCI(records[0].data, callbackFun);
        }
        modifyCI.on('click', modifyCIFunc);
        me.contextMenu.down('menuitem[name=modifyCI]').on('click', modifyCIFunc);
        
        var delCIFunc = function(){
        	var records = sm.getSelection();
        	Module.Platform.CI.Operation.doDelCI(records[0].data, callbackFun);
        }
        delCI.on('click', modifyCIFunc);
        me.contextMenu.down('menuitem[name=delCI]').on('click', delCIFunc);
        
        var bindingSOFunc = function(){
        	var records = sm.getSelection();
        	Module.Platform.CI.Operation.showBindingWin(records[0].data, callbackFun);
        }
        bindingSO.on('click', bindingSOFunc);
        me.contextMenu.down('menuitem[name=bindingSO]').on('click', bindingSOFunc);
        
        var editCLFunc = function(){
        	var records = sm.getSelection();
        	me.portlet.gotoView("Module.Platform.CI.view.ContactLogEdit", {customerInfo: records[0].data}, me.portlet);
        }
        editCL.on('click', editCLFunc);
        me.contextMenu.down('menuitem[name=editCL]').on('click', editCLFunc);
        
        var soDetailFunc = function(){
        	var records = sm.getSelection();
        	Module.Platform.CI.Operation.doShowStoreShopInfo(records[0].data);
        }
        soDetail.on('click', soDetailFunc);
        me.contextMenu.down('menuitem[name=soDetail]').on('click', soDetailFunc);

    }
});