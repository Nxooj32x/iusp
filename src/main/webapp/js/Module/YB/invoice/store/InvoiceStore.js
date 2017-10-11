Ext.define('Module.YB.invoice.store.InvoiceStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.YB.invoice.model.InvoiceModel',
    ],
    
    model     : 'Module.YB.invoice.model.InvoiceModel',
    storeId   : 'Module.YB.invoice.store.InvoiceStore',
    proxy: {
        type: 'rest',
        headers : {
        	"Content-Type": "application/json; charset=utf-8", 
        	Accept : 'application/json'
        },
        extraParams : {
        	filter : {}
        },
        api: {
        	read: '/admin/invoice/'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty : 'total'
        },
        listeners:{
            exception:function( theproxy, response, operation, options ){
            	Soul.util.MessageUtil.parseResponse(response);
            }
        }
    },
    remoteSort: true,
    listeners:{
        load : function(store, records, successful, operation, eOpts){
        }
    }
});

