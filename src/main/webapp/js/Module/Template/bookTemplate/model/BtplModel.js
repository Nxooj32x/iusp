
Ext.define('Module.Template.bookTemplate.model.BtplModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'type',
		mapping : 'type'
	},{
		name : 'desc',
		mapping : 'desc'
	},{
		name : 'status',
		mapping : 'status'
	},{
		name : 'style',
		mapping : 'style'
	},{
		name : 'tag',
		mapping : 'tag'
	},{
		name : 'tplType',
		mapping : 'tplType'
	},{
		name : 'usedNum',
		mapping : 'usedNum'
	},{
		name : 'popularityNum',
		mapping : 'popularityNum'
	},{
		name : 'sayGoodNum',
		mapping : 'sayGoodNum'
	}],
	
	proxy : {
		type : 'rest',
		url : '/book/tpl/'
	}
});

