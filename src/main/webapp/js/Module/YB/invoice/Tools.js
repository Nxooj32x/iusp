Ext.define('Module.YB.invoice.Tools', {
	singleton: true,
	requires  : [
		'Soul.util.ObjectView'
	],

	showInvoiceInEast : function(id){
		var me = this;
		
		var invoice = Module.YB.invoice.Data.getInvoiceById(id);
		if(window.console){console.log(invoice);}
		if (invoice != null){
			var property = me.getInvoicePropertyGrid(invoice);
			Soul.util.ObjectView.showInEast(property, invoice.invoiceName);
		}
	},

	getInvoicePropertyGrid : function(invoice){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(
				invoice,
				Module.YB.invoice.Config.getRendererConfig(), 
				INVOICE_PROPERTY,
				Module.YB.invoice.Config.showProperties,
				{iconCls : 'md-user'});
		
		return property;
	},

	constructor : function() {
        this.callParent(arguments);
    }
});