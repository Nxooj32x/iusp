Ext.define('Module.YB.siteConfig.view.Grid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.staticgrid',

	requires : ['Module.YB.siteConfig.Config'],

	initComponent : function() {
		
		Ext.create('Ext.data.Store', {
		    storeId:'staticPageStore',
		    fields:['path', 'ftl', 'name', 'handlerURL', 'params'],
		    data:{'items': Module.YB.siteConfig.Config.staticConfig},
		    proxy: {
		        type: 'memory',
		        reader: {
		            type: 'json',
		            root: 'items'
		        }
		    }
		});
		
		var columns = new Array();
		
		columns.push(new Ext.grid.RowNumberer(), {
			text : "名称",
			flex : 1,
			dataIndex : 'name'
		}, {
			text : "静态页面",
			width : 200,
			dataIndex : 'path',
			renderer : function(v){
				var reg=new RegExp("/$");   
				var url = v + ".html";
				if (reg.test(v)) {
					url = v + "index.html";
				} 
				return '<a href="/' + url +'" target="_blank">' + url + '</a>';
			}
		}, {
			xtype : 'actioncolumn',
			width : 30,
			dataIndex : 'pdf',
			editor : false,
			align : 'center',
			items : [ {
				icon : '/img/icon32/fileoperation.png',
				tooltip : '生成静态页面',
				name : 'view',
				scope : this,
				handler : this.onBuildPageClick,
				isDisabled : function(v, r, c, item, r) {
				}
			}]
		});

		Ext.apply(this, {
			store : Ext.data.StoreManager.lookup("staticPageStore"),
			viewConfig : {
				emptyText : "没有需要静态化的页面 "
			},
			columns : {
				items : columns
			}
		});
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.portlet.setTitle('网站配置-页面静态化');
	},
	
	onBuildPageClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var url = record.get('handlerURL');
		var params =  record.get('params');
		params = params || {};
		params.path = record.get('path');
		
		Soul.Ajax.request({
			url : "/handleStatic/" + url,
			headers  : {
				Accept : 'application/json'
			},
			method : 'post',
			params : params,
			timeout : 1000 * 60 * 20,
			loadMask : true,
			loadMsg : '生成静态页面',
			successMsg : '生成成功',
			success : function(response, opts) {
			}
		});
	}
});
