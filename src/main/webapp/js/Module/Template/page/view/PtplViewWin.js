Ext.define('Module.Template.page.view.PtplViewWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.ptplviewwin',

	requires : ['Soul.view.AdvanceSearchView',"Module.Template.page.store.PtplStore"],

	title : '预览模板',
	
	iconCls : 'view',
	
	maximized : true,
	
	closeAction:'hide', 
	
	modal : true,
	
	animateTarget : 'target',
	
	layout : 'fit',
	
	pageTpl : {},
	
	initComponent : function() {
		var me = this;
		me.tabview = Ext.create("Module.Template.page.view.PtplViewTab", {
			header : false,
			pageTpl : me.pageTpl,
			hiddenPropShow : true
		});
		this.items = [me.tabview ];
		this.listeners  = {
			show : function(){
				var viewTab = me.tabview.getActiveTab();
				viewTab.fireEvent('activate');
			}
		};
		this.callParent(arguments);
	},
	
	updatePageTpl : function(pageTpl, scope){
		var me = scope || this;
		me.pageTpl = pageTpl;
		me.tabview.pageTpl = pageTpl;
	}

});
