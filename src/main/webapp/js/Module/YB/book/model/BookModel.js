
Ext.define('Module.YB.book.model.BookModel', {
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
		name : 'etime',
		mapping : 'etime'
	},{
		name : 'dtime',
		mapping : 'dtime'
	},{
		name : 'status',
		mapping : 'status'
	},{
		name : 'identifyCode',
		mapping : 'identifyCode'
	},{
		name : 'type',
		mapping : 'type'
	},{
		name : 'thumbnail',
		mapping : 'thumbnail'
	},{
		name : 'createrId',
		mapping : 'createrId'
	},{
		name : 'locked',
		mapping : 'locked'
	},{
		name : 'pageNum',
		mapping : 'pageNum'
	},{
		name : 'bookInfo',
		mapping : 'bookInfo'
	}, {
		name : 'createrId',
		mapping : 'createrId'
	}, {
		name : 'identifyCode',
		mapping : 'identifyCode'
	}, {
		name : 'percent',
		mapping : 'percent'
	}]
});
/**
 * 未初始化状态
 */
Module.YB.book.model.BookModel.BOOK_STATE_UNINIT = 0;
/**
 * 删除状态
 */
Module.YB.book.model.BookModel.BOOK_STATE_DEL = -1;
/**
 * 编辑状态
 */
Module.YB.book.model.BookModel.BOOK_STATE_EDIT = 9;
/**
 * 提交中状态
 * 		锁定编辑
 */
Module.YB.book.model.BookModel.BOOK_STATE_SUBMITING = 19;
/**
 * 提交状态
 */
Module.YB.book.model.BookModel.BOOK_STATE_SUBMIT = 99;
/**
 * 毕业册类型
 */
Module.YB.book.model.BookModel.BOOK_TYPE_SCHOOL = 0;

