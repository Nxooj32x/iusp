/**
 * 分页工具
 * @param options
 * 			url 	数据请求url
 * 			params	请求参数		
 * 			showDiv	请求后更新div
 * 			start	数据其实位置
 * 			limit	每页显示数目
 * 			
 */
function PagingTool(options){
	
	var me = this;
	
	me.url = options.url;
	me.showDiv = options.showDiv;
	me.params = options.params || {};
	me.start = options.start || 0;
	me.limit = options.limit || 5;
	me.total = 0;
	me.pageNum = 1;
	me.totalPage = 1;
	me.callback = options.callback || function(){};
	
	/**
	 * 重新载入当前页
	 */
	me.reload = function(callback){
		me.callback = callback || me.callback;
		if (me.start < 0)
			me.start == 0;
		else if (me.start > me.total)
			me.start = me.total - me.limit;
		me.params.start = me.start;
		me.params.limit = me.limit;
		me.params.query = me.query;
		SureAjax.load(me.showDiv, {
			url : me.url,
			data :me.params,
			parseError : false,
			callback : me.callback
		});
	};
	
	/**
	 * 到第一页
	 */
	me.moveFirst = function(){
		me.gotoPage(1);
	};
	
	/**
	 * 到第最后一页
	 */
	me.moveLast = function(){
		if (me.totalPage > 0)
			me.gotoPage(me.totalPage);
	};
	
	/**
	 * 到指定页
	 */
	me.gotoPage = function(index) {
		index = index < 1? 1 : index;
		me.start = (index - 1) * me.limit;
		me.reload();
	};
	
	/**
	 * 上一页
	 */
	me.prePage = function(){
		me.start = me.start - me.limit;
		if (me.start < 0)
			me.start = 0;
		me.reload();
	};
	
	/**
	 * 下一页
	 */
	me.nextPage = function(){
		me.start = me.start + me.limit;
		me.reload();
	};
	
	/**
	 * 检测当前页码是否超过总页码，如果超过则显示最后一页
	 */
	me.checkPageNum = function(){
		if (me.pageNum > me.totalPage)
			me.moveLast();
	};
}

$(function(){
	
});