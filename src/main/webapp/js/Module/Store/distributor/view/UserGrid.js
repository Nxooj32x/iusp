
Ext.define('Module.Store.distributor.view.UserGrid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.drusergrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Soul.user.Data',
		'Module.Soul.user.Renderer',
		'Module.Soul.user.locale.zh_CN',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
    
	checkIndexes : ['name'], // 默认选择的列	
	minChars : 1,
	minLength : 1,
	
	height : 500,
	
	addCallback : function(){},

	initComponent : function() {
		var columns = new Array();
		var me = this;
		var renders = Module.Soul.user.Renderer;
		columns.push(
			{text: "ID",sortable: true,dataIndex: 'id', searchType : 'number',
				width : 60},
			{text: USERMANAGE_LABEL.user,sortable: true, width: 150, dataIndex: 'name', searchType : 'string',
				flex : 1},
			{
				text: USERMANAGE_LABEL.mobilePhone,width: 200, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'mobilePhone',
			},
			{
				xtype : 'actioncolumn',
				dataIndex : 'id',
				width: 30,
				editor : false,
				align : 'center',
				items : [ {
					icon : '/img/icon/groupadd.png',
					tooltip : '设置为渠道商',
					name : 'view',
					scope : this,
					handler : this.onAddClick
				}]
			}
		);
		
		var me = this;
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
				}
			}
		});
		
		var userStore = Ext.create('Ext.data.Store', {
		    model: 'Module.Soul.user.model.UserModel',
		    proxy: {
		         type: 'rest',
		         headers : {
		         	"Content-Type": "application/json; charset=utf-8", 
		         	Accept : 'application/json'
		         },
		         url: '/suresecurity/user/',
		         reader: {
		             type: 'json',
		             root: 'data',
		             totalProperty : 'total'
		         },
		     },
		     autoLoad: true
		});

		
		Ext.apply(this, {
			store : userStore,
			selModel: sm,
			viewConfig : {
				emptyText : USERMANAGE_MESSAGE.noUser
			},
			columns : columns
		});
		this.callParent(arguments);
	},
	
	onAddClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		Soul.Ajax.request({
			url : '/storeapi/distributor/',
			method : 'post',
			params :{
				type : 'platform',
				userId : record.data.id,
			},
			loadMask : true,
			loadMsg : '设置渠道商',
			successMsg : '成功',
			success : function(response, opts) {
				me.addCallback();
			}
		});
	},

	afterRender: function() {
        var me = this;
        me.callParent(arguments);
    }
});
