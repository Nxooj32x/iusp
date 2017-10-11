
Ext.define('Module.Operate.article.model.ArticleModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'alias',
		mapping : 'alias'
	},{
		name : 'keywords',
		mapping : 'keywords'
	},{
		name : 'description',
		mapping : 'description'
	},{
		name : 'articleType.name',
		mapping : 'articleType.name'
	},{
		name : 'articleTypeId',
		mapping : 'articleType.id'
	},{
		name : 'state',
		mapping : 'state'
	},{
		name : 'tag',
		mapping : 'tag'
	},{
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'userName',
		mapping : 'userName'
	},{
		name : 'seq',
		mapping : 'seq'
	},{
		name : 'content',
		mapping : 'content'
	}]
});

Module.Operate.article.model.ArticleModel.STATE_OPEN = 'open';
Module.Operate.article.model.ArticleModel.STATE_CLOSE = 'close';
