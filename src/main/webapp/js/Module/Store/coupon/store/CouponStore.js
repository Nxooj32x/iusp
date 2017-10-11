Ext.define('Module.Store.coupon.store.CouponStore', {
    extend    : 'Ext.data.Store',
    requires  : [
        ''
    ],

    model     : 'Module.Store.coupon.model.CouponModel',
    //storeId   : 'Module.Store.coupon.store.CouponStore',
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
            read: '/storeapi/coupon/'
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