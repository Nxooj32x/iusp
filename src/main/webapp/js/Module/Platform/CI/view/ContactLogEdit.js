Ext.define('Module.Platform.CI.view.ContactLogEdit', {
	extend : 'Ext.panel.Panel',
	alias: 'widget.cleditview',

	requires : [],
	
	layout: {
        type: 'vbox',
        align: 'center'
    },

	store : null,
	
	customerInfo : null,
	
	initComponent : function() {
		var me = this;
		if (me.store && me.customerInfo) {
			me.infoPanel = Ext.create('Module.Platform.CI.view.AddContactlLogPanel', {
				collapsible : true,
				flex: 2,
				customerInfo : me.customerInfo
			});
			me.editTab = Ext.create('Module.Platform.CI.view.ContactLogGrid', {
				collapsible : true,
				store : me.store,
				flex: 4,
				customerInfo : me.customerInfo
			});
			this.items = [me.infoPanel, me.editTab];
		} else {
			this.items = [{
				html: '请选择客户'
			}];
		}
		this.callParent(arguments);
	},

	
	afterRender : function() {
		var me = this;
		me.callParent(arguments);
		me.portlet.down('[name=cioperation]').hide();
        me.portlet.down('[name=backpperation]').show();
	},
	
	
	updateView : function(scope){
		var me = scope || this;
		if (me.customerInfo) {
			sessionStorage.setItem("currentCustomerInfo", $.toJSON(me.customerInfo));
		} else {
			var ci = sessionStorage.getItem("currentCustomerInfo");
			if (ci) {
				me.customerInfo =  $.parseJSON(ci);
			}
		}
		if (me.customerInfo) {
			me.removeAll();
			me.infoPanel = Ext.create('Module.Platform.CI.view.AddContactlLogPanel', {
				collapsible : true,
				width: '100%',
				flex: 2,
				customerInfo : me.customerInfo
			});
			me.add(me.infoPanel);
			me.editTab = Ext.create('Module.Platform.CI.view.ContactLogGrid', {
				collapsible : true,
				width: '100%',
				flex: 4,
				customerInfo : me.customerInfo
			});
			me.add(me.editTab);
		}
	}
});
