Ext.define('Module.Operate.vote.store.VoteTopicStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Operate.vote.model.VoteTopicModel'
    ],
    
    model     : 'Module.Operate.vote.model.VoteTopicModel',
    storeId   : 'Module.Operate.vote.store.VoteTopicStore',
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
        	read: '/api/admin/vote/topic/'
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