Ext.define('Module.CustomModule.modulemanager.store.BillingStore', {
    singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
        'Module.CustomModule.modulemanager.model.BillingModel',
    ],

    model     : 'Module.CustomModule.modulemanager.model.BillingModel',
    storeId   : 'Module.CustomModule.modulemanager.store.BillingStore',
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
            read: ''
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
        load : function(store, records, successful, operation, eOpts){
            Ext.each(records, function(record, index, itself){
                var bill = record.data;
                Module.CustomModule.modulemanager.Operation.getOperationForBilling(bill);
            });
        }
    }
});