Ext.define('Module.Store.StoreOwner.view.SODetailPanel', {
	extend : 'Ext.panel.Panel',
	alias: 'widget.sodetailview',

	requires : [],
	
	layout: {
        type: 'vbox',
        align: 'center'
    },
	
	storeOwner : null,
	
	initComponent : function() {
		var me = this;
		var items = [{
			html: '请选择服务商'
		}];
		if (me.storeOwner) {
			sessionStorage.setItem("currentStoreOwner", $.toJSON(me.storeOwner));
		} else {
			var so = sessionStorage.getItem("currentStoreOwner");
			if (so) {
				me.storeOwner =  $.parseJSON(so);
			}
		}
		if (me.storeOwner) {
			me.infoPanel = Ext.create('Module.Store.StoreOwner.view.SOBaseInfoPanel', {
				height : 150,
				width: '100%',
				storeOwner : me.storeOwner
			});
			me.editTab = Ext.create('Module.Store.StoreOwner.view.SOInfoTab', {
				flex: 4,
				width: '100%',
				storeOwner : me.storeOwner
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
        //me.portlet.down('[name=backpperation]').show();
	},
	
	updateView : function(scope){
		var me = scope || this;
	}
});
