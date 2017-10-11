Ext.define('Module.Template.page.store.CoverPtplStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Template.page.model.PtplModel',
    ],
    
    model     : 'Module.Template.page.model.PtplModel',
    storeId   : 'Module.Template.page.store.CoverPtplStore',
    proxy: {
        type: 'rest',
        headers : {
        	"Content-Type": "application/json; charset=utf-8", 
        	Accept : 'application/json'
        },
        extraParams : {
        	filter : {}
        },
        url: '/api/tpl/page/type/COVER/',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty : 'total'
        },
        autoLoad : true,
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

