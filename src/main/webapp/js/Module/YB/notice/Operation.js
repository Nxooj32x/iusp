Ext.define('Module.YB.notice.Operation', {
	singleton : true,
	requires : ['Module.YB.notice.view.Form'],

	/**
	 * 更新公告信息
	 */
    updateNotice:function(form,record,store){
    	var me=this;
    	var params=Ext.encode(form.getForm().getValues());
       	Soul.Ajax.restAction('/notice/globalconfig/smartprt', 'PUT', params, null,
    						function(ret) {
					       		var idx = store.indexOf(record);
								store.remove(store.getAt(idx));
								store.insert(idx, form.getForm().getValues());
    							me.window.close();
    						}, null, null);
    	
    },

	doAddPopNotice: function (obj, callbackFun) {

		var showInOpen = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "开启", Value: "1" },
				{ Name: "关闭", Value: "0" }
			]
		});

		//var type = Ext.create("Ext.data.Store", {
		//	fields: ["Name", "Value"],
		//	data: [
		//		{ Name: "首页置顶公告", Value: "top" },
		//		{ Name: "功能更新公告", Value: "pop" }
		//	]
		//});

		var pal = Ext.create('Ext.form.Panel', {
			id:"moduleForm",
			bodyPadding: 5,
			width: 550,
			heigh:600,
			url: '',
			method:'put',
			// 表单域 Fields 将被竖直排列, 占满整个宽度
			layout: 'anchor',
			defaults: {
				anchor: '100%'
			},
			// The fields
			items: [{
				xtype : 'textfield',
				fieldLabel: "标题",
				id: 'title',
				name:'title',
				allowBlank: false,
				enableKeyEvents:true
			},{
				xtype : 'combobox',
				fieldLabel: "状态",
				id: 'status',
				name:'status',
				displayField: "Name",
				store: showInOpen,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				value:"0",
				enableKeyEvents:true
			},{
				xtype: 'textarea',
				name: 'content',
				id:'content',
				maxLength: 500,
				maxLengthText: '最多输入500个字符',
				fieldLabel: "内容"
			},{
				xtype : 'textfield',
				fieldLabel: "图片地址",
				id: 'picture',
				name:'picture',
				allowBlank: false,
				enableKeyEvents:true
			}
			]
		});

		var win = null;
		win = new Ext.Window({
			id:'addNoticeWin',
			title: '新增功能更新公告',
			items: pal,
			stateful: false,
			autoDestroy: true,
			bodyStyle: 'padding:5px',
			modal: true,
			buttonAlign: 'center',
			buttons: [{
				text: '重置',
				handler: function() {
					pal.getForm().reset();
				}
			}, {
				text: '保存',
				disabled:false,
				id:"saveBtn",
				handler: function() {

					if (!pal.getForm().isValid()) return;

					var addDishUrl = "/api/notice";

					var values = pal.getForm().getValues();
					console.log(values);
					values['type'] = 'pop';
					console.log(values);
					//Soul.Ajax.restAction('/voucher', 'post', Ext.encode(params), null, callbackFun, null, null);
					Soul.Ajax.request({
						url: addDishUrl,
						jsonData: values,
						headers: {
							Accept: 'application/json'
						},
						loadMask: true,
						loadMsg: '正在创建请稍候..',
						success: function (response, opts) {
							if (typeof callbackFun === 'function')
								callbackFun();
							win.close();
						},
						failure: function () {
							callbackFun();
							win.close();
						}
					});
				}
			}]
		}).show();
	},


	doUpdatePopNotice: function (obj, callbackFun) {

		var showInOpen = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "开启", Value: "1" },
				{ Name: "关闭", Value: "0" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"moduleForm",
			bodyPadding: 5,
			width: 550,
			heigh:600,
			url: '',
			method:'put',
			// 表单域 Fields 将被竖直排列, 占满整个宽度
			layout: 'anchor',
			defaults: {
				anchor: '100%'
			},
			// The fields
			items: [{
				xtype : 'textfield',
				fieldLabel: "标题",
				id: 'title',
				name:'title',
				value:obj.title,
				allowBlank: false,
				enableKeyEvents:true
			},{
				xtype : 'combobox',
				fieldLabel: "状态",
				id: 'status',
				name:'status',
				displayField: "Name",
				store: showInOpen,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				value:obj.status,
				enableKeyEvents:true
			},{
				xtype: 'textarea',
				name: 'content',
				id:'content',
				maxLength: 500,
				maxLengthText: '最多输入500个字符',
				value:obj.content,
				fieldLabel: "内容"
			},{
				xtype : 'textfield',
				fieldLabel: "图片地址",
				id: 'picture',
				name:'picture',
				allowBlank: false,
				value:obj.picture,
				enableKeyEvents:true
			}
			]
		});

		var win = null;
		win = new Ext.Window({
			id:'editPopNoticeWin',
			title: '编辑功能更新公告',
			items: pal,
			stateful: false,
			autoDestroy: true,
			bodyStyle: 'padding:5px',
			modal: true,
			buttonAlign: 'center',
			buttons: [{
				text: '重置',
				handler: function() {
					pal.getForm().reset();
				}
			}, {
				text: '保存',
				disabled:false,
				id:"saveBtn",
				handler: function() {
					if (!pal.getForm().isValid()) return;
					var url = "/api/notice/"+obj.id;
					var values = pal.getForm().getValues();
					values['type'] = 'pop';
					Soul.Ajax.restAction(url, 'put', Ext.encode(values), null, callbackFun, null, null);
					win.close();
				}
			}]
		}).show();
	},


	doAddTopNotice: function (obj, callbackFun) {

		var showInOpen = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "开启", Value: "1" },
				{ Name: "关闭", Value: "0" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"moduleForm",
			bodyPadding: 5,
			width: 550,
			heigh:600,
			url: '',
			method:'put',
			layout: 'anchor',
			defaults: {
				anchor: '100%'
			},
			items: [{
				xtype : 'combobox',
				fieldLabel: "状态",
				id: 'status',
				name:'status',
				displayField: "Name",
				store: showInOpen,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				value:"0",
				enableKeyEvents:true
			},{
				xtype: 'textarea',
				name: 'content',
				id:'content',
				allowBlank: false,
				fieldLabel: "内容"
			}
			]
		});

		var win = null;
		win = new Ext.Window({
			id:'addNoticeWin',
			title: '新增功能更新公告',
			items: pal,
			stateful: false,
			autoDestroy: true,
			bodyStyle: 'padding:5px',
			modal: true,
			buttonAlign: 'center',
			buttons: [{
				text: '重置',
				handler: function() {
					pal.getForm().reset();
				}
			}, {
				text: '保存',
				disabled:false,
				id:"saveBtn",
				handler: function() {

					if (!pal.getForm().isValid()) return;

					var addDishUrl = "/api/notice";

					var values = pal.getForm().getValues();
					console.log(values);
					values['type'] = 'top';
					console.log(values);
					//Soul.Ajax.restAction('/voucher', 'post', Ext.encode(params), null, callbackFun, null, null);
					Soul.Ajax.request({
						url: addDishUrl,
						jsonData: values,
						headers: {
							Accept: 'application/json'
						},
						loadMask: true,
						loadMsg: '正在创建请稍候..',
						success: function (response, opts) {
							if (typeof callbackFun === 'function')
								callbackFun();
							win.close();
						},
						failure: function () {
							callbackFun();
							win.close();
						}
					});
				}
			}]
		}).show();
	},
	doUpdateTopNotice: function (obj, callbackFun) {

		var showInOpen = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "开启", Value: "1" },
				{ Name: "关闭", Value: "0" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"moduleForm",
			bodyPadding: 5,
			width: 550,
			heigh:600,
			url: '',
			method:'put',
			// 表单域 Fields 将被竖直排列, 占满整个宽度
			layout: 'anchor',
			defaults: {
				anchor: '100%'
			},
			// The fields
			items: [{
				xtype : 'combobox',
				fieldLabel: "状态",
				id: 'status',
				name:'status',
				displayField: "Name",
				store: showInOpen,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				value:obj.status,
				enableKeyEvents:true
			},{
				xtype: 'textarea',
				name: 'content',
				id:'content',
				maxLength: 500,
				maxLengthText: '最多输入500个字符',
				value:obj.content,
				fieldLabel: "内容"
			}
			]
		});

		var win = null;
		win = new Ext.Window({
			id:'editPopNoticeWin',
			title: '编辑首页置顶公告',
			items: pal,
			stateful: false,
			autoDestroy: true,
			bodyStyle: 'padding:5px',
			modal: true,
			buttonAlign: 'center',
			buttons: [{
				text: '重置',
				handler: function() {
					pal.getForm().reset();
				}
			}, {
				text: '保存',
				disabled:false,
				id:"saveBtn",
				handler: function() {
					if (!pal.getForm().isValid()) return;
					var url = "/api/notice/"+obj.id;
					var values = pal.getForm().getValues();
					Soul.Ajax.restAction(url, 'put', Ext.encode(values), null, callbackFun, null, null);
					win.close();
				}
			}]
		}).show();
	},



});