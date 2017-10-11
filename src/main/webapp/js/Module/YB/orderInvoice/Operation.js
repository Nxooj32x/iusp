Ext.define('Module.YB.orderInvoice.Operation', {
	singleton : true,
	requires : [],

	//订单发票详情
	detailOrderInvoiceFunc : function(record, callbackFn) {
		var panel = new Ext.Panel({
			height : 400,
			width : 600,
			frame : true,
			autoScroll : true,
			layoutConfig : {
				animate : true
			},
			html : '<div id="orderInvoiceDetailDiv"></div>',
			listeners : {
				'beforerender' : function(){
					var url = '/admin/orderInvoice/' + record.data.id + '/detail';
					Ext.Ajax.request({
						url : url,
						params : [],
						success : function(ret){
							document.getElementById("orderInvoiceDetailDiv").innerHTML = ret.responseText;
						},
						failure : function(ret){
							document.getElementById("orderInvoiceDetailDiv").innerHTML = ret.responseText;
						}
					});
				}
			}
		});

		new Ext.Window({
			title: ORDER_INVOICE_LABEL.orderDetailInfo,
			autoDestroy:true,
			modal:true,
			items: panel
		}).show();
	},

	makeOrderInvoiceFunc : function(record, callbackFn) {
		var data = record.data;

		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 280,
			frame: true,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 250
			},
			items:[{
					name: 'title',
					fieldLabel: ORDER_INVOICE_PROPERTY.title,
					allowBlank: false,
					readOnly: true,
					value: data.title
				},{
					xtype: 'textarea',
					name: 'content',
					fieldLabel: ORDER_INVOICE_PROPERTY.content,
					allowBlank: false,
					readOnly: true,
					value: data.content
				},{
					name: 'category',
					fieldLabel: ORDER_INVOICE_PROPERTY.category,
					allowBlank: false,
					readOnly: true,
					value: Module.YB.orderInvoice.Renderer.translateOrderInvoiceCategory(data.category)
				},{
					name: 'money',
					fieldLabel: ORDER_INVOICE_PROPERTY.money,
					allowBlank: false,
					readOnly: true,
					value: data.money ? data.money : 0
				},{
					name: 'invoiceNub',
					fieldLabel: ORDER_INVOICE_PROPERTY.invoiceNub,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					value: data.invoiceNub,
					blankText: '不可为空'
				}]
		});

		var win = null;
		win = new Ext.Window({
			title: ORDER_INVOICE_LABEL.makeOrderInvoice,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:1px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.apply,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

					var url = '/api/admin/orderInvoice/' + data.id + '/invoiceNub';
					Soul.Ajax.restAction(url, 'put', params, params, callbackFn, null, null);
					if (win != null) {
						win.close();
						win = null;
					}
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					if (win != null) {
						win.close();
						win = null;
					}
				}
			}]
		});

		win.show();
	},

	//编辑物流信息
	deliveryInfoFunc : function(record, callbackFn) {
		var deliveryId = record.data.deliveryId;
		if(deliveryId){
		}else{
			Soul.util.MessageUtil.showErrorInfo("错误", "订单发票数据错误，物流Id不存在");
			return;
		}

		var url = '/api/admin/order/delivery/' + deliveryId;
		var data = Soul.Ajax.getSyncData(url);
		if(data){
			this.editDeliveryInfo(data, callbackFn);
		}else{
			Soul.util.MessageUtil.showErrorInfo("错误", "订单发票数据错误，物流信息不存在");
		}
	},

	//编辑物流信息，共用(data不可为空，至少需要有id字段，即物流id)
	editDeliveryInfo : function(data, callbackFn) {
		var radiogroup = new Ext.form.RadioGroup({
				fieldLabel : ORDER_INVOICE_LABEL.deliveryInfoType,
				labelAlign: 'right',
				items : [{
					boxLabel : '快递',
					name : "type",
					inputValue : "express",
					checked : true
				}, {
					boxLabel : '平邮',
					name : "type",
					inputValue : "post",
					disabled:true
				}]
		});
		radiogroup.setValue(data.type);

		var ctime = data.ctime == null ? null : Ext.util.Format.date(new Date(data.ctime),'Y-m-d');
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 280,
			frame: true,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 250
			},
			items:[radiogroup,{
					name: 'name',
					fieldLabel: ORDER_INVOICE_LABEL.deliveryInfoName,
					maxLength: 15,
					maxLengthText: '最多输入15个字符',
					allowBlank: false,
					value: data.name,
					blankText: '不可为空'
				},{
					name: 'code',
					fieldLabel: ORDER_INVOICE_LABEL.deliveryInfoCode,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					value: data.code,
					blankText: '不可为空'
				},{
					xtype: 'datefield',
					name: 'ctime',
					format: 'Y-m-d',
					maxValue: new Date(),
					editable: true,
					allowBlank: false,
					disabled: false,
					value: ctime,
					fieldLabel: ORDER_INVOICE_LABEL.deliveryInfoCtime
				}]
		});

		var win = null;
		win = new Ext.Window({
			title: ORDER_INVOICE_LABEL.deliveryInfo,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:1px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.apply,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

					var url = '/api/admin/order/delivery/' + data.id;
					Soul.Ajax.restAction(url, 'put', params, params, callbackFn, null, null);
					if (win != null) {
						win.close();
						win = null;
					}
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					if (win != null) {
						win.close();
						win = null;
					}
				}
			}]
		});

		win.show();
	}
});