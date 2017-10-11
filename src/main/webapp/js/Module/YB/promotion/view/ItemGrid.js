Ext.define('Module.YB.promotion.view.ItemGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.itemsgrid',

	requires: [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Module.YB.promotion.Data',
		'Module.YB.promotion.Renderer',
		'Soul.ux.grid.column.ComboColumn',
		'Module.YB.promotion.Operation'
	],

	promotion : null,

	initComponent: function () {
		var me = this;
		var columns = new Array();
		var renders = Module.YB.promotion.Renderer;
		var comboData = Module.YB.promotion.Config.COMBO_DATA;
		columns.push(
			{
				text: PROMOTION_ITEM_PROPERTY.id,
				dataIndex: 'id',
				searchType: 'number',
				align: 'center',
				width: 50
			},
			{
				text: PROMOTION_ITEM_PROPERTY.promotionId,
				dataIndex: 'promotionId',
				align: 'center',
				width: 200,
				renderer : function() {
					return me.promotion.name;
				}
			}, {
				text: PROMOTION_ITEM_PROPERTY.promotionType,
				dataIndex: 'promotionType',
				searchType: 'combo',
				align: 'center',
				width: 100,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return renders.translateProItemType(v);
				},
				comboData: comboData.proItemType
			},{
				text: PROMOTION_ITEM_PROPERTY.limitMoney,
				dataIndex: 'limitMoney',
				searchType: 'string',
				align: 'center',
				width: 80,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return "￥" + v;
				}
			},{
				text: PROMOTION_ITEM_PROPERTY.minMoney,
				dataIndex: 'minMoney',
				searchType: 'string',
				align: 'center',
				width: 80,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return "￥" + v;
				}
			},{
				text: PROMOTION_ITEM_PROPERTY.maxMoney,
				dataIndex: 'maxMoney',
				searchType: 'string',
				align: 'center',
				width: 80,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return "￥" + v;
				}
			},{
				text: PROMOTION_ITEM_PROPERTY.discount,
				dataIndex: 'discount',
				searchType: 'string',
				align: 'center',
				width: 80,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					if (v == 0)
						return "免费";
					else
						return "￥" + v;
				}
			},{
				text: PROMOTION_ITEM_PROPERTY.reduceMoney,
				dataIndex: 'reduceMoney',
				searchType: 'string',
				align: 'center',
				width: 80,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return "￥" + v;
				}
			}, {
				text: "删除",
				xtype: 'actioncolumn',
				width: 80,
				dataIndex: 'view',
				editor: false,
				align: 'center',
				items: [{
					icon: '/img/icon/del.png',
					tooltip: '删除',
					name: 'view',
					scope: this,
					handler: this.onDelClick,
					isDisabled: function (v, r, c, item, r) {
					}
				}]
			}
		);
		var sm = new Ext.selection.CheckboxModel({});
		Ext.apply(this, {
			selModel: sm,
			columns: columns,
			store : {
				fields: ['id', 'promotionId', 'promotionType', 'limitMoney', 'minMoney', 'maxMoney', 'discount', 'reduceMoney']
			},
			viewConfig: {
				emptyText: "未查询到数据"
			}
		});

		this.callParent(arguments);
	},

	onDelClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		var promotionId  = record.data.promotionId;
		var itemId = record.data.id;
		Soul.Ajax.request({
			url : "/api/admin/promotion/" + promotionId + "/items/" + itemId ,
			method : 'DELETE',
			timeout : 1000 * 60 * 20,
			loadMask : true,
			loadMsg : '删除促销信息',
			successMsg : '删除ok',
			success : function(response, opts) {
				//me.pagingBar.doRefresh();
			}
		});
	},

	afterRender: function () {
		var me = this;
		me.callParent(arguments);
	}
});
