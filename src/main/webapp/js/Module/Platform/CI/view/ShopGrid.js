Ext.define('Module.Platform.CI.view.ShopGrid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.shopgrid',
	
	requires : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.Store.StoreShop.Data',
		'Module.Store.StoreShop.Renderer'
	],
    
	checkIndexes : ['name'], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Store.StoreShop.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: STORE_LABEL.name,
				dataIndex: 'name',
				searchType: 'string',
				align: 'left',
				width: 100
			}, {
				text: STORE_LABEL.storeOwnerId,
				dataIndex: 'storeOwnerId',
				searchType: 'number',
				width: 80
			}, {
				text:STORE_LABEL.logo, dataIndex:'logo',sortable: false,  searchType:'string', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					if(v == null){
						return "";
					}
					v=v+"?imageView2/1/w/100/h/50/format/jpg";
					return "<img style='width:50px;height:25px;' src="+v+" ></img>";
				}

			}, {

				text:STORE_LABEL.status, dataIndex:'status', searchType:'combo', align:'center', flex:1,
				renderer : function(v, u, r, rowIndex, columnIndex, s){
					return renders.translateShopStatus(v);
				},
				comboData : STORE_SHOP_COMBO.status

			}, {
				text: STORE_LABEL.ctime,
				dataIndex: 'ctime',
				searchType: 'date',
				align: 'center',
				flex: 1,
				renderer: function (v, u, r, rowIndex, columnIndex, s) {
					if (v == null) {
						return "未知";
					}
					return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
				}
			},{
            	text: "绑定",
				xtype : 'actioncolumn',
				dataIndex : 'contactLogs',
				width: 80,
				editor : false,
				align : 'center',
				items : [{
					icon : '/img/icon/port.png',
				    text : '绑定',
					tooltip : '绑定',
					name : 'view',
					scope : this,
					handler : this.onBindingClick,
					isDisabled : function(v, r, c, item, r) {
					}
				}]
			}
		);
		var me = this;
		//me.contextMenu = me.portlet.buildStoreShopOptMenu();
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

				}
			}
		});
		
		var store = Ext.create('Module.Store.StoreShop.store.StoreShopStore');
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : STORESHOP_LABEL.noShop
			},
			store : store,
		});
		
		this.callParent(arguments);
	},
	
	onBindingClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		var soid = record.data.storeOwnerId;
		Module.Store.StoreOwner.Operation.doSoCiBinding(soid, me.customerInfo.id, function(){
			view.up('window').close();
		});
	},

	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.selModel.deselectAll();
			me.updateView(me);
		};

		var sm = me.selModel;
		me.updateView(me);
    }
});