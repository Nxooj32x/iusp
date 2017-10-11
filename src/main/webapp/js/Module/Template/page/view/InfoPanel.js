Ext.define('Module.Template.page.view.InfoPanel', {
	extend : 'Ext.panel.Panel',

	uses: 'Ext.data.Store',
	
	requires : ['Module.Template.page.Tools'],
	
	border : false,

    ptpl : null,
    
    autoScroll : true,
    
	initComponent: function() {
		var me = this;
		var thub =  Ext.create('Ext.Img', {
      	  src : '/pageTplRes/' + me.ptpl.type + '/' + me.ptpl.code + '/img/thumbnail/left.jpg' 
        });
		
		var showPtl =  Module.Template.page.Config.PROP[me.ptpl.type];
		
		var property = Soul.util.ObjectView.getObjectPropertyGrid(me.ptpl, Module.Template.page.Config.getRendererConfig(), 
				PAGETPL_PROPERTY, showPtl, { sortableColumns : false, 
			header : false, frame : false, bodyBorder : true});
		
		this.items = [thub, property ];
		
	    this.callParent(arguments);
	}
});
