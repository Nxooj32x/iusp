Ext.define('Module.Platform.CI.store.CustomerInfo', {
    extend    : 'Ext.data.Store',
    requires  : [
        ''
    ],

    model     : 'Module.Platform.CI.model.CustomerInfo',
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
            read: '/platformapi/ci/'
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

