Ext.define('Module.Operate.isay.store.ISayTopicStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Operate.isay.model.ISayTopicModel'
    ],
    
    model     : 'Module.Operate.isay.model.ISayTopicModel',
    storeId   : 'Module.Operate.isay.store.ISayTopicStore',
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
        	read: '/api/admin/isay/topic/'
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