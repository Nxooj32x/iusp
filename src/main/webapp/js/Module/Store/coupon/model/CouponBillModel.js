Ext.define('Module.Store.coupon.model.CouponBillModel', {
    extend : 'Ext.data.Model',
    fields : [{
        name : 'id',
        mapping : 'id'
    },{
        name : 'couponId',
	    mapping : 'couponId'
	},{
        name : 'name',
        mapping : 'name'
    },{
        name : 'moduleName',
        mapping : 'moduleName'
    },{
        name : 'moduleCode',
        mapping : 'moduleCode'
    },{
        name : 'soId',
        mapping : 'soId'
    },{
        name : 'billingType',
        mapping : 'billingType'
    },{
        name : 'serviceTime',
        mapping : 'serviceTime'
    },{
        name : 'distributorId',
        mapping : 'distributorId'
    },{
        name : 'smId',
        mapping : 'smId'
    },{
        name : 'status',
	    mapping : 'status'
	},{
	    name : 'code',
	    mapping : 'code'
	},{
        name : 'ctime',
	    mapping : 'ctime'
	},{
	    name : 'utime',
	    mapping : 'utime'
	}]
});
