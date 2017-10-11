
Ext.define('Module.YB.promotion.model.PromotionModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'desc',
		mapping : 'desc'
	},{
		name : 'type',
		mapping : 'type'
	},{
		name : 'status',
		mapping : 'status'
	},{
		name : 'isOnly',
		mapping : 'isOnly'
	},{
		name : 'supportOrderType',
		mapping : 'supportOrderType'
	},{
		name : 'beginDate',
		mapping : 'beginDate'
	},{
		name : 'endDate',
		mapping : 'endDate'
	}]
});





