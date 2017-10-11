Ext.define('Module.Operate.articleType.store.ArticleTypeStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Operate.articleType.model.ArticleTypeModel',
    ],
    
    model     : 'Module.Operate.articleType.model.ArticleTypeModel',
    storeId   : 'Module.Operate.articleType.store.ArticleTypeStore',
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
        	read: '/api/admin/articleType/'
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