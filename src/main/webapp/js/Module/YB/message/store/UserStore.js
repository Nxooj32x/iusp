Ext.define('Module.YB.message.store.UserStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.YB.message.model.UserModel',
    ],
    
    model     : 'Module.YB.message.model.UserModel',
    storeId   : 'Module.YB.message.store.UserStore',
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
        	read: '/admin/user/all/'
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
        	//Ext.each(records, function(record, index, itself){
				//var user = record.data;
				//Module.Soul.user.Operation.getOperationForUser(user);
			//});
        }
    }
});

