Ext.define('Module.YB.approve.view.Grid', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ordergrid',
	//需要的类列表（数组） 实例化类之前必须加载的类列表
	requires  : [    
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.YB.approve.Data',
		'Module.YB.approve.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.YB.approve.Tools',
		'Module.YB.approve.view.OrderWindow'
	],
	toolbar : null,
	initComponent : function() {//此处为相关字段的展示
		var me = this;
		var renders = Module.YB.approve.Renderer;
		me.contextMenu = me.portlet.buildOrderOptMenu();
		var sm = new Ext.selection.RowModel({
//			mode : "SINGLE",
			listeners: {
				selectionchange: function(sm) {//设定菜单是否可以操作
					Module.YB.approve.Tools.orderGridSelectionChange(me,sm);
				}
			}
		});
		Ext.apply(this, {//请求查询没有数据时的提示
			layout : 'anchor',
			items : [{
				xtype : 'panel',
				name:'search',
				height : 59,
				anchor : '100%',
				autoHeight:false,
				border : false,
				items : [{
					xtype : 'panel',
					border : false,
					style : 'top:5px',
					items :renders.getSearchBarConfig(me)
				}]
			},{
				xtype : 'panel',
				name : 'gridPanel',
				anchor : '100% -59',
				border : false,
				layout : 'fit',
				items : [Ext.create('Ext.grid.Panel', {
						name:'gridPanel',
					 	store : Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore"),
					 	emptyText : "暂无数据",
						selModel: sm,
						tbar:me.getToolbar(),
						tbar:me.toolbar,
					    columns:[
					        new Ext.grid.RowNumberer({text:'行号',width:35,align : 'center'}),//行数
					        {text :YB_APPROVE_PROPERTY.ctime, sortable: false, menuDisabled:true, dataIndex:'ctime', searchType : 'string',
								width : 80,
								align : 'center',
								renderer: function(val, u,r, rowIndex, columnIndex, s){
									return renders.translatetime(val);
								}
							},
					        {text: YB_APPROVE_PROPERTY.id,sortable: true,dataIndex: 'id', searchType : 'string',hidden:true},
							{text: YB_APPROVE_PROPERTY.orderId,sortable: true,dataIndex: 'orderId', align : 'center',searchType : 'string'},
							{text: YB_APPROVE_PROPERTY.creator,dataIndex: 'creator',width: 50, align : 'center',searchType : 'string',sortable: false},
							{text :YB_APPROVE_PROPERTY.bookName, sortable: false, menuDisabled:true, dataIndex:'bookName', searchType : 'string',
								width : 80,
								align : 'center'
							},
							{text : YB_APPROVE_PROPERTY.singlePrice,width : 60, dataIndex:'originPirce',  menuDisabled:true, searchType : 'string',align : 'center',
								renderer: function(val, u,r, rowIndex, columnIndex, s){
									var data = r.data;
									var num = data.goodsNum;
									var sp = val / num;
									return sp;
								}
							},
							{text: YB_APPROVE_PROPERTY.goodsNum, dataIndex:'goodsNum',align : 'center',width: 60, searchType : 'number'},
							{text :YB_APPROVE_PROPERTY.originPrice, dataIndex:'originPirce', sortable: false, menuDisabled:true, searchType : 'string',width : 60,align : 'center'},
							{text :YB_APPROVE_PROPERTY.price, dataIndex:'price', sortable: false, menuDisabled:true, searchType : 'string',width : 60,align : 'center'},
							{text: YB_APPROVE_PROPERTY.daozhangTime, dataIndex:'daozhangTime',align : 'center',width: 80, searchType : 'string',
								renderer: function(val, u,r, rowIndex, columnIndex, s){
									return renders.translatetime(val);
								}
							},
							{text: YB_APPROVE_PROPERTY.kaipiaoDate, dataIndex:'kaipiaoDate',align : 'center',width: 80, searchType : 'string',
								renderer: function(val, u,r, rowIndex, columnIndex, s){
									return renders.translatetime(val);
								}
							},
							{text: YB_APPROVE_PROPERTY.shouyanDate, dataIndex:'shouyanDate',align : 'center',width: 80, searchType : 'string',
								renderer: function(val, u,r, rowIndex, columnIndex, s){
									return renders.translatetime(val);
								}
							},
							{text: YB_APPROVE_PROPERTY.youjiDate, dataIndex:'youjiDate',align : 'center',width: 80, searchType : 'string',
								renderer: function(val, u,r, rowIndex, columnIndex, s){
									return renders.translatetime(val);
								}
							},
							{text: YB_APPROVE_PROPERTY.owner, dataIndex:'owner',align : 'center',width: 80, searchType : 'string'},
							{text: YB_APPROVE_PROPERTY.telephone, dataIndex:'telephone',align : 'center',width: 80, searchType : 'string'},
							{text :YB_APPROVE_PROPERTY.address, sortable: false, menuDisabled:true, dataIndex:'address', searchType : 'string',
								width : 70,
								align : 'center'
							},
							{text : YB_APPROVE_PROPERTY.postStatus, sortable: false, menuDisabled:true, dataIndex:'postStatus', searchType : 'number',
								width :70,
								align : 'center',
								renderer: function(val, u,r, rowIndex, columnIndex, s){
									return renders.translatePostStatus(val);
								}
							},
							{text: YB_APPROVE_PROPERTY.huoyunWay, dataIndex:'huoyunWay',align : 'center',width: 60, searchType : 'string'},
							{text: YB_APPROVE_PROPERTY.yundanNum, dataIndex:'yundanNum',align : 'center',width: 70, searchType : 'string'},
							{text :YB_APPROVE_PROPERTY.status, sortable: false, menuDisabled:true, dataIndex:'status', searchType : 'number',
								width : 70,
								align : 'center',
								renderer: function(val, u,r, rowIndex, columnIndex, s){
									return renders.translateStatus(val);
								}
							},{text :YB_APPROVE_PROPERTY.approveStatus, sortable: false, menuDisabled:true, dataIndex:'approveStatus', searchType : 'string',
								width : 70,
								align : 'center',
								renderer: function(val, u,r, rowIndex, columnIndex, s){
									return renders.translateApproveStatus(val);
								}
							}
					    ],
					    bbar:Ext.create('Ext.PagingToolbar',{
							store: Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore"),
							style : 'border-left:solid 0px;border-right:solid 0px',
							bodyStyle : 'border-left:solid 0px;border-right:solid 0px',
							displayInfo: true,
							displayMsg: "显示 {0} - {1} 条的数据，一共 {2} 条",
							emptyMsg: "此页没有任何数据",
							afterPageText: "页,共{0}页",
							beforePageText: "当前是第",
							prevText: "上一页",
							nextText: "下一页",
							firstText: "第一页",
							lastText:"最后一页",
							refreshText: "刷新"
						}),
					    listeners : {
					    	afterrender : function(){
					    		var filter = new SQLFilter();
					    		var sel = [];
					    		var se1 = new SQLException('and', 'approveStatus', 'in', ['0','1'],  !me.caseSensitive);
					         	sel.push(se1);
					         	var se2 = new SQLException('not', 'status', '=', 'canceled',  !me.caseSensitive);
					         	sel.push(se2);
				             	var sqlOrder = new SQLOrder('approveStatus','ASC');
				             	if (sel.length > 0)
				        			filter.buildBySe(sel,sqlOrder);
					    		Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore").proxy.extraParams.filter= Ext.encode(filter.getFilter());
					    		Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore").loadPage(1);
					    	},
							itemcontextmenu : function(view,record,htmlElement,index,event,eopts){
								event.preventDefault();
								if (me.contextMenu != null)
									me.contextMenu.showAt(event.getXY());
							}
					    }
				})
				]
			}
			],
			listeners : {
				beforerender : function(){
		    		var activeTab = Ext.getCmp('info-panel').getActiveTab();
		    		if(activeTab != null){
		    			activeTab.close();
//		    			Ext.getCmp('info-panel').collapse();
//		    			Soul.util.ObjectView.closeEast(); 
		    		}
		    	}
			}
		});
		this.callParent(arguments);
	},
	getToolbar : function(){
		var me = this;
		me.toolbar =  Ext.create('Ext.Toolbar',{
			style : 'border-left:solid 0px;border-right:solid 0px',
			bodyStyle : 'border-left:solid 0px;border-right:solid 0px',
			items : ['->',
			{
				iconCls : 'switch',
				name :'approval',
				disabled:true,
				tooltip: ORDER_BUTTON.approval,
				text :  YB_APPROVE_LABEL.approval,
			}
			]
		});
		return me.toolbar;
	},
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        var sm = me.down('grid[name=gridPanel]').getSelectionModel();
		approvalRightMI = me.contextMenu.down('menuitem[name=approval]');
		approvalTopMI = me.portlet.down('menuitem[name=approval]');
		approvalToolbar = me.toolbar.down('button[name=approval]');
		
		var callBackFuc = function(){
			sm.deselectAll();
			Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore").loadPage(1);
		};
		var approvalFunction = function(){
			var records = sm.getSelection();
			Module.YB.approve.view.OrderWindow.approvalWindow(records[0].data,callBackFuc);
		};
		
		approvalRightMI.on('click',approvalFunction);
		approvalTopMI.on('click',approvalFunction);
		approvalToolbar.on('click',approvalFunction);
        
    }
});
