Ext.define('Module.YB.printBook.store.PrintBookStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.YB.printBook.model.PrintBookModel',
    ],
    autoLoad:true,
    model     : 'Module.YB.printBook.model.PrintBookModel',
    storeId   : 'Module.YB.printBook.store.PrintBookStore',
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
        	read: '/printBook/'
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
				Module.YB.printBook.Operation.getOperationForUser(user);
			});*/
        }
    }
});

