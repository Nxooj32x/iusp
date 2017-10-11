Ext.define('Module.YB.invoice.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox'
	],

	editInvoiceFunc : function(record, callbackFn) {
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
					name: 'invoiceCode',
					fieldLabel: INVOICE_PROPERTY.invoiceCode,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					value: record.invoiceCode,
					blankText: '不可为空'
				},{
					xtype: 'textarea',
					name: 'invoiceNote',
					fieldLabel: INVOICE_PROPERTY.invoiceNote,
					maxLength: 200,
					maxLengthText: '最多输入200个字符',
					allowBlank: false,
					value: record.invoiceNote,
					blankText: '不可为空'
				},{
					xtype: 'datefield',
					name: 'issueDate',
					format: 'Y-m-d',
					maxValue: new Date(),
					editable: true,
					allowBlank: false,
					disabled: false,
					fieldLabel: INVOICE_ORDER_PROPERTY.issueDate,
					value: Module.YB.order.Renderer.translatetime(record.data.order.issueDate)
				},{
					name: 'freightType',
					fieldLabel: INVOICE_PROPERTY.freightType,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					value: record.freightType,
					blankText: '不可为空'
				},{
					name: 'freightCode',
					fieldLabel: INVOICE_PROPERTY.freightCode,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					value: record.freightCode,
					blankText: '不可为空'
				}]
		});
		var win = null;
		win = new Ext.Window({
			title: INVOICE_LABEL.editInvoiceInfo,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.apply,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

					Soul.Ajax.restAction('/admin/invoice/' + record.id, 'put', params, params, callbackFn, null, null);
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