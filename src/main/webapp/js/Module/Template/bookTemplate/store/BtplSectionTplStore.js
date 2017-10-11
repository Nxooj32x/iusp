Ext.define('Module.Template.bookTemplate.store.BtplSectionTplStore', {
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Template.bookTemplate.model.SectionTplModel',
    ],
    
    model     : 'Module.Template.bookTemplate.model.SectionTplModel',
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
        	read: '/api/tpl/section/'
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
    listeners:{
    }
});

