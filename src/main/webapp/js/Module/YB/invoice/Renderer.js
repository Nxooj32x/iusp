Ext.define('Module.YB.invoice.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.YB.invoice.Tools'
  	],

  translateCtime : function(v){
		if(v == null){
			return INVOICE_LABEL.unknown;
		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	translateCdate : function(v){
		if(v == null){
  			return INVOICE_LABEL.unknown;
  	}
		return Ext.util.Format.date(new Date(v),'Y-m-d');
	},
	translateInvoiceIssueMode : function(v){
		if(v == null){
  			return INVOICE_LABEL.unknown;
    }
    if("plain" == v){
			return "普通发票";
		}else if("vat" == v){
			return "增值税发票";
		}else{
			return v;
		}
	},
	translateInvoiceType : function(v){
		if(v == null){
			return INVOICE_LABEL.unknown;
		}
		if("personal" == v){
			return "个人";
		}else if("company" == v){
			return "公司";
		}else{
			return v;
		}
	}
});