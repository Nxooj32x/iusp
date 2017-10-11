Ext.define('Module.YB.approve.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],
	showOrderInEast : function(id){
		var me = this;
		var order = Module.YB.approve.Data.getOrderById(id);
		var property = me.getOrderPropertyGrid(order);
		var activeTab = Ext.getCmp('info-panel').getActiveTab();
		if(activeTab != null){
			activeTab.close();
		}
		Soul.util.ObjectView.showInEast(property, id);
	},	
	getOrderPropertyGrid : function(order){
		var property = Soul.util.ObjectView.getObjectPropertyGrid(order, Module.YB.approve.Config.getRendererConfig(), 
				YB_APPROVE_PROPERTY, Module.YB.approve.Config.showProperties, null);
		return property;
	},
	orderGridSelectionChange : function(panel,sm){
		var me = panel;
		var approvalToolbar = me.toolbar.down('button[name=approval]');
		var approvalRightMI = me.contextMenu.down('menuitem[name=approval]');
		var approvalTopMI = me.portlet.down('menuitem[name=approval]');
		if (sm.getCount() > 0) {
			var record = sm.getSelection()[0].data;
			approvalRightMI.disable();
			approvalTopMI.disable();
			approvalToolbar.disable();
			
			if(record.approveStatus == "0"){
				approvalRightMI.enable();
				approvalTopMI.enable();
				approvalToolbar.enable();
			}
		}else{
			approvalRightMI.disable();
			approvalTopMI.disable();
			approvalToolbar.disable();
		}
	},
	constructor : function() {
        this.callParent(arguments);
    }
	
});
