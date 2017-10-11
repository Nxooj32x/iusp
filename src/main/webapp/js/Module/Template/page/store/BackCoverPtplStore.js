Ext.define('Module.Template.page.store.BackCoverPtplStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Template.page.model.PtplModel',
    ],
    
    model     : 'Module.Template.page.model.PtplModel',
    storeId   : 'Module.Template.page.store.BackCoverPtplStore',
    proxy: {
        type: 'rest',
        headers : {
        	"Content-Type": "application/json; charset=utf-8", 
        	Accept : 'application/json'
        },
        extraParams : {
        	filter : {}
        },
        url: '/api/tpl/page/type/BACK_COVER/',
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

