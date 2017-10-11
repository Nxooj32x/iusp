
Ext.define('Module.Operate.articleType.model.ArticleTypeModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'module',
		mapping : 'module'
	},{
		name : 'describtion',
		mapping : 'describtion'
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
	}]
});

Module.Operate.articleType.model.ArticleTypeModel.STATE_OPEN = 'open';
Module.Operate.articleType.model.ArticleTypeModel.STATE_CLOSE = 'close';

