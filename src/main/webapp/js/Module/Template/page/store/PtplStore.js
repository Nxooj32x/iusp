Ext.define('Module.Template.page.store.PtplStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Template.page.model.PtplModel',
    ],
    
    model     : 'Module.Template.page.model.PtplModel',
    storeId   : 'Module.Template.page.store.PtplStore',
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
        	create: '/api/tpl/page/',
        	read: '/api/tpl/page/',
        	update : '/api/tpl/page/',
        	destroy : '/api/tpl/page/'
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
    }
});

