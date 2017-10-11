Ext.define('Module.Template.bookTemplate.view.sectionMgt.SectionTplGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.btplsectiontplgrid',

	uses : 'Ext.data.Store',

	requires : [],

	bookId : null,
	
	initComponent : function() {
		var dict = Module.Template.bookTemplate.Config;
		var columns = new Array();
		columns.push({
			text : "名称",
			width : 60,
			dataIndex : 'name'
		}, {
			text : "类型",
			width : 80,
			dataIndex : 'sectionType',
			xtype : 'combocolumn',
			comboData : dict.COMBO_CFG.sectionType,
			renderer : function(val, u,r, rowIndex, columnIndex, s){
				var cd = dict.COMBO_CFG.sectionType;
				Ext.each(cd, function(d, i, ds) {
					if (val == d[0]) {
						val = d[1];
						return false;
					}
				});
				return val;
			}
		}, {
			text : "描述",
			flex : 1,
			dataIndex : 'desc'
		});
		Ext.apply(this, {
			columns : {
				items : columns,
				defaults : {
					searchType : 'string',
					sortable : false,
					menuDisabled : true,
					align : 'center'
				}
			}
		});
		this.callParent(arguments);
	},

	afterRender : function() {
		var me = this;
		me.callParent(arguments);
	}
});
