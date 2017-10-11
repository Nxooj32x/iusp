Ext.define('Module.Store.distributor.store.DistributorStore', {
    extend    : 'Ext.data.Store',
    requires  : [
        ''
    ],

    model     : 'Module.Store.distributor.model.DistributorModel',
    //storeId   : 'Module.Store.distributor.store.DistributorStore',
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
            read: '/storeapi/distributor/'
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