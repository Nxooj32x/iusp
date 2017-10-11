
Ext.define('Module.YB.printBook.Operation', {
	singleton: true, 
	
	requires  : [
	],
	
	onRecyclingClick : function(callback){
		Soul.Ajax.request({
			url : "/printBook/",
			method : 'delete',
			loadMask : true,
			loadMsg : '回收打印书册 ',
			successMsg : '回收成功',
			confirm : '确认要回收系统中的 打印书册 ？所有无订单关联的打印书册都会被清除，请谨慎操作！',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	}
});
