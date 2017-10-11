Ext.define('Module.Store.coupon.Operation', {
	singleton: true,

	requires: [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView',
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Store.coupon.Tools'
	],

	doAdd : function(callback){
		var dict = Module.Store.coupon.Data;
		
		var moduleStore = Ext.create('Ext.data.Store', {
			fields: ['id', 'name','logo','status'],
			 proxy: {
		        type: 'rest',
		        headers : {
		        	Accept : 'application/json'
		        },
		        url: '/api/admin/module/',
		        reader: {
		            type: 'json',
		            root: 'data',
		            totalProperty : 'total'
		        },
		        autoLoad : true
		    }, 
		    filters: [
			    function(item) {
			        return item.data.status == "start";
			    }
			],
			remoteSort: true,
		});
		var moduleCombo = Ext.create('Ext.form.ComboBox', {
	          store:  moduleStore,
	          displayField: 'name',
	          anchor: '100%',
	          name : 'moduleId',
	          fieldLabel : '模块',
	          valueField : 'id',
	          width : 380,
	          allowBlank : false
		});

	
		var pal = Ext.create('Ext.form.Panel', {
		    bodyPadding: 5,
		    width: 350,
		    // 表单域 Fields 将被竖直排列, 占满整个宽度
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
		
		    items: [{
		    	xtype:"combo", 
		        fieldLabel: "类型",
		        name: 'type',
		        store:dict.typeCombo,
		        editable:false,
		        allowBlank: false,
		    },moduleCombo,{
		    	xtype : 'textfield',
				fieldLabel: "名称",
				name: 'name',
				allowBlank: false,
			},{
		    	xtype : 'textareafield',
				fieldLabel: "描述",
				name: 'description',
				maxLength:200,
				allowBlank: true,
			},{
		    	xtype:"combo", 
		        fieldLabel: "计费方式",
		        name: 'billingType',
		        store:dict.billingTypeCombo,
		        editable:false,
		        allowBlank: false,
		    },{
		    	xtype : 'numberfield',
				fieldLabel: "价格",
				name: 'price',
				allowBlank: false,
			},{
		    	xtype : 'textfield',
				fieldLabel: "服务时长(次数)",
				name: 'serviceTime',
				allowBlank: false,
			},{
		    	xtype : 'textfield',
				fieldLabel: "兑换码个数",
				name: 'codeNum',
				allowBlank: false,
			}
		    ],
		    // 重置 和 保存 按钮.
		    buttons: [{
		        text: '重置',
		        handler: function(btn) {
		        	btn.up('form').getForm().reset();
		        }
		    }, {
		        text: '保存',
		        handler: function(btn) {
			    	if (!btn.up('form').getForm().isValid())
			    		return;
			    	var win = btn.up('window');
		    		var values = btn.up('form').getForm().getValues();
		    		values.ownerAccoutId = 1;
		    		
		    		Soul.Ajax.request({
						url : '/storeapi/coupon/',
						method : 'post',
						jsonData  : values,
						loadMask : true,
						loadMsg : '新建兑换码类型',
						successMsg : '成功',
						success : function(response, opts) {
        					if (typeof(callback) == "function")
        						callback();
							win.close();
						}
					});
		    		//
		    		return;
		        }
		    }]
		});

		Ext.create('Ext.window.Window', {
			title: '新建客户信息',
		    bodyPadding: 5,
		    width: 350,
		    // 表单域 Fields 将被竖直排列, 占满整个宽度
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
		    // The fields
		    defaultType: 'textfield',
		    items:pal
		  
		}).show();
	},

	doEdit : function(coupon, callback){
		var dict = Module.Store.coupon.Data;
		
		var moduleStore = Ext.create('Ext.data.Store', {
			fields: ['id', 'name','logo','status'],
			 proxy: {
		        type: 'rest',
		        headers : {
		        	Accept : 'application/json'
		        },
		        url: '/api/admin/module/',
		        reader: {
		            type: 'json',
		            root: 'data',
		            totalProperty : 'total'
		        },
		        autoLoad : true
		    }, 
		    filters: [
			    function(item) {
			        return item.data.status == "start";
			    }
			],
			remoteSort: true,
		});
		moduleStore.load();
		var moduleCombo = Ext.create('Ext.form.ComboBox', {
	          store:  moduleStore,
	          displayField: 'name',
	          anchor: '100%',
	          name : 'moduleId',
	          fieldLabel : '模块',
	          valueField : 'id',
	          width : 380,
	          allowBlank : false
		});
	
	
	
		var pal = Ext.create('Ext.form.Panel', {
		    bodyPadding: 5,
		    width: 350,
		    // 表单域 Fields 将被竖直排列, 占满整个宽度
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
		
		    items: [{
		    	xtype:"combo", 
		        fieldLabel: "类型",
		        name: 'type',
		        store:dict.typeCombo,
		        editable:false,
		        allowBlank: false,
		    },{
		    	xtype:"combo", 
		        fieldLabel: "状态",
		        name: 'status',
		        store:dict.statusCombo,
		        editable:false,
		        allowBlank: false,
		    },moduleCombo,{
		    	xtype : 'textfield',
				fieldLabel: "名称",
				name: 'name',
				allowBlank: false,
			},{
		    	xtype : 'textareafield',
				fieldLabel: "描述",
				name: 'description',
				maxLength:200,
				allowBlank: true,
			},{
		    	xtype:"combo", 
		        fieldLabel: "计费方式",
		        name: 'billingType',
		        store:dict.billingTypeCombo,
		        editable:false,
		        allowBlank: false,
		    },{
		    	xtype : 'numberfield',
				fieldLabel: "价格",
				name: 'price',
				allowBlank: false,
			},{
		    	xtype : 'textfield',
				fieldLabel: "服务时长(次数)",
				name: 'serviceTime',
				allowBlank: false,
			},{
		    	xtype : 'textfield',
				fieldLabel: "兑换码个数",
				name: 'codeNum',
				allowBlank: false,
			}
		    ],
		    // 重置 和 保存 按钮.
		    buttons: [{
		        text: '重置',
		        handler: function(btn) {
		        	btn.up('form').getForm().reset();
		        }
		    }, {
		        text: '保存',
		        handler: function(btn) {
			    	if (!btn.up('form').getForm().isValid())
			    		return;
			    	var win = btn.up('window');
		    		var values = btn.up('form').getForm().getValues();
		    		
		    		Soul.Ajax.request({
						url : '/storeapi/coupon/' + coupon.id,
						method : 'put',
						jsonData  : values,
						loadMask : true,
						loadMsg : '修改兑换码类型',
						successMsg : '成功',
						success : function(response, opts) {
	    					if (typeof(callback) == "function")
	    						callback();
							win.close();
						}
					});
		    		//
		    		return;
		        }
		    }]
		});
		pal.getForm().setValues(coupon);
		Ext.create('Ext.window.Window', {
			title: '新建客户信息',
		    bodyPadding: 5,
		    width: 350,
		    // 表单域 Fields 将被竖直排列, 占满整个宽度
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
		    // The fields
		    defaultType: 'textfield',
		    items:pal
		  
		}).show();
	},

	doViewBill:function(coupon,callbackFun){
		var billGrid = Ext.create('Module.Store.coupon.view.BillGrid',{
			coupon : coupon,
			anchor : '100% 100%',
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar'
			}]
		});

		var win = new Ext.Window({
			title: coupon.name,
			items: billGrid,
			width: 1020,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
			tbar : [{
				xtype : 'numberfield',
				fieldLabel: "数量",
				name: 'num',
				value : 1,
				allowBlank: false,
			}, {
				xtype : 'button',
				iconCls : 'x-add-icon',
				text: "生成兑换码",
				allowBlank: false,
				listeners:{
					click : function(button){
						var num = button.up('window').down('numberfield[name=num]').getValue();
						num = num < 1? 1 : num;
						var payTool = SurePayUtil.getPayTool();
						var payReq = new PayRequest({
						  	note : '生成兑换码',
						  	busType : 'COUPONBILL',
						  	busId : coupon.id,
						 	subject : "购买兑换码",
						 	busNum : num,
						 	useAccount : true,
						 	useTPP : true,
						  	payWay : "",
						 	redirectUrl : location.pathname + location.search
						 });
						 payTool.pay(payReq.config, function(ret){
							 billGrid.updateView(billGrid);
						 });
					}
				}
			}]
		});
		win.show();
		
	}

});