
Ext.define('Module.Template.bookTemplate.model.SectionTplModel', {
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
		name : 'sectionType',
		mapping : 'sectionType'
	},{
		name : 'defaultPageType',
		mapping : 'defaultPageType'
	},{
		name : 'minNum',
		mapping : 'minNum'
	},{
		name : 'maxNum',
		mapping : 'maxNum'
	},{
		name : 'showInCatalog',
		mapping : 'showInCatalog'
	},{
		name : 'onlyOne',
		mapping : 'onlyOne'
	},{
		name : 'onlyOnePtpl',
		mapping : 'onlyOnePtpl'
	},{
		name : 'canEditPage',
		mapping : 'canEditPage'
	},{
		name : 'canDelete',
		mapping : 'canDelete'
	},{
		name : 'canShowInCatalog',
		mapping : 'canShowInCatalog'
	},{
		name : 'canMixPage',
		mapping : 'canMixPage'
	},{
		name : 'posMode',
		mapping : 'posMode'
	}]
});

