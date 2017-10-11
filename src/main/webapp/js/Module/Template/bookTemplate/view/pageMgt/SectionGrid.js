Ext.define('Module.Template.bookTemplate.view.pageMgt.SectionGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.pagemgtsectiongrid',

	uses : 'Ext.data.Store',

	requires : ['Soul.util.RendererUtil', 'Soul.ux.grid.column.ComboColumn'],

	btpl : {},
	
	initComponent : function() {
		var me = this;
		me.store = Ext.create('Module.Template.bookTemplate.store.BtplSectionStore', {
			proxy : {
				type : 'rest',
		        headers : {
		        	"Content-Type": "application/json; charset=utf-8", 
		        	Accept : 'application/json'
		        },
		        extraParams : {
		        	filter : {}
		        },
		        api: {
		        	read: '/book/' + me.btpl.id + '/section/',
		        	update : '/section/',
		        },
		        reader: {
		            type: 'json',
		        },
		        listeners:{
		            exception:function( theproxy, response, operation, options ){
		            	Soul.util.MessageUtil.parseResponse(response);
		            }
		        }
			},
			autoLoad : true
		});
		
		var columns = new Array();
		
		columns.push(new Ext.grid.RowNumberer({
			text : '位置',
			align : 'center',
			width : 40
		}),{
			text : "名称",
			dataIndex : 'name'
		}, {
			text : "页面数目",
			width : 80,
			dataIndex : 'pageNum'
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
