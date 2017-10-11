Ext.define('Module.Platform.CI.Operation', {
    singleton: true,

    requires: [
        'Soul.util.HelpUtil',
        'Soul.util.ObjectView',
        'Soul.view.WizardWindow',
        'Soul.util.ObjectConfig',
        'Soul.ux.EmailDomainBox',
        'Module.Platform.CI.Renderer',
        'Module.Platform.CI.Tools',
        'Module.Store.StoreOwner.Operation'
    ],
    
	doAddCI : function(soId, callback){
		var dict = Module.Platform.CI.Data;
	
		var pal = Ext.create('Ext.form.Panel', {
		    bodyPadding: 5,
		    width: 350,
		    // 表单域 Fields 将被竖直排列, 占满整个宽度
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
	
		    // The fields
		    items: [{
		    	xtype:"combo", 
		        fieldLabel: "客户类型",
		        name: 'ciType',
		        store:dict.ciTypeCombo,
		        editable:false,
		        allowBlank: false,
		    },{
		    	xtype:"combo", 
		        fieldLabel: "客户状态",
		        name: 'status',
		        store:dict.statusCombo,
		        editable:false,
		        allowBlank: false,
		    },{
		    	xtype : 'textfield',
				fieldLabel: "客户名称",
				name: 'name',
				allowBlank: false,
			},{
		    	xtype : 'textfield',
				fieldLabel: "地址/网址",
				name: 'address',
				maxLength:200,
				allowBlank: false,

			},{
				xtype:"combo",
				fieldLabel: "使用产品",
				name: 'useProducts',
				store:dict.useProductCombo,
				editable:false,
				multiSelect:true,
				allowBlank: true,
			},{
				xtype : 'textfield',
				fieldLabel: "主营业务",
				name: 'mainBusiness',
				maxLength:200,
				allowBlank: true,
			},{
				xtype : 'textfield',
				fieldLabel: "店铺级别",
				name: 'tbShopLevel',
				maxLength:200,
				allowBlank: true,
			},{
		    	xtype : 'textareafield',
				fieldLabel: "备注",
				name: 'remarks',
				maxLength:200,
				allowBlank: true,
			},{
		    	xtype : 'textfield',
				fieldLabel: "联系人",
				maxLength:20,
				name: 'contacts',
				allowBlank: true,
			},{
		    	xtype : 'textfield',
				fieldLabel: "旺旺",
				name: 'aliww',
				maxLength:30,
				allowBlank: true,
			},{
                xtype: 'fieldset',
	            title: '更多联系方式',
	            collapsed : true,
	            collapsible: true,
	            defaults: {
	                labelWidth: 89,
	                anchor: '100%',
	                layout: {
	                    type: 'hbox',
	                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
	                }
	            },
	            items: [{
			    	xtype : 'textfield',
					fieldLabel: "电话",
					name: 'phone',
					maxLength:20,
					allowBlank: true,
				},{
			    	xtype : 'textfield',
					fieldLabel: "手机",
					name: 'mobile',
					maxLength:20,
					allowBlank: true,
				},{
			    	xtype : 'textfield',
					fieldLabel: "QQ",
					name: 'qq',
					maxLength:20,
					allowBlank: true,
				},{
				    xtype : 'textfield',
					fieldLabel: "Email",
					name: 'email',
					maxLength:40,
					allowBlank: true,
				}]
	         }
		    ],
		    // 重置 和 保存 按钮.
		    buttons: [{
		        text: '重置',
		        handler: function(btn) {
		        	btn.up('form').getForm().reset();
		        }
		    }, {
		        text: '保存',
		        handler: function(btn) {
			    	if (!btn.up('form').getForm().isValid())
			    		return;
			    	var win = btn.up('window');
		    		var values = btn.up('form').getForm().getValues();
		    		
		    		var filter = new SQLFilter();
					var sel = [];
//					var seCiType = new SQLException("and", "ciType", '=',  values.ciType,  false);
//					sel.push(seCiType);
					var seName = new SQLException("and", "name", 'like',  values.name,  false);
					sel.push(seName);
					filter.buildBySe(sel);
					var f = filter.getFilter();

		    		var store = Ext.create('Module.Platform.CI.store.CustomerInfo');
		    		store.getProxy().extraParams.filter = Ext.encode(f);
		    		
		    		store.load({
		    			 callback: function(records, operation, success) {
		    	        // the operation object
		    	        // contains all of the details of the load operation
		    	        	if (records.length > 0) {
		    	        		Module.Platform.CI.Operation.checkCIExist(store, win);
		    	        	} else {
		    	        		if (soId) {
									values.soId   = soId;
		    	        		}

								var producrs="";
								$.each(values.useProducts,function(i,product){
									if(producrs=="")
										producrs=product;
									else
									producrs+=","+product
								});

								values.useProducts=producrs;
		    	        		Soul.Ajax.request({
		    						url : '/platformapi/ci/',
		    						method : 'post',
		    						jsonData  : values,
		    						loadMask : true,
		    						loadMsg : '新建客户信息',
		    						successMsg : '成功',
		    						success : function(response, opts) {
		    	        				if (soId)
		    	        					Module.Store.StoreOwner.Operation.doSoCiBinding(soId, response.id, callback);
		    	        				else {
		    	        					if (typeof(callback) == "function")
		    	        						callback();
		    	        				}
		    							win.close();
		    						}
		    					});
		    	        	}
		    	    	}
		    		});
		    		//
		    		return;
		        }
		    }]
		});
		
     	Ext.create('Ext.window.Window', {
     		title: '新建客户信息',
     	    bodyPadding: 5,
     	    width: 350,
     	    // 表单域 Fields 将被竖直排列, 占满整个宽度
     	    layout: 'anchor',
     	    defaults: {
     	        anchor: '100%'
     	    },
     	    // The fields
     	    defaultType: 'textfield',
     	    items:pal
     	  
     	}).show();
	},
		
	doModifyCI : function(ci, callback){
		var dict = Module.Platform.CI.Data;
	
		var pal = Ext.create('Ext.form.Panel', {
		    bodyPadding: 5,
		    width: 350,
		    // 表单域 Fields 将被竖直排列, 占满整个宽度
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
	
		    // The fields
		    items: [{
		    	xtype:"combo", 
		        fieldLabel: "客户类型",
		        name: 'ciType',
		        store:dict.ciTypeCombo,
		        editable:false,
		        allowBlank: false,
		    },{
		    	xtype:"combo", 
		        fieldLabel: "状态",
		        name: 'status',
		        store:dict.statusCombo,
		        editable:false,
		        allowBlank: false,
		    },{
		    	xtype : 'textfield',
				fieldLabel: "客户名称",
				name: 'name',
				allowBlank: false,
			},{
				xtype:"combo",
				fieldLabel: "使用产品",
				name: 'useProducts',
				store:dict.useProductCombo,
				editable:false,
				multiSelect:true,
				allowBlank: true,
			},{
				xtype : 'textfield',
				fieldLabel: "主营业务",
				name: 'mainBusiness',
				maxLength:200,
				allowBlank: false,
			},{
				xtype : 'textfield',
				fieldLabel: "店铺级别",
				name: 'tbShopLevel',
				maxLength:200,
				allowBlank: false,
			},{
		    	xtype : 'textfield',
				fieldLabel: "地址/网址",
				name: 'address',
				allowBlank: false,
			},{
		    	xtype : 'textareafield',
				fieldLabel: "备注",
				name: 'remarks',
				allowBlank: true,
			},{
		    	xtype : 'textfield',
				fieldLabel: "联系人",
				name: 'contacts',
				allowBlank: true,
			},{
		    	xtype : 'textfield',
				fieldLabel: "旺旺",
				name: 'aliww',
				allowBlank: true,
			},{
	            xtype: 'fieldset',
	            title: '更多联系方式',
	            collapsed : true,
	            collapsible: true,
	            defaults: {
	                labelWidth: 89,
	                anchor: '100%',
	                layout: {
	                    type: 'hbox',
	                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
	                }
	            },
	            items: [{
			    	xtype : 'textfield',
					fieldLabel: "电话",
					name: 'phone',
					allowBlank: true,
				},{
			    	xtype : 'textfield',
					fieldLabel: "手机",
					name: 'mobile',
					allowBlank: true,
				},{
			    	xtype : 'textfield',
					fieldLabel: "QQ",
					name: 'qq',
					allowBlank: true,
				},{
				    xtype : 'textfield',
					fieldLabel: "Email",
					name: 'email',
					allowBlank: true,
				}]
	         }
		    ],
		    // 重置 和 保存 按钮.
		    buttons: [{
		        text: '重置',
		        handler: function(btn) {
		        	btn.up('form').getForm().reset();
		        }
		    }, {
		        text: '保存',
		        handler: function(btn) {
			    	if (!btn.up('form').getForm().isValid())
			    		return;
			    	var win = btn.up('window');
		    		var values = btn.up('form').getForm().getValues();
					var producrs="";
					$.each(values.useProducts,function(i,product){
						if(producrs=="")
							producrs=product;
						else
							producrs+=","+product
					});
					values.useProducts=producrs;
					Ext.apply(ci, values);
	        		Soul.Ajax.request({
						url : '/platformapi/ci/' + ci.id,
						method : 'put',
						jsonData  : ci,
						loadMask : true,
						loadMsg : '修改客户信息',
						successMsg : '成功',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
		    		//
		    		return;
		        }
		    }]
		});
		pal.getForm().setValues(ci);
		
	 	Ext.create('Ext.window.Window', {
	 		title: '修改客户信息',
	 	    bodyPadding: 5,
	 	    width: 350,
	 	    // 表单域 Fields 将被竖直排列, 占满整个宽度
	 	    layout: 'anchor',
	 	    defaults: {
	 	        anchor: '100%'
	 	    },
	 	    // The fields
	 	    defaultType: 'textfield',
	 	    items:pal
	 	  
	 	}).show();
	},
	
	doDelCI : function(ci, callback){
		Soul.Ajax.confirmRestAction("/platformapi/ci/" + ci.id, 'delete', {}, null, callback,
		"删除成功", callback, {
			'delete' : {
				msg : '确认要删除客户信息吗？'
			}
		});
	},

	
	checkCIExist : function(store, parentWin){
		var columns = new Array();
		columns.push(
			 new Ext.grid.RowNumberer(),
            {
                text: "客户类型",
                dataIndex: 'ciType',
                searchType: 'string',
                align: 'left',
                width: 80

            },
            {
                text: "客户名称",
                dataIndex: 'name',
                searchType: 'string',
                align: 'left',
                width: 100
            },
            {
                text: "地址/网址",
                dataIndex: 'address',
                searchType: 'string',
                align: 'left',
                width: 200
            },
            {
                text: "备注",
                dataIndex: 'remarks',
                searchType: 'string',
                align: 'left',
                width: 200
            }, {
                text : "状态",
	            dataIndex: 'status',
	            searchType: 'string',
	            align: 'left',
	            width: 80
	        }, {
	            text: "创建时间",
	            dataIndex: 'ctime',
	            searchType: 'date',
	            align: 'center',
	            width: 100,
	            renderer: function (v, u, r, rowIndex, columnIndex, s) {
	                if (v == null) {
	                    return "未知";
	                }
	                return Ext.util.Format.date(new Date(v), 'Y-m-d H:i:s');
	            }
	        }, {
                text : "联系人",
                dataIndex: 'contacts',
                searchType: 'string',
                align: 'left',
                width: 80
            }, {
                text : "电话",
                dataIndex: 'phone',
                searchType: 'string',
                align: 'left',
                width: 100
            }, {
                text : "手机",
	            dataIndex: 'mobile',
	            searchType: 'string',
	            align: 'left',
	            width: 100
            }, {
                text : "QQ",
	            dataIndex: 'qq',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        }, {
                text : "微信",
	            dataIndex: 'wechat',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        }, {
                text : "旺旺",
	            dataIndex: 'aliww',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        }, {
                text : "EMAIL",
	            dataIndex: 'email',
	            searchType: 'string',
	            align: 'left',
	            width: 100
	        }, {
                text : "服务商账户",
	            dataIndex: 'soId',
	            searchType: 'integer',
	            align: 'left',
	            width: 80
	        },{
                text : "录入人",
                dataIndex: 'commerceName',
                searchType: 'string',
                align: 'left',
                width: 200
            }	
		);
		var pal = Ext.create('Soul.view.SearchGrid', {
			checkIndexes : ['name'],
		    store: store,
		    columns: columns,
		    width: 600,
		    height: 275,
		    //selModel: sm1,	    	
		    //renderTo: Ext.getBody()
		});
		Ext.create('Ext.window.Window', {
			modal:true,  //弹出时其他界面无法操作
			plain:true,
    		title: '已经存在相同的客户信息',
    	    bodyPadding: 5,
    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
    	    layout: 'anchor',
    	    defaults: {
    	        anchor: '100%'
    	    },
    	    
    	    items:pal,
    	    tbar: [
    	           { xtype: 'button',iconCls: 'x-add-icon', text:"返回修改" ,listeners:{
    	        	   click:function(btn){
    	        	   	   btn.up('window').close();
    	        	   }
    	           }}, { xtype: 'button',iconCls: 'x-del-icon', text:"取消" ,listeners:{
    	        	   click:function(btn){
    	        	       btn.up('window').close();
    	        	       parentWin.close();
	        	   	   }
    	           }}
    	         ]
    	  
    	}).show();

	},
	
	showBindingWin : function(ci, callback){
		var me = this;
		var grid = Ext.create('Module.Platform.CI.view.SOSearchTab', {
			customerInfo : ci,
		});
		var win = new Ext.Window( {
			title : "绑定服务商",
			stateful : false,
			items : [ grid],
			modal: true,
			listeners : {
				beforeclose : function(){
					if (typeof callback == "function")
						callback();
				}
			}
		});
		win.show();
	},

	doShowStoreShopInfo : function(ci, callback){
		if (ci.soId) {
			Soul.Ajax.request({
				url : '/storeapi/server/' + ci.soId,
				method : 'get',
				loadMask : true,
				loadMsg : '载入中',
				successMsg : '读取服务商信息完成',
				success : function(response, opts) {
					if (response)
						Module.Store.StoreOwner.Operation.doShowShopDetialFuncion(response);
					else
						Soul.util.MessageUtil.showErrorInfo("", "绑定服务商无效");

				}
			});
		}else {
			Soul.util.MessageUtil.showErrorInfo("", "没有绑定服务商店");
		}
	}
});
