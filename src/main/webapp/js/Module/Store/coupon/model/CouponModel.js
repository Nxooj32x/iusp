Ext.define('Module.Store.coupon.model.CouponModel', {
    extend : 'Ext.data.Model',
    fields : [{
        name : 'id',
        mapping : 'id'
    },{
        name : 'createUserId',
	    mapping : 'createUserId'
	},{
        name : 'name',
        mapping : 'name'
    },{
        name : 'type',
        mapping : 'type'
    },{
        name : 'description',
        mapping : 'description'
    },{
        name : 'moduleId',
        mapping : 'moduleId'
    },{
        name : 'billingType',
        mapping : 'billingType'
    },{
        name : 'price',
        mapping : 'price'
    },{
        name : 'serviceTime',
        mapping : 'serviceTime'
    },{
        name : 'ctime',
        mapping : 'ctime'
    },{
        name : 'utime',
        mapping : 'utime'
    },{
        name : 'status',
	    mapping : 'status'
	},{
	    name : 'codeNum',
	    mapping : 'codeNum'
	},{
	    name : 'ownerAccoutId',
	    mapping : 'ownerAccoutId'
	}]
});
