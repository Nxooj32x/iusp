Ext.define('Module.Store.StoreOwner.view.SOBaseInfoPanel', {
	extend : 'Ext.panel.Panel',

	uses: 'Ext.data.Store',
	
	requires : [],
	
	//border : false,

    storeOwner : null,
    
    //autoScroll : true,
    
    layout: 'column',
    
	initComponent: function() {
		var me = this;
		
		var property = Soul.util.ObjectView.getObjectPropertyGrid(me.storeOwner, Module.Store.StoreOwner.Config.getRendererConfig(), 
		STOREOWNER_LABEL, Module.Store.StoreOwner.Config.showProperties, { sortableColumns : false, 
			header : false, frame : false, bodyBorder : true, columnWidth: 4/10});
		
		var smGrid = Ext.create('Module.Store.StoreOwner.view.ShopGrid', {
			title : "服务站点列表",
			autoScroll : true,
			columnWidth: 6/10,
			height : 150,
			storeOwner : me.storeOwner,
			onDetailClick : function(view ,rowIndex, colIndex, item, e, record, row){
				var infoTab = view.up('sodetailview').down('soinfotab');
				var shopDetailPanel = infoTab.down('soshopgrid[id=soshoptab' + record.data.id + ']')
				if (shopDetailPanel == null) {
					var shopDetailPanel = Ext.create('Module.Store.StoreShop.view.ShopDetailPanel', {
						storeShop : record.data,
						title : record.data.name + "详情",
	        			closable: true,
	        			id : "soshoptab" + record.data.id 
					});
					infoTab.add(shopDetailPanel);
				}
				infoTab.setActiveTab( "soshoptab" + record.data.id)
				
			},
			listeners : {
	        	itemclick : function( grid, record, item, index, e, eOpts ){
	        		var infoTab = view.up('sodetailview').down('soinfotab');
					var shopDetailPanel = infoTab.down('soshopgrid[id=soshoptab' + record.data.id + ']')
					if (shopDetailPanel == null) {
						var shopDetailPanel = Ext.create('Module.Store.StoreShop.view.ShopDetailPanel', {
							storeShop : record.data,
							title : record.data.name + "详情",
		        			closable: true,
		        			id : "soshoptab" + record.data.id 
						});
						infoTab.add(shopDetailPanel);
					}
					infoTab.setActiveTab( "soshoptab" + record.data.id)
	        	}
	        }
		});
		
		this.items = [property, smGrid];
		
	    this.callParent(arguments);
	}
});
