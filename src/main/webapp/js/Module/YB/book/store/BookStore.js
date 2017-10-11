Ext.define('Module.YB.book.store.BookStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.YB.book.model.BookModel',
    ],
    autoLoad:true,
    model     : 'Module.YB.book.model.BookModel',
    storeId   : 'Module.YB.book.store.BookStore',
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
        	read: '/book/'
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
        	/*Ext.each(records, function(record, index, itself){
				var user = record.data;
				Module.YB.book.Operation.getOperationForUser(user);
			});*/
        }
    }
});

