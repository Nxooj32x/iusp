Ext.define('Module.Store.StoreShop.view.ShopBaseInfoPanel', {
	extend : 'Ext.panel.Panel',

	uses: 'Ext.data.Store',
	
	requires : [],
	
	//border : false,

    storeShop : null,
    
    //autoScroll : true,
    
    layout: 'column',
    
	initComponent: function() {
		var me = this;
		
		var thub =  Ext.create('Ext.Img', {
			height : 150,
			columnWidth: 1/10,
			src : me.storeShop.logo
        });
		
		var property = Soul.util.ObjectView.getObjectPropertyGrid(me.storeShop, Module.Store.StoreShop.Config.getRendererConfig(), 
		STORE_LABEL, Module.Store.StoreShop.Config.showProperties, { sortableColumns : false, 
			header : false, frame : false, bodyBorder : true, columnWidth: 3/10});
		
		var smGrid = Ext.create('Module.Store.StoreShop.view.ShopModuleGrid', {
			title : "商铺模块",
			autoScroll : true,
			columnWidth: 6/10,
			height : 150,
			shopId : me.storeShop.id,
			onBillingClick : function(view ,rowIndex, colIndex, item, e, record, row){
				var infoTab = view.up('shopdetailview').down('shopinfotab');
        		var smbGrid = infoTab.down('shopModuleBillingGrid[title="' + record.data.name + '计费明细' + '"]')
        		if (smbGrid == null) {
        			smbGrid = Ext.create('Module.Store.StoreShop.view.ShopModuleBillingGrid', {
	        			title : record.data.name + "计费明细",
	        			closable: true,
	        			id : me.storeShop.id + record.data.name + "-tab",
	        			modulePanel : smGrid,
	        			shopModule : record.data
	    			});
	    			infoTab.add(smbGrid);
        		}
    			infoTab.setActiveTab(me.storeShop.id + record.data.name + "-tab")
			},
			listeners : {
	        	itemclick : function( grid, record, item, index, e, eOpts ){
	        		var infoTab = grid.up('shopdetailview').down('shopinfotab');
	        		var smbGrid = infoTab.down('shopModuleBillingGrid[title="' + record.data.name + '计费明细' + '"]')
	        		if (smbGrid == null) {
	        			smbGrid = Ext.create('Module.Store.StoreShop.view.ShopModuleBillingGrid', {
		        			title : record.data.name + "计费明细",
		        			closable: true,
		        			id : me.storeShop.id + record.data.name + "-tab",
		        			modulePanel : smGrid,
		        			shopModule : record.data
		    			});
		    			infoTab.add(smbGrid);
	        		}
	    			infoTab.setActiveTab(me.storeShop.id + record.data.name + "-tab")
	        	}
	        }
		});
		
		this.items = [thub, property, smGrid];
		
	    this.callParent(arguments);
	}
});
