Ext.define('Module.Template.page.Renderer', {
	singleton : true,
	requires : [ 'Soul.util.RendererUtil', "Module.Template.page.store.CoverPtplStore" ],

	constructor : function() {
		this.config = {
			status : function(v) {
				var val = PAGETPL_STATUS[v];
				v = val || v;
				return v;
			},

			type : function(v) {
				var val = PAGETPL_TYPE[v];
				v = val || v;
				return v;
			},

			dbMode : function(v) {
				var val = PAGETPL_DBMODE[v];
				v = val || v;
				return v;
			},

			ctime : Soul.util.RendererUtil.getDateInfo2,

			etime : Soul.util.RendererUtil.getDateInfo2,

			lrSame : Soul.util.RendererUtil.getBoolean,
			
			needTwo : Soul.util.RendererUtil.getBoolean
		};
		this.callParent(arguments);
	},
});