Ext.define('Module.Shop.distributor.view.ShopOrderGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.noticegrid',
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Shop.distributor.Data',
		'Module.Shop.distributor.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],

	checkIndexes : ['code', 'name'], 
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Shop.distributor.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: SHOP_MANAGE_LABEL.order_id, flex:1,dataIndex:'id',
				menuDisabled:true, searchType : 'integer', align : 'center', sortable:true
			},
			{
				text: SHOP_MANAGE_LABEL.order_code, flex:1,dataIndex:'code',
				menuDisabled:true, searchType : 'string', align : 'center', sortable:true
			},
			{
				text : SHOP_MANAGE_LABEL.order_name,flex:1, dataIndex:'name',
				menuDisabled:true, searchType : 'string', align : 'center'
			},
			{
				text : SHOP_MANAGE_LABEL.order_defaultMoney,width : 60, dataIndex:'defaultMoney',
				menuDisabled:true, searchType : 'string', align : 'center'
			},
			{
				text: SHOP_MANAGE_LABEL.order_alreadyPayMoney,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'alreadyPayMoney', align : 'center'
				
			},
			{
				text: SHOP_MANAGE_LABEL.order_payMoney,flex:1,
				sortable: false, menuDisabled:true, dataIndex: 'payMoney', align : 'center'
			},
			{
				text: SHOP_MANAGE_LABEL.order_commission,flex:1,
				sortable: false, menuDisabled:true, dataIndex: 'commission', align : 'center'
			},
			{
				text: SHOP_MANAGE_LABEL.order_isCashed,flex:1,
				sortable: false, menuDisabled:true, dataIndex: 'isCashed', align : 'center'
			},
			{
				text : SHOP_MANAGE_LABEL.order_state,flex:1, dataIndex:'state',
				menuDisabled:true, searchType : 'string', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateOrderStatus(val);
				}
			},
			{
				text: SHOP_MANAGE_LABEL.ctime,flex:1, searchType : 'date',
				sortable: false, menuDisabled:true, dataIndex: 'ctime', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},
			{
				text: SHOP_MANAGE_LABEL.order_ctime,flex:1, searchType : 'date',
				sortable: false, menuDisabled:true, dataIndex: 'ctime', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},
			{
				text: SHOP_MANAGE_LABEL.order_totalNub,flex:1,
				sortable: false, menuDisabled:true, dataIndex: 'totalNub', align : 'center'
				
			},
			{
				text: SHOP_MANAGE_LABEL.order_payTime,flex:1, searchType : 'date',
				sortable: false, menuDisabled:true, dataIndex: 'payTime', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			}
		);
		
		var me = this;
		me.contextMenu = Module.Shop.distributor.Tools.buildOptMenu();

		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
				}
			}
		});
		
		Ext.apply(this, {
			store : this.store,
			selModel: sm,
			viewConfig : {
				emptyText : SHOP_MESSAGE.noOrder
			},
			columns : columns
		});
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
    }
});