Ext.define('Module.Template.page.Tools', {
	singleton: true, 
	appId: null,
	
	requires  : [
		'Soul.util.ObjectView'
	],

	showPtplViewAndProInEast : function(ptpl){
		var property = Ext.create('Module.Template.page.view.InfoPanel', {
			ptpl : ptpl
		});
		var activeTab = Ext.getCmp('info-panel').getActiveTab();
		if(activeTab != null){
			activeTab.close();
		}
		Soul.util.ObjectView.showInEast(property, ptpl.name);
	},
	
	showTemplateInEast : function(ptpl){
		var me = this;
		var property = me.getTemplatePropertyGrid(ptpl);
		var activeTab = Ext.getCmp('info-panel').getActiveTab();
		if(activeTab != null){
			activeTab.close();
		}
		Soul.util.ObjectView.showInEast(property, ptpl.name);
	},
	getTemplatePropertyGrid : function(template){
		var showProp = new Array();
		
		showProp = Ext.Array.merge(showProp, Module.Template.page.Config.showProperties);
		showProp = Ext.Array.merge(showProp, Module.Template.page.Config.PROP[template.type]);
		
		var property = Soul.util.ObjectView.getObjectPropertyGrid(template, Module.Template.page.Config.getRendererConfig(), 
				PAGETPL_PROPERTY, showProp, { sortableColumns : false});
		return property;
	},
	
	constructor : function() {
		this.callParent(arguments);
	}
});