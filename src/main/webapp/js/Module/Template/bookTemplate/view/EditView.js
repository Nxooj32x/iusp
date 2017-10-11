Ext.define('Module.Template.bookTemplate.view.EditView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.bptleditview',

	requires : [],

	btpl : {},
	
	initComponent : function() {
		var me = this;
		if (me.btpl.id) {
			me.infoPanel = Ext.create('Module.Template.bookTemplate.view.BtplInfoPanel', {
				btpl : me.btpl
			});
			
			me.editTab = Ext.create('Module.Template.bookTemplate.view.BtplSectionEdit', {
				btpl : me.btpl
			});
			this.items = [me.infoPanel, me.editTab];
		} else {
			this.items = [{
				html: '请选择书册模板'
			}];
		}
		
		this.callParent(arguments);
	},

	
	afterRender : function() {
		var me = this;
		me.callParent(arguments);
		var createBtplItem = me.portlet.down('button[name=createBtpl]');
		
		createBtplItem.disable();
	},
	
	
	updateView : function(scope){
		var me = scope || this;
		if (me.btpl.id) {
			sessionStorage.setItem("currentBtppView", $.toJSON(me.btpl)); 
		} else {
			var cp = sessionStorage.getItem("currentBtppView");
			if (cp) {
				me.btpl =  $.parseJSON(cp);
			}
		}
		if (me.btpl.id) {
			if (me.editTab && me.editTab.btpl.id == me.btpl.id) {
				return;
			}
			me.removeAll();
			me.infoPanel = Ext.create('Module.Template.bookTemplate.view.BtplInfoPanel', {
				btpl : me.btpl
			});
			me.add(me.infoPanel);
			me.editTab = Ext.create('Module.Template.bookTemplate.view.BtplSectionEdit', {
				btpl : me.btpl
			});
			me.add(me.editTab);
		}
	}
	

});
