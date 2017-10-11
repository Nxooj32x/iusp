Ext.define('Module.YB.promotion.view.Grid', {
	extend: 'Soul.view.AdvanceSearchGrid',
	alias: 'widget.promotionGrid',

	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.YB.promotion.Data',
		'Module.YB.promotion.Renderer',
		'Soul.ux.grid.column.ComboColumn',
		'Module.YB.promotion.Operation'
	],

	initComponent: function () {
		var columns = new Array();
		var renders = Module.YB.promotion.Renderer;
		var comboData = Module.YB.promotion.Config.COMBO_DATA;
		columns.push(
			//new Ext.grid.RowNumberer(),
			{
				text: PROMOTION_PROPERTY.id,
				dataIndex: 'id',
				searchType: 'number',
				align: 'center',
				width: 50
			},
			{
				text: PROMOTION_PROPERTY.name,
				dataIndex: 'name',
				searchType: 'string',
				align: 'center',
				width: 150
			}, {
				text: PROMOTION_PROPERTY.type,
				dataIndex: 'type',
				searchType: 'combo',
				align: 'center',
				width: 100,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return renders.translateProType(v);
				},
				comboData: comboData.proType
			},{
				text: PROMOTION_PROPERTY.status,
				dataIndex: 'status',
				searchType: 'combo',
				align: 'center',
				width: 100,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					return renders.translateProStatus(v);
				},
				comboData: comboData.proStatus
			},  {
				text: PROMOTION_PROPERTY.isOnly,
				dataIndex: 'isOnly',
				searchType: 'boolean',
				align: 'center',
				width: 50
			}, {
				text: PROMOTION_PROPERTY.supportOrderType,
				dataIndex: 'supportOrderType',
				searchType: 'string',
				align: 'center',
				width: 150
			}, {
				text: PROMOTION_PROPERTY.beginDate,
				dataIndex: 'beginDate',
				searchType: 'date',
				align: 'center',
				width: 150
			},{
				text: PROMOTION_PROPERTY.endDate,
				dataIndex: 'endDate',
				searchType: 'date',
				align: 'center',
				width: 150
			}, {
				text: PROMOTION_PROPERTY.desc,
				dataIndex: 'desc',
				searchType: 'string',
				align: 'center',
				width: 400
			}
		);

		var me = this;

		//右击事件
		me.contextMenu = me.portlet.buildPromotionOptMenu();
	
		//双击事件 --> 作业日记
		me.doubleClick = function (view, record, item, index, e) {
			Module.YB.promotion.Operation.viewPromotionItems(record, null);
		};

		var sm = new Ext.selection.CheckboxModel({
			mode:'single',
			listeners : {
				selectionchange : function(sm2) {
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns: columns,
			viewConfig: {
				emptyText: "未查询到数据"
			},
			store: Ext.data.StoreManager.lookup("Module.YB.promotion.store.PromotionStore")
		});

		this.callParent(arguments);
	},

	afterRender: function () {
		var me = this;
		me.callParent(arguments);
		var sm = me.selModel;	
        var callbackFun = function(){
			me.getSelectionModel().clearSelections();
	      	var current = me.store.currentPage;
	        if (me.fireEvent('beforechange', me, current) !== false) {
	            me.store.loadPage(current);
	        }
		};
		var delBtnRight = me.contextMenu.down('menuitem[name=del]');
		var changeBtnRight = me.contextMenu.down('menuitem[name=change]');
		var settingBtnRight = me.contextMenu.down('menuitem[name=setting]');
		var addItemBtnRight = me.contextMenu.down('menuitem[name=addItem]');


		//停止促销
		var  addItemBtnFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			Module.YB.promotion.Operation.doAddPromotionItemProcessFunction(records, callbackFun);

		};
		addItemBtnRight.on('click', addItemBtnFunc);

		//停止促销
		var  delBtnFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			Module.YB.promotion.Operation.doDelPromotionProcessFunction(records, callbackFun);

		};
		delBtnRight.on('click', delBtnFunc);


		//停止促销
        var  changeBtnFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	Module.YB.promotion.Operation.doChangeStatusPromotionProcessFunction(records, callbackFun);
        	
        };
		changeBtnRight.on('click', changeBtnFunc);
 
		//设置促销
        var  settingBtnRightFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
    		Module.YB.promotion.Operation.doSettingPromotionProcessFunction(records, callbackFun);
        };
		settingBtnRight.on('click', settingBtnRightFunc);
	}
});
