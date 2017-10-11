Ext.define('Module.Operate.activityAccess.store.ActivityAccessStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Operate.activityAccess.model.ActivityAccessModel',
    ],
    
    model     : 'Module.Operate.activityAccess.model.ActivityAccessModel',
    storeId   : 'Module.Operate.activityAccess.store.ActivityAccessStore',
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
        	read: '/api/admin/activityAccess/'
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
    listeners:{}
});