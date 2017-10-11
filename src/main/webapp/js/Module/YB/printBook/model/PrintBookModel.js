
Ext.define('Module.YB.printBook.model.PrintBookModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'ctime',
		mapping : 'ctime'
	},{
		name : 'status',
		mapping : 'status'
	},{
		name : 'bookId',
		mapping : 'bookId'
	},{
		name : 'allNum',
		mapping : 'allNum'
	},{
		name : 'ownerId',
		mapping : 'ownerId'
	}]
});

