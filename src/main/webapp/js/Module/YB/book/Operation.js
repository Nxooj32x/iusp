
Ext.define('Module.YB.book.Operation', {
	singleton: true, 
	
	requires  : [
	],
	
	onRecyclingClick : function(callback){
		Soul.Ajax.request({
			url : "/book/",
			method : 'delete',
			loadMask : true,
			loadMsg : '回收书册',
			successMsg : '回收成功',
			confirm : '确认要回收系统中用户删除的书册，删除后所有的资源都将被清除，不可恢复？',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},
	onTransformTplClick : function(bookId,callback){
		Soul.Ajax.request({
			url : "/book/"+bookId+"/bookTpl",
			method : 'post',
			loadMask : true,
			loadMsg : '转换模板',
			successMsg : '转换成功',
			confirm : '是否确认将当期选中书册转换成模板',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},
	/**
	 * 改变书籍状态
	 */
	changeBookStatus : function(bookId,status,callback){
		Soul.Ajax.request({
			url : "/book/"+bookId+"/status/"+status,
			method : 'PUT',
			loadMask : true,
			loadMsg : '改变书册状态',
			successMsg : '状态改变成功',
			confirm : '确认要恢复系统中用户删除的书册？',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},
});
