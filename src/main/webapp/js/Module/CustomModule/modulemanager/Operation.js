Ext.define('Module.CustomModule.modulemanager.Operation', {
	singleton: true,

	requires: [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView',
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.CustomModule.modulemanager.Tools',
		'Module.CustomModule.modulemanager.store.ModuleStore'
	],

	getOperationForBilling : function (billing) {

		billing.httpParams = new Object();
		billing.httpMethod = new Object();
		billing.requestBody = new Object();
		billing.methodConfirm = new Object();
	},

	getOperationForConfig :function (config) {

		config.httpParams = new Object();
		config.httpMethod = new Object();
		config.requestBody = new Object();
		config.methodConfirm = new Object();
	},


	/**
	 * 模块操作方法
     */
	doAddModuleFunction : function(obj, keyupFunc, callbackFun){

		var status = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "启动", Value: "start" },
				{ Name: "暂停", Value: "pause" },
				{ Name: "停止", Value: "stop" },
				{ Name: "销毁", Value: "delete" }
			]
		});

		var showInShop = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "是", Value: true },
				{ Name: "否", Value: false }
			]
		});

		var type = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "基本服务", Value: "base" },
				{ Name: "定制服务", Value: "custom" },
				{ Name: "高级服务", Value: "extend" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"moduleForm",
			bodyPadding: 5,
			width: 350,
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
				fieldLabel: MODULE_LABEL.name,
				id: 'name',
				name:'name',
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'textfield',
				fieldLabel: MODULE_LABEL.code,
				id: 'code',
				name:'code',
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'textfield',
				fieldLabel: MODULE_LABEL.logo,
				id: 'logo',
				name:'logo',
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: MODULE_LABEL.showInShop,
				id: 'showInShop',
				name:'showInShop',
				displayField: "Name",
				store: showInShop,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: MODULE_LABEL.type,
				id: 'type',
				name:'type',
				displayField: "Name",
				store: type,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: MODULE_LABEL.status,
				id: 'status	',
				name:'status',
				displayField: "Name",
				store: status,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype: 'textarea',
				name: 'description',
				id:'description',
				maxLength: 120,
				maxLengthText: '最多输入120个字符',
				fieldLabel: MODULE_LABEL.description
			}
			]
		});


		var win = null;
		win = new Ext.Window({
			id:'addModuleWin',
			title: '增加模块',
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
				disabled:true,
				id:"saveBtn",
				handler: function() {

					if (!pal.getForm().isValid()) return;

					var addDishUrl = "/api/admin/module/";

					var values = pal.getForm().getValues();

					Soul.Ajax.request({
						url: addDishUrl,
						jsonData: values,
						headers: {
							Accept: 'application/json'
						},
						loadMask: true,
						loadMsg: '正在创建模板请稍候..',
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

	doEditModuleFunction :function(data, callbackFun) {

		var status = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "启动", Value: "start" },
				{ Name: "暂停", Value: "pause" },
				{ Name: "停止", Value: "stop" },
				{ Name: "销毁", Value: "delete" }
			]
		});

		var showInShop = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "是", Value:true },
				{ Name: "否", Value: false }
			]
		});

		var type = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "基本服务", Value: "base" },
				{ Name: "定制服务", Value: "custom" },
				{ Name: "高级服务", Value: "extend" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"moduleForm",
			bodyPadding: 5,
			width: 350,
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
				fieldLabel: MODULE_LABEL.name,
				id: 'name',
				name:'name',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.name
			},{
				xtype : 'textfield',
				fieldLabel: MODULE_LABEL.code,
				id: 'code',
				name:'code',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.code
			},{
				xtype : 'textfield',
				fieldLabel: MODULE_LABEL.logo,
				id: 'logo',
				name:'logo',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.logo
			},{
				xtype : 'combobox',
				fieldLabel: MODULE_LABEL.showInShop,
				id: 'showInShop',
				name:'showInShop',
				displayField: "Name",
				store: showInShop,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				value:data.showInShop,
				enableKeyEvents:true
			},{
				xtype : 'combobox',
				fieldLabel: MODULE_LABEL.type,
				id: 'type',
				name:'type',
				displayField: "Name",
				store: type,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				value:data.type,
				enableKeyEvents:true
			},{
				xtype : 'combobox',
				fieldLabel: MODULE_LABEL.status,
				id: 'status	',
				name:'status',
				displayField: "Name",
				store: status,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				value:data.status,
				enableKeyEvents:true
			},{
				xtype : 'textarea',
				fieldLabel: MODULE_LABEL.description,
				id: 'description',
				name:'description',
				allowBlank: false,
				enableKeyEvents:true,
				labelSepartor: "：",
				labelWidth: 60,
				width: 230,
				value:data.description
			}
			]
		});
		var win = null;
		win = new Ext.Window({
			id:'editModuleWin',
			title: MODULE_LABEL.editModule,
			items: pal,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.apply,
				handler: function(){

					if (!pal.getForm().isValid()) return;

					var editDishUrl = "/api/admin/module/"+data.id;

					var values = pal.getForm().getValues();

					Soul.Ajax.request({
						url: editDishUrl,
						jsonData: values,
						headers: {
							Accept: 'application/json'
						},
						method: 'PUT',
						loadMask: true,
						loadMsg: '正在更新模板请稍候..',
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
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	},

	doDelModuleFunction :function(records,callbackFun){
		if (records.length == 0) {
			Ext.Msg.alert('请选中需要删除的模块！');
			return false;
		}

		Ext.Msg.confirm('', Ext.String.format('确定要删除选中的[{0}]条模块?', records.length), function (button, text) {
			if (button == "yes") {
				for (var i = 0; i < records.length; i++) {
					var params = records[i].data;
					var url = "/api/admin/module/" + params.id;
					Soul.Ajax.restAction(url, "DELETE", null, Ext.encode(params), function (ret) {
						callbackFun	();
					}, null, null, null);

				}
			}
		});

	},

	/**
	 * 计费操作方法
	 */
	doManageBillingFunction : function(data, callbackFun){

		var addAction = Ext.create("Ext.Button", {
			text: '新增',
			name: 'addBillingButton',
			iconCls: 'x-add-icon',
			disabled: false
		});


		var billingGrid = Ext.create('Module.CustomModule.modulemanager.view.BillingGrid',{
			id : 'manageBillingGrid',
			anchor : '100% 100%',
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: [addAction]
			}],
			moduleid : data.id,
			moduleName : data.name,
			defaultBillingWay:data.defaultBillingWay
		});

		//设置相关的 store api
		var store = Ext.data.StoreManager.lookup("Module.CustomModule.modulemanager.store.BillingStore");
		store.proxy.api = {
			read : '/api/admin/module/'+data.id+'/billing/'
		};
		store.load();
		var winTitle = Ext.String.format(BILLING_LABEL.manageBillingTitle, data.name);
		var win = new Ext.Window({
			id:"showbilling",
			title: winTitle,
			items: billingGrid,
			width: 1020,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.show();
		win.on("close",function(){
			callbackFun();
		});
	},

	doAddBillingFunction:function(moduleId, keyupFunc, callbackFun){

		var status = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "使用中", Value: "IN_USE" },
				{ Name: "未使用", Value: "NO_USE" }
			]
		});

		var isTF = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "是", Value: true },
				{ Name: "否", Value: false }
			]
		});

		var billingType = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "时长计费", Value: "TIME" },
				{ Name: "次数计费", Value: "PPV" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"moduleForm",
			bodyPadding: 5,
			width: 350,
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
				fieldLabel:BILLING_LABEL.name,
				id: 'name',
				name:'name',
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{

				xtype : 'numberfield',
				id: 'price',
				name:'price',
				allowDecimals: false,
				minValue: 0,
				maxValue: 100000,
				step: 1,
				fieldLabel: BILLING_LABEL.price,
				enableKeyEvents:true,
				allowBlank: false,
				listeners: {
					keyup: keyupFunc
				}
			},{

				xtype : 'numberfield',
				id: 'serviceTime',
				name:'serviceTime',
				allowDecimals: false,
				minValue: 1,
				maxValue: 9999999999999,
				step: 1,
				fieldLabel: BILLING_LABEL.serviceTime,
				enableKeyEvents:true,
				allowBlank: false,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: BILLING_LABEL.billingType,
				id: 'billingType',
				name:'billingType',
				displayField: "Name",
				store: billingType,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: BILLING_LABEL.global,
				id: 'global	',
				name:'global',
				displayField: "Name",
				store: isTF,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: BILLING_LABEL.onlyOne,
				id: 'onlyOne	',
				name:'onlyOne',
				displayField: "Name",
				store: isTF,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: BILLING_LABEL.status,
				id: 'status	',
				name:'status',
				displayField: "Name",
				store: status,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'textfield',
				fieldLabel:BILLING_LABEL.description,
				id: 'description',
				name:'description',
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}

			}
			]
		});


		var win = null;
		win = new Ext.Window({
			id:'addBillingWin',
			title: '添加计费方式',
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
				disabled:true,
				id:"saveBtn",
				handler: function() {

					if (!pal.getForm().isValid()) return;

					var addDishUrl = "/api/admin/module/"+moduleId+"/billing/";

					var values = pal.getForm().getValues();

					Soul.Ajax.request({
						url: addDishUrl,
						jsonData: values,
						headers: {
							Accept: 'application/json'
						},
						loadMask: true,
						loadMsg: '正在添加计费数据,请稍候..',
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

	doEditBillingFunction:function(moduleId,data, callbackFun){
		var status = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "使用中", Value: "IN_USE" },
				{ Name: "未使用", Value: "NO_USE" }
			]
		});

		var isTF = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "是", Value: true },
				{ Name: "否", Value: false }
			]
		});

		var billingType = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "时长计费", Value: "TIME" },
				{ Name: "次数计费", Value: "PPV" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"moduleForm",
			bodyPadding: 5,
			width: 350,
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
				fieldLabel:BILLING_LABEL.name,
				id: 'name',
				name:'name',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.name
			},{
				xtype : 'numberfield',
				id: 'price',
				name:'price',
				allowDecimals: false,
				minValue: 0,
				maxValue: 100000,
				step: 1,
				fieldLabel: BILLING_LABEL.price,
				labelAlign: 'right',
				enableKeyEvents:true,
				allowBlank: false,
				value:data.price
			},{
				xtype : 'numberfield',
				id: 'serviceTime',
				name:'serviceTime',
				allowDecimals: false,
				minValue: 1,
				maxValue: 999999999999,
				step: 1,
				fieldLabel: BILLING_LABEL.serviceTime,
				labelAlign: 'right',
				enableKeyEvents:true,
				allowBlank: false,
				value:data.serviceTime
			},{
				xtype : 'combobox',
				fieldLabel: BILLING_LABEL.billingType,
				id: 'billingType',
				name:'billingType',
				displayField: "Name",
				store: billingType,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				value:data.billingType
			},{
				xtype : 'combobox',
				fieldLabel: BILLING_LABEL.global,
				id: 'global	',
				name:'global',
				displayField: "Name",
				store: isTF,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				value:data.global
			},{
				xtype : 'combobox',
				fieldLabel: BILLING_LABEL.onlyOne,
				id: 'onlyOne	',
				name:'onlyOne',
				displayField: "Name",
				store: isTF,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				value:data.onlyOne
			},{
				xtype : 'combobox',
				fieldLabel: BILLING_LABEL.status,
				id: 'status	',
				name:'status',
				displayField: "Name",
				store: status,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				value:data.status
			},{
				xtype : 'textfield',
				fieldLabel:BILLING_LABEL.description,
				id: 'description',
				name:'description',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.description
			}
			]
		});


		var win = null;
		win = new Ext.Window({
			id:'editBillingWin',
			title: '编辑计费方式',
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
				id:"saveBtn",
				handler: function() {

					if (!pal.getForm().isValid()) return;

					var addDishUrl = "/api/admin/module/"+moduleId+"/billing/"+data.id;

					var values = pal.getForm().getValues();

					Soul.Ajax.request({
						url: addDishUrl,
						jsonData: values,
						headers: {
							Accept: 'application/json'
						},
						method: 'PUT',
						loadMask: true,
						loadMsg: '正在更新计费数据,请稍候..',
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

	doDelBillingFunction :function(me,records,callbackFun){

		if (records.length == 0) {
			Ext.Msg.alert('请选中需要删除的计费项！');
			return false;
		}

		Ext.Msg.confirm('', Ext.String.format('确定要删除选中的[{0}]条计费项?', records.length), function (button, text) {
			if (button == "yes") {
				for (var i = 0; i < records.length; i++) {
					var params = records[i].data;
					if(parseInt(me.defaultBillingWay) == params.id){
						Ext.Msg.alert('提示','默认计费项不能删除！');
						return false;
					}
					var url = "/api/admin/module/"+me.moduleid+"/billing/" + params.id;
					Soul.Ajax.restAction(url, "DELETE", null, Ext.encode(params), function (ret) {
						callbackFun	();
					}, null, null, null);

				}
			}
		});
	},

	doSetDefaultBillingFunction :function(moduleId,data, callbackFun){
		Ext.Msg.confirm('', Ext.String.format('确定要设置[{0}]计费项为默认计费方式?', data.name), function (button, text) {
			if (button == "yes") {
					var params = data;
					var url = "/api/admin/module/"+moduleId+"/billing/";
					Soul.Ajax.restAction(url, "PUT",{bid:data.id}, Ext.encode(params), function (ret) {
						Ext.getCmp("showbilling").close();
						callbackFun	();
					}, null, null, null);
			}
		});
	},

	/**
	 * 配置项操作方法
	 */
	doManageConfigFunction : function(data, callbackFun){

		var addAction = Ext.create("Ext.Button", {
			text: '新增',
			name: 'addConfigButton',
			iconCls: 'x-add-icon',
			disabled: false
		});

		var configGrid = Ext.create('Module.CustomModule.modulemanager.view.ConfigGrid',{
			id : 'manageConfigGrid',
			anchor : '100% 100%',
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: [addAction]
			}],
			moduleid : data.id,
			moduleName : data.name
		});

		//设置相关的 store api
		var store = Ext.data.StoreManager.lookup("Module.CustomModule.modulemanager.store.ConfigStore");
		store.proxy.api = {
			read : '/api/admin/module/'+data.id+'/config/'
		};
		store.load();
		var winTitle = Ext.String.format(CONFIG_LABEL.manageConfigTitle, data.name);
		var win = new Ext.Window({
			title: winTitle,
			items: configGrid,
			width: 1020,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.show();
	},

	doAddConfigFunction :function(moduleId, keyupFunc, callbackFun){


		var isTF = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "是", Value: true },
				{ Name: "否", Value: false }
			]
		});

		var type = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "数组型", Value: "list" },
				{ Name: "布尔型", Value: "boolean" },
				{ Name: "字符串型", Value: "string" },
				{ Name: "整数型", Value: "integer" },
				{ Name: "浮点型", Value: "float" },
				{ Name: "日期型", Value: "date" },
				{ Name: "单选型", Value: "select" },
				{ Name: "多选型", Value: "choose" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"configForm",
			bodyPadding: 5,
			width: 350,
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
				fieldLabel:CONFIG_LABEL.name,
				id: 'name',
				name:'name',
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'textfield',
				fieldLabel: CONFIG_LABEL.key,
				id: 'key',
				name:'key',
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'numberfield',
				fieldLabel: CONFIG_LABEL.maxNum,
				id: 'maxNum',
				name:'maxNum',
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'textfield',
				fieldLabel: CONFIG_LABEL.defaultValue,
				id: 'defaultValue',
				name:'defaultValue',
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: CONFIG_LABEL.type,
				id: 'type',
				name:'type',
				displayField: "Name",
				store: type,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: CONFIG_LABEL.isOrder,
				id: 'isOrder',
				name:'isOrder',
				displayField: "Name",
				store: isTF,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			},{
				xtype : 'combobox',
				fieldLabel: CONFIG_LABEL.required,
				id: 'required	',
				name:'required',
				displayField: "Name",
				store: isTF,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				listeners: {
					keyup: keyupFunc
				}
			}
			]
		});


		var win = null;
		win = new Ext.Window({
			id:'addCofnigWin',
			title: '添加配置项',
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
				disabled:true,
				id:"saveBtn",
				handler: function() {

					if (!pal.getForm().isValid()) return;

					var addDishUrl = "/api/admin/module/"+moduleId+"/config/";

					var values = pal.getForm().getValues();

					Soul.Ajax.request({
						url: addDishUrl,
						jsonData: values,
						headers: {
							Accept: 'application/json'
						},
						loadMask: true,
						loadMsg: '正在添加配置项数据,请稍候..',
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

	doEditConfigFunction: function (moduleId,data, callbackFun) {


		var isTF = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "是", Value: true },
				{ Name: "否", Value: false }
			]
		});

		var type = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "数组型", Value: "list" },
				{ Name: "布尔型", Value: "boolean" },
				{ Name: "字符串型", Value: "string" },
				{ Name: "整数型", Value: "integer" },
				{ Name: "浮点型", Value: "float" },
				{ Name: "日期型", Value: "date" },
				{ Name: "单选型", Value: "select" },
				{ Name: "多选型", Value: "choose" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"configForm",
			bodyPadding: 5,
			width: 350,
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
				fieldLabel:CONFIG_LABEL.name,
				id: 'name',
				name:'name',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.name
			},{
				xtype : 'textfield',
				fieldLabel: CONFIG_LABEL.key,
				id: 'key',
				name:'key',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.key
			},{
				xtype : 'textfield',
				fieldLabel: CONFIG_LABEL.maxNum,
				id: 'maxNum',
				name:'maxNum',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.maxNum
			},{
				xtype : 'textfield',
				fieldLabel: CONFIG_LABEL.defaultValue,
				id: 'defaultValue',
				name:'defaultValue',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.defaultValue
			},{
				xtype : 'combobox',
				fieldLabel: CONFIG_LABEL.type,
				id: 'type',
				name:'type',
				displayField: "Name",
				store: type,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				value:data.type
			},{
				xtype : 'combobox',
				fieldLabel: CONFIG_LABEL.isOrder,
				id: 'isOrder',
				name:'isOrder',
				displayField: "Name",
				store: isTF,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				value:data.isOrder
			},{
				xtype : 'combobox',
				fieldLabel: CONFIG_LABEL.required,
				id: 'required	',
				name:'required',
				displayField: "Name",
				store: isTF,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				value:data.required
			}
			]
		});


		var win = null;
		win = new Ext.Window({
			id:'editCofnigWin',
			title: '编辑配置项',
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
				id:"saveBtn",
				handler: function() {

					if (!pal.getForm().isValid()) return;

					var addDishUrl = "/api/admin/module/"+moduleId+"/config/"+data.id;

					var values = pal.getForm().getValues();

					Soul.Ajax.request({
						url: addDishUrl,
						jsonData: values,
						headers: {
							Accept: 'application/json'
						},
						method: 'PUT',
						loadMask: true,
						loadMsg: '正在更新配置项数据,请稍候..',
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

	doDelConfigFunction :function(moduleId,records, callbackFun){
		if (records.length == 0) {
			Ext.Msg.alert('请选中需要删除的配置项！');
			return false;
		}

		Ext.Msg.confirm('', Ext.String.format('确定要删除选中的[{0}]条配置项?', records.length), function (button, text) {
			if (button == "yes") {
				for (var i = 0; i < records.length; i++) {
					var params = records[i].data;
					var url = "/api/admin/module/"+moduleId+"/config/" + params.id;
					Soul.Ajax.restAction(url, "DELETE", null, Ext.encode(params), function (ret) {
						callbackFun	();
					}, null, null, null);
				}
			}
		});
	}


});