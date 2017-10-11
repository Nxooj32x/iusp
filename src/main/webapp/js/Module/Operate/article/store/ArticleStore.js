Ext.define('Module.Operate.article.store.ArticleStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Operate.article.model.ArticleModel',
    ],
    
    model     : 'Module.Operate.article.model.ArticleModel',
    storeId   : 'Module.Operate.article.store.ArticleStore',
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
        	read: '/api/admin/article/'
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