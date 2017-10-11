Ext.define('Module.Template.bookTemplate.view.pageMgt.PageView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.pagemgtsectiongrid',

	uses : 'Ext.data.Store',

	requires : ['Soul.util.RendererUtil', 'Soul.ux.grid.column.ComboColumn'],

	btpl : {},
	
	initComponent : function() {
		var me = this;
		me.html = '页面预览',
		this.callParent(arguments);
	},
	
	afterRender : function() {
		var me = this;
		me.callParent(arguments);
	}
});
