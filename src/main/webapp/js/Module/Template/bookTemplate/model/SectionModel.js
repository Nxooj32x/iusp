
Ext.define('Module.Template.bookTemplate.model.SectionModel', {
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
		name : 'stpl',
		mapping : 'stpl'
	},{
		name : 'showInCatalog',
		mapping : 'showInCatalog'
	},{
		name : 'source',
		mapping : 'source'
	},{
		name : 'sectionPos',
		mapping : 'sectionPos'
	},{
		name : 'defaultPageTpl',
		mapping : 'defaultPageTpl'
	},{
		name : 'pageNum',
		mapping : 'pageNum'
	},{
		name : 'beginPagination',
		mapping : 'beginPagination'
	}]
});

