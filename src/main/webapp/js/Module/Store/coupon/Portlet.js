Ext.define('Module.Store.coupon.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',

	requires  : [
		'Module.Store.coupon.Operation',
		'Module.Store.coupon.Data',
		'Module.Store.coupon.store.CouponStore'
	],

	VIEW : {
		'Module.Store.coupon.view.Grid' : LABEL.grid
	},

	title: "兑换码类型管理",

	iconCls : 'md-coupon',

	moduleName : 'Module.Store.coupon',

	moduleSessionView : 'Module.Store.couponCurrentView',

	dataObj : Module.Store.coupon.Data,

	configObj : Module.Store.coupon.Config,

	defaultView : 'Module.Store.coupon.view.Grid',

	supportView :['Module.Store.coupon.view.Grid'],

	havUpdateButton : false,

	initComponent : function() {
		this.callParent(arguments);
	},


	buildOptMenu : function(){

		var menu = Ext.create('Ext.menu.Menu', {

			name : 'useroperation',
			style: {
				overflow: 'visible'     // For the Combo popup
			},
			items: [
				{
					text: "新建兑换码类型",
					name : 'add',
					iconCls : 'x-add-icon'
				},
				{
					text: "查看生成兑换码",
					disabled:true,
					name : 'viewBill',
					iconCls : 'view'
				},
				{
					text: "编辑",
					disabled:true,
					name : 'edit',
					iconCls : 'update'
				}
			]

		});
		return menu;

	},
	initToolbar : function(){
		var toolbar = this.callParent(arguments),
			distributorMenu = {
				text: "兑换码类型操作",
				iconCls: 'pool_setting',
				menu: this.buildOptMenu()
			};
		toolbar.push(distributorMenu);
		return toolbar;
	}
});