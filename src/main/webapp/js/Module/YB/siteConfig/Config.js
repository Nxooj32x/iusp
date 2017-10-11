Ext.define('Module.YB.siteConfig.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil', 'Module.YB.siteConfig.Renderer', 'Soul.util.ObjectView'],
	
	staticConfig : [{
		path : 'all',
		ftl : 'all',
		name : "全部静态页面（首页，注册，使用指南，用户协议）"
	},{
		path : 'article',
		ftl : 'article',
		name : "全部文章"
	},{
		path : 'pageTpl/',
		ftl : 'pageTpl/list.ftl',
		name : "模板展厅",
		handlerURL : "bookTpl/pageTpl"
	},{
		path : 'bookTpl/',
		ftl : 'bookTpl/landing.ftl',
		name : "着陆页",
		handlerURL : "bookTpl/landing"
	},{
		path : 'bookTpl/',
		ftl : 'bookTpl/photo.ftl',
		name : "模板库照片书列表页面（仅仅包含列表页面）",
		handlerURL : "bookTpl/photo"
	},{
		path : 'bookTpl/',
		ftl : 'bookTpl/index.ftl',
		name : "模板库互动书列表页面（仅仅包含列表页面）",
		handlerURL : "bookTpl/hudong"
	},{
		path : 'bookTpl/',
		ftl : 'bookTpl/index.ftl',
		name : "模板库页面（包含列表页面和内页所有的，执行时间较长）",
		handlerURL : "bookTpl/",
		params : {
			detail : true
		}
	},{
		path : 'index',
		ftl : 'index.ftl',
		name : "首页"
	},{
		path : 'shop',
		ftl : 'shop.ftl',
		name : "小店"
	},{
		path : 'register',
		ftl : 'register.ftl',
		name : "注册页面"
	},{
		path : 'conditions',
		ftl : 'conditions.ftl',
		name : "用户协议页面"
	},{
		path : 'use_guide',
		ftl : 'use_guide.ftl',
		name : "使用指南页面"
	},{
		path : 'use_guide_photo',
		ftl : 'use_guide_photo.ftl',
		name : "使用指南_照片书"
	},{
		path : 'use_guide_interact',
		ftl : 'use_guide_interact.ftl',
		name : "使用指南_互动册"
	},{
		path : 'photoprint/index',
		ftl : 'photoprint/index.ftl',
		name : "照片冲印首页"
	}],
	
	seoDesc : {
		head_meta_description : '通用description配置，如果没有 特殊配置使用此配置 ',
		head_meta_author : '通用author配置 ，如果没有 特殊配置使用此配置 ',
		head_meta_keywords: '通用keywords配置 ，如果没有 特殊配置使用此配置 ',
		index_head_meta_description: '首页description配置',
		index_head_meta_author: '首页author配置 ',
		index_head_meta_keywords: '首页keywords配置  ',
		bookTpl_head_meta_description: '模板库列表页description配置  ',
		bookTpl_head_meta_author: '模板库列表页author配置',
		bookTpl_head_meta_keywords: '模板库列表页keywords配置 ',
		bookTpl_毕业册_head_meta_description: '模板详情（毕业册）description配置 ',
		bookTpl_毕业册_head_meta_author: '模板详情（毕业册）author配置  ',
		bookTpl_毕业册_head_meta_keywords: '模板详情（毕业册）keywords配置 ',
		bookTpl_聚会册_head_meta_description: '模板详情（聚会册）description配置 ',
		bookTpl_聚会册_head_meta_author: '模板详情（聚会册）author配置  ',
		bookTpl_聚会册_head_meta_keywords: '模板详情（聚会册）keywords配置 ',
		bookTpl_照片书_head_meta_description: '模板详情（照片书）description配置 ',
		bookTpl_照片书_head_meta_author: '模板详情（照片书）author配置  ',
		bookTpl_照片书_head_meta_keywords: '模板详情（照片书）keywords配置 '
			
	},
	
	getRendererConfig : function() {
		var renderer = Module.YB.siteConfig.Renderer;
		var ret = renderer.config;
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
