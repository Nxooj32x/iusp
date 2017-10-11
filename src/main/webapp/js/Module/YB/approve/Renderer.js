Ext.define('Module.YB.approve.Renderer', {//定义一个类，相当于java里的包路径
	singleton: true,
	requires  : [//需要的类列表（数组）    实例化类之前必须加载的类列表
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.YB.approve.Tools',
 		'Module.YB.approve.model.OrderModel'
  	],
  	
  	
  	translatetime : function(v){
//		return Ext.util.Format.date(new Date(v),'Y-m-d H-i-s');
  		if(v!=null){
  			return Ext.util.Format.date(new Date(v),'Y-m-d');
  		}else{
  			return '';
  		}
	},
	translatePrintStatus : function(v){
		if(v==Module.YB.approve.model.OrderModel.PRINT_Y){
			return '已打印';
		}else if(v==Module.YB.approve.model.OrderModel.PRINT_N){
			return '未打印';
		}else if(v==Module.YB.approve.model.OrderModel.PRINT_ING){
			return '打印中';
		}else if(v==Module.YB.approve.model.OrderModel.PAY_TYPE_ONLINE){
			return '在线支付';
		}else{
			return v;
		}
	},
	
	translateStatus : function(v){
		if(v==Module.YB.approve.model.OrderModel.ORDER_STATUS_ALL){
			return '所有';
		}else if(v==Module.YB.approve.model.OrderModel.ORDER_STATUS_CANCELED){
			return '已取消';
		}else if(v==Module.YB.approve.model.OrderModel.ORDER_STATUS_PLACED){
			return '已下单';
		}else if(v==Module.YB.approve.model.OrderModel.ORDER_STATUS_PAYED){
			return '已付款';
		}else if(v==Module.YB.approve.model.OrderModel.ORDER_STATUS_PRODUCING){
			return '生产中';
		}else if(v==Module.YB.approve.model.OrderModel.ORDER_STATUS_DELIVERYED){
			return '已发货';
		}else if(v==Module.YB.approve.model.OrderModel.ORDER_STATUS_COMPLETED){
			return '已完成';
		}else if(v==Module.YB.approve.model.OrderModel.ORDER_STATUS_EVALUATED){
			return '已评价';
		}else{
			return v;
		}
	},
	translatePostStatus : function(v){
		if(v==Module.YB.approve.model.OrderModel.POST_Y){
			return '已邮寄';
		}else if(v==Module.YB.approve.model.OrderModel.POST_N){
			return '未邮寄';
		}else if(v==Module.YB.approve.model.OrderModel.POST_ING){
			return '邮寄中';
		}else{
			return v;
		}
	},
	translateApproveStatus : function(v){
		if(v==Module.YB.approve.model.OrderModel.APPROVED){
			return '审批中';
		}else if(v==Module.YB.approve.model.OrderModel.APPROVED_Y){
			return '审批通过';
		}else if(v==Module.YB.approve.model.OrderModel.APPROVED_N){
			return '否决';
		}else{
			return '未提交';
		}
	},
	translatePayType : function(v){
		if(v==Module.YB.approve.model.OrderModel.POST_Y){
			return '现金';
		}else if(v==Module.YB.approve.model.OrderModel.POST_N){
			return '电子';
		}else{
			return v;
		}
	},
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.YB.approve.model.OrderModel;
   	},
	getSearchBarConfig : function(me){
		var renders = this;
		return  Ext.create('Ext.container.Container',{
			layout : 'hbox',
			items : [{
				xtype : 'container',
				layout : {
					type : 'table',
					columns : 3
				},
				items : [{
						xtype : 'textfield',
						width : 200,
						name : 'orderId',
						fieldLabel : YB_APPROVE_LABEL.orderId,
						labelAlign : 'right'
					},{
						xtype:'datefield',
						fieldLabel:YB_APPROVE_LABEL.startTime,
						labelAlign:'right',
						format:'Y-m-d',
						width:200,
						name:'dateStart',
						editable:false,
						listeners: {
					        'select': function (it) {
					            var start = it.getValue();
					            Ext.getCmp('end').setMinValue(start);
					            var endDate = Ext.getCmp('end').getValue();
					            if (endDate != null &&start > endDate) {
					                Ext.getCmp('end').setValue(start);
					            }
					        }
					    }
					},{
						xtype:'datefield',
						labelAlign:'right',
						fieldLabel:YB_APPROVE_LABEL.endTime,
						format:'Y-m-d',
						name:'dateEnd',
						width:200,
						editable:false,
						listeners: {
					                select: function (it) {
					                    var endDate = it.getValue();
					                    var start = Ext.getCmp('start').getValue();
					                    if (start != null && start > endDate) {
					                        Ext.getCmp('start').setValue(endDate);
					                    }
					                }
					    }
					},{
						xtype:'combo',
						labelAlign:'right',
						fieldLabel:YB_APPROVE_LABEL.orderStatus,
						name:'status',
						value:'',
						displayField : 'name',
						valueField : 'status',
						store : Ext.create('Ext.data.Store',{
							fields :['name','status'],
							data : Module.YB.approve.Operation.orderStatusDataFunction()
						}),
						width:200
					},
//					{
//						xtype:'combo',
//						labelAlign:'right',
//						fieldLabel:'打印状态',
//						name:'printStatus',
//						value:'',
//						displayField : 'name',
//						valueField : 'status',
//						store : Ext.create('Ext.data.Store',{
//							fields :['name','status'],
//							data : Module.YB.approve.Operation.orderPrintStatusDataFunction()
//						}),
//						width:200
//					},
					{
						xtype:'combo',
						labelAlign:'right',
						fieldLabel:YB_APPROVE_LABEL.postStatus,
						name:'postStatus',
						value:'',
						displayField : 'name',
						valueField : 'status',
						store : Ext.create('Ext.data.Store',{
							fields :['name','status'],
							data : Module.YB.approve.Operation.orderPostStatusDataFunction()
						}),
						width:200
					},{
						xtype : 'textfield',
						width : 200,
						name : 'creator',
						fieldLabel : YB_APPROVE_PROPERTY.creator,
						labelAlign : 'right'
					}    
				         ]
			},{
				xtype : 'container',
				layout : {
					type : 'table',
					columns : 1
				},
				items : [{
						xtype:'button',
						margin:'0 5 0 40',
						iconCls : 'search',
						width:50,
						text : '查询',
						handler:function(){
							var components = {};
							Ext.each(renders.searchFields,function(v){
								components[v] = renders.getComponent(me,v);
							});
							renders.refreshGrid(components);
						}
					}, {
						xtype:'button',
						margin:'5 5 0 40',
						iconCls : 'reset',
						width:50,
						text : '重置',
						handler:function(){
							Ext.each(renders.searchFields,function(v){
								f = renders.getComponent(me,v);
								if(v == 'ctime' || v=='mtime'){
									f.setValue(null);
								}else{
									f.setValue('');
								}
							});
						}
					}
//					,{
//						xtype:'button',
//						margin:'5 5 0 40',
//						width:50,
//						text : '更多',
//						handler:function(it){
//							if(me.down("panel[name=search]").getHeight()==59){
//								it.setText('收起');
//								me.down("panel[name=search]").setHeight(85);
//								me.down("panel[name=gridPanel]").anchor='100% -59';
//							}else{
//								it.setText('更多');
//								me.down("panel[name=search]").setHeight(59);
//								me.down("panel[name=gridPanel]").anchor='100% -85';
//							}
//						}
//					}
					]
			}]});
	},
	getComponent : function(me,v){
		f = me.down('datefield[name=' + v + ']');
		if (f == null) {
			f = me.down('combo[name=' + v + ']');
		}
		if (f == null) {
			f = me.down('textfield[name=' + v + ']');
		}
		return f;
	},
	searchFields : ['orderId','status','postStatus','dateStart','dateEnd','creator'],
	refreshGrid : function(components){
		var me = this;
		var filter = new SQLFilter();
		var sel = [];
		var dateStart = components.dateStart.getValue();
		var dateEnd =  components.dateEnd.getValue();
		if(dateStart != null || dateEnd != null){
			if(dateStart == null){
				dateStart = new Date(0);
			}
			if(dateEnd == null){
				var date = new Date(0);
				date.setFullYear(new Date().getFullYear()+1);
				dateEnd = date;
			}
			var se = new SQLException('and','ctime', 'between',  [dateStart,dateEnd],  me.caseSensitive);
			sel.push(se);
		}
		Ext.each(me.searchFields,function(v){
			f = components[v];
			value = f.getValue();
			if(f.xtype == 'textfield' && value != null && value != ''){
				var se = new SQLException('and', v, 'like',   value + "%25",  !me.caseSensitive);
				sel.push(se);
			}else if(f.xtype == 'combo' && value != null && value != ''){
				var se = new SQLException('and', v, '=',  value,  !me.caseSensitive);
             	sel.push(se);
			}
		});
		var se1 = new SQLException('and', 'approveStatus', 'in', ['0','1'],  !me.caseSensitive);
     	sel.push(se1);
     	var se2 = new SQLException('not', 'status', '=', 'canceled',  !me.caseSensitive);
     	sel.push(se2);
     	var sqlOrder = new SQLOrder('approveStatus','ASC');
		if (sel.length > 0)
			filter.buildBySe(sel,sqlOrder);
		Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore").proxy.extraParams.filter= Ext.encode(filter.getFilter());
		Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore").loadPage(1);
	}
});