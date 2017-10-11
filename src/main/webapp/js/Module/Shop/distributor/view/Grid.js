
Ext.define('Module.Shop.distributor.view.Grid', {
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
	
	disableIndexes: ['userName', 'mobile'],
	
	initComponent : function() {

		var columns = new Array();
		var renders = Module.Shop.distributor.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: SHOP_MANAGE_LABEL.id,flex:1, searchType : 'integer',
				sortable: false, menuDisabled:true, dataIndex: 'id', align : 'center'
			},
			{
				text: SHOP_MANAGE_LABEL.code,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'code', align : 'center'
			},
			{
				text : SHOP_MANAGE_LABEL.name,flex:1, dataIndex:'name',
				menuDisabled:true, searchType : 'string', align : 'center'
			},
			{
				text : SHOP_MANAGE_LABEL.order_userName,flex:1, dataIndex:'userName',
				menuDisabled:true, searchType : 'string', align : 'center'
			},
			{
				text : SHOP_MANAGE_LABEL.order_userMoblie,flex:1, dataIndex:'mobile',
				menuDisabled:true, searchType : 'string', align : 'center'
			},
			{
				text : SHOP_MANAGE_LABEL.order_wechat,flex:1, dataIndex:'wechat',
				menuDisabled:true, searchType : 'string', align : 'center'
			},
			{
				text: SHOP_MANAGE_LABEL.status,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'state', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateStatus(val);
				}
			},
			{
				text: SHOP_MANAGE_LABEL.sellNub,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'sellNub', align : 'center'
			},
			{
				text: SHOP_MANAGE_LABEL.earningMoney,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'earningMoney', align : 'center'
			},
			{
				text: SHOP_MANAGE_LABEL.extractMoney,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'extractMoney', align : 'center'
				
			},{
				text: SHOP_MANAGE_LABEL.statisticTime,flex:1, searchType : 'date',
				sortable: false, menuDisabled:true, dataIndex: 'statisticTime', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},{
				text: SHOP_MANAGE_LABEL.ctime,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'ctime', align : 'center',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			},
			{
				text: SHOP_MANAGE_LABEL.note,flex:1, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'note', align : 'center'
			}
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildShopOptMenu();

		rightOpen = me.contextMenu.down('menuitem[name=open]');
		topOpen = me.portlet.down('menuitem[name=open]');
		
		rightClose = me.contextMenu.down('menuitem[name=close]');
		topClose = me.portlet.down('menuitem[name=close]');
		
		rightVI = me.contextMenu.down('menuitem[name=viewitem]');
		topVI = me.portlet.down('menuitem[name=viewitem]');
		
		
		topOpen.setVisible(true);
		topOpen.disable();
		topClose.setVisible(true);
		topClose.disable();
		topVI.setVisible(false);
		topVI.disable();

		rightOpen.setVisible(true);	
		rightOpen.disable();
		rightClose.setVisible(true);	
		rightClose.disable();
		rightVI.setVisible(false);	

		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
                     //console.log(records[0].data.state);                  
                     rightVI.setVisible(false);	
                 	 topVI.setVisible(false);
                        	 
					if (sm2.getCount() == 1) {
						rightVI.setVisible(true);	
						rightVI.enable();
						//topVI.setVisible(true);	
						//topVI.enable();
						if(records[0].data.state=="open") {
							topOpen.setVisible(false);
							rightOpen.setVisible(false);	
							topOpen.disable();
							rightOpen.disable();
							
							topClose.setVisible(true);
							topClose.enable();
							rightClose.setVisible(true);	
							rightClose.enable();
	
						}else{
							 topClose.setVisible(false);
							 topClose.setVisible(false);	
							 rightClose.disable();
							 rightClose.disable();
							
							 topOpen.setVisible(true);
							 topOpen.enable();
							 rightOpen.setVisible(true);	
							 rightOpen.enable();
							
						}
							
					} else if (sm2.getCount() > 1) {
						topOpen.setVisible(true);
						rightOpen.setVisible(true);	
						topOpen.enable();
						rightOpen.disable();
						
						topClose.setVisible(true);
						topClose.enable();
						rightClose.setVisible(true);	
						rightClose.enable();
						
					}else{
						
					}
					
				}
			}
		});

		sStore = Ext.data.StoreManager.lookup("Module.Shop.distributor.store.ShopStore");
		sStore.getProxy().url = '/api/admin/shop/';
		
		Ext.apply(this, {
			store : sStore,
			selModel: sm,
			viewConfig : {
				emptyText : SHOP_MESSAGE.noShop
			},
			columns : columns
		});
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};

		var sm = me.selModel,
			addItem = me.portlet.down('menuitem[name=open]');
			editItem = me.portlet.down('menuitem[name=close]');		
			viewitemItem = me.portlet.down('menuitem[name=viewitem]');

        
		var openDistributorFunc = function(e, eOpts){			
			var records = sm.getSelection();
        	Module.Shop.distributor.Operation.doChangeDistributorStateFunc(records,
        			Module.Shop.distributor.model.ShopModel.OPEN,callbackFun);
        };
        me.contextMenu.down('menuitem[name=open]').on('click', openDistributorFunc);
        addItem.on('click', openDistributorFunc);

        var closeDistributorFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	Module.Shop.distributor.Operation.doChangeDistributorStateFunc(records,
        			Module.Shop.distributor.model.ShopModel.CLOSE, callbackFun);
        };
        me.contextMenu.down('menuitem[name=close]').on('click', closeDistributorFunc);
        editItem.on('click', closeDistributorFunc);

        var viewOrderFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	Module.Shop.distributor.Operation.doviewOrderFunction(records[0], callbackFun);
        };
        me.contextMenu.down('menuitem[name=viewitem]').on('click', viewOrderFunc);
        viewitemItem.on('click', viewOrderFunc);


    }
});