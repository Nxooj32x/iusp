Ext.define('Module.Store.StoreShop.view.ShopDetailPanel', {
	extend : 'Ext.panel.Panel',
	alias: 'widget.shopdetailview',
	
	//uses : ['Module.Store.StoreShop.view.ShopBaseInfoPanel', 'Module.Store.StoreShop.view.ShopModuleGrid'],

	//requires : ['Module.Store.StoreShop.view.ShopBaseInfoPanel', 'Module.Store.StoreShop.view.ShopModuleGrid'],
	
	layout: {
        type: 'vbox',
        align: 'center'
    },
	
	storeShop : null,
	
	initComponent : function() {
		var me = this;
		var items = [{
			html: '请选择服务站点'
		}];
		if (me.storeShop) {
			sessionStorage.setItem("currentStoreShop", $.toJSON(me.storeShop));
		} else {
			var si = sessionStorage.getItem("currentStoreShop");
			if (si) {
				me.storeShop =  $.parseJSON(si);
			}
		}
		if (me.storeShop) {
			me.infoPanel = Ext.create('Module.Store.StoreShop.view.ShopBaseInfoPanel', {
				height : 150,
				width: '100%',
				storeShop : me.storeShop
			});
			me.editTab = Ext.create('Module.Store.StoreShop.view.ShopInfoTab', {
				flex: 4,
				width: '100%',
				storeShop : me.storeShop
			});
			items = [me.infoPanel, me.editTab];
		} 
		
		Ext.apply(this, {
			items : items
		});
		this.callParent(arguments);
	},

	
	afterRender : function() {
		var me = this;
		me.callParent(arguments);
		//me.portlet.down('[name=cioperation]').hide();
		if ( me.portlet && me.portlet.down('[name=back2list]'))
			me.portlet.down('[name=back2list]').show();
	},
	
	
	updateView : function(scope){
		var me = scope || this;
	}
});
