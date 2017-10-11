/**
 * 分页工具
 * 		例：contentType = json
 * 			var paging = new PagingTool2({
 *				url : pageingRequetUrl,
 *				start : 0,
 *				limit : 5,
 *				totalUrl : totalResquestUrl,
 *				prev_text : "<<",
 *				next_text : ">>",
 *				paginationDiv : "#paginationDiv",
 *				contentType : 'json',
 *				callback : showPageDataFunc,
 *			});
 *			paging.show();
 * 		例：contentType = text
 * 			var paging = new PagingTool2({
 *				url : pageingRequetUrl,
 *				start : 0,
 *				limit : 5,
 *				showDiv : '#showDiv',
 *				paginationDiv : "#paginationDiv",
 *			});
 *			paging.show();
 *
 *			在分页jsp页面中，执行js函数
 *			paging.setPagingBar('${pageData.total}');
 * 			
 * 
 * 
 * @param options
 * 			url 				数据请求url
 * 			total/totalUrl 		数据总数/数据总数请求url（可以与url相同）
 * 			params				请求参数		
 * 			paginationDiv		分页工具栏DIV	
 * 			contentType 		分页数据类型，可以使json，text 默认为text
 * 			showDiv				当contentType为text时，请求后更新的div	
 * 			callback 			如果分页数据类型为json，则该函数负责更新显示区域，如果分页数据类型为text，该函数在载入页面后执行
 * 			start				数据起始位置	默认0
 * 			limit				每页显示数目	默认5
 * 			prev_text			自定义上一页显示<span>内容
 * 			next_text			自定义下一页显示<span>内容
 */
function PagingTool2(options){
	
	var me = this;
	
	options = options || {};
	
	me.showDiv = options.showDiv;//信息显示DIV
	me.paginationDiv = options.paginationDiv;//分页工具栏DIV
	
	me.url = options.url;
	me.totalUrl = options.totalUrl || null;//获取总个数的url,如果为null则需要指定total
	me.total = options.total || 0;
	
	me.params = options.params || {};
	me.start = options.start || 0;
	me.limit = options.limit || 5;
	me.pageNum=me.start/me.limit;
	//me.pageNum = 0;
	if(options.link_to != 'none'){
	    me.link_to = options.link_to || window.location.hash;
	}
	
	me.contentType = options.contentType || "text";
	
	me.callback = options.callback || function(){};
	
	me.prev_text = options.prev_text || "前一页";
	me.next_text = options.next_text || "后一页";
	
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
		if (me.totalUrl != null ) {
			SureAjax.ajax({
				url : me.totalUrl,
				type : 'GET',
				async : false,
				headers: {
						"Accept" : "application/json",
						"Content-Type": "application/json; charset=UTF-8"
				},
				data : me.params,
				success : function(ret){
					var total;
					if (typeof(ret) == 'object')
						total = ret.total || 0;
					else if (typeof(ret) == 'number')
						total = ret;
					else
						total = 0;
					if (me.start >= total){
						me.start = total - me.limit;
						me.pageNum=me.pageNum-1;
					}
					me.setPagingBar(total);
					me.params.start = me.start;
					me.params.limit = me.limit;
				}
			});
		} 
		if (me.contentType === "text") {
			SureAjax.load(me.showDiv, {
				url : me.url,
				data :me.params,
				parseError : false,
				callback : me.callback
			});
		} else if (me.contentType === "json"){
			SureAjax.ajax({
				url : me.url,
				type : 'GET',
				headers: {
						"Accept" : "application/json",
						"Content-Type": "application/json; charset=UTF-8"
				},
				data : me.params,
				success : function(ret){
					var total;
					if (typeof(ret) == 'object')
						total = ret.total || 0;
					else if (typeof(ret) == 'number')
						total = ret;
					else
						total = 0;
					me.total = total;
					me.setPagingBar(total);
					me.callback(ret);
				}
			});
		}
	};
	
	/**
	 * 更新分页工具栏
	 */
	me.setPagingBar = function(total){
		me.total = total || me.total;
		$(me.paginationDiv).pagination(me.total, {
			num_edge_entries: 1, //边缘页数
			num_display_entries: 4, //主体页数
			callback: me.gotoPage,
			current_page : me.pageNum,
			link_to : me.link_to,
			items_per_page: me.limit, //每页显示1项
			prev_text: me.prev_text,
			next_text: me.next_text,
			load : false
		});
		if (me.total <= 0) {
			$(me.paginationDiv).hide();
		} else {
			$(me.paginationDiv).show();
		}
	};
	
	/**
	 * 显示分页数据
	 */
	me.show = function(callback){
		me.callback = callback || me.callback;
		if (me.start < 0)
			me.start == 0;
		else if (me.start > me.total)
			me.start = me.total - me.limit;
		me.params.start = me.start;
		me.params.limit = me.limit;
		
		if (me.totalUrl != null && me.totalUrl != me.url) {
			SureAjax.ajax({
				url : me.totalUrl,
				type : 'GET',
				headers: {
						"Accept" : "application/json",
						"Content-Type": "application/json; charset=UTF-8"
				},
				data : me.params,
				success : function(ret){
					var total;
					if (typeof(ret) == 'object')
						total = ret.total || 0;
					else if (typeof(ret) == 'number')
						total = ret;
					else
						total = 0;
					me.setPagingBar(total);
					me.reload();
				}
			});
		} else {
			me.setPagingBar(me.total);
			me.reload();
		}
	};
	
	/**
	 * 到指定页
	 */
	me.gotoPage = function(index) {
		index = index < 0? 0 : index;
		index = index > me.total? me.total : index;
		me.pageNum = index;
		me.start = index * me.limit || 0;
		me.reload();
	};
	
}
