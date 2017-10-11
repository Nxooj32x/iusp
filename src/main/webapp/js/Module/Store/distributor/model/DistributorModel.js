Ext.define('Module.Store.distributor.model.DistributorModel', {
    extend : 'Ext.data.Model',
    fields : [{
        name : 'id',
        mapping : 'id'
    },{
        name : 'userId',
	    mapping : 'userId'
	},{
        name : 'shopId',
        mapping : 'shopId'
    },{
        name : 'parentId',
        mapping : 'parentId'
    },{
        name : 'accountId',
        mapping : 'accountId'
    },{
        name : 'code',
        mapping : 'code'
    },{
        name : 'applyTime',
        mapping : 'applyTime'
    },{
        name : 'approveTime',
        mapping : 'approveTime'
    },{
        name : 'status',
        mapping : 'status'
    },{
        name : 'level',
        mapping : 'level'
    },{
        name : 'type',
        mapping : 'type'
    },{
        name : 'contacts',
	    mapping : 'contacts'
	},{
	    name : 'phone',
		mapping : 'phone'
	}]
});
