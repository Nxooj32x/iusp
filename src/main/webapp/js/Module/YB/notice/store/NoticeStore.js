Ext.define('Module.YB.notice.store.NoticeStore', {
    singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
        'Module.YB.notice.model.NoticeModel'
    ],

    model     : 'Module.YB.notice.model.NoticeModel',
    storeId   : 'Module.YB.notice.store.NoticeStore',
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
            read: '/api/notice'
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

