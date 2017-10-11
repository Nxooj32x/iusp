
Ext.define('Module.YB.promotion.model.PromotionItemModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'promotionId',
		mapping : 'promotionId'
	},{
		name : 'promotionType',
		mapping : 'promotionType'
	},{
		name : 'limitMoney',
		mapping : 'limitMoney'
	},{
		name : 'minMoney',
		mapping : 'minMoney'
	},{
		name : 'maxMoney',
		mapping : 'maxMoney'
	},{
		name : 'discount',
		mapping : 'discount'
	},{
		name : 'reduceMoney',
		mapping : 'reduceMoney'
	}]
});


