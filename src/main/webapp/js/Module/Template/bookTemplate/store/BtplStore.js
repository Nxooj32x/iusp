Ext.define('Module.Template.bookTemplate.store.BtplStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Template.bookTemplate.model.BtplModel',
    ],
    
    model     : 'Module.Template.bookTemplate.model.BtplModel',
    storeId   : 'Module.Template.bookTemplate.store.BtplStore',
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
        	create: '/book/tpl/',
        	read: '/book/tpl/',
        	update : '/book/tpl/',
        	destroy : '/book/tpl/'
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

