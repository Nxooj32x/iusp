Ext.define('Module.Store.storemanager.Operation', {
	singleton: true,

	requires: [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView',
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Store.storemanager.Tools',
		'Module.Store.storemanager.store.StoreOwnerStore'
	],

	getOperationForStore:function(store){
		store.httpParams = new Object();
		store.httpMethod = new Object();
		store.requestBody = new Object();
		store.methodConfirm = new Object();
	},

	doEditStoreFunction:function(data,callbackFun){


		var status = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "暂停", Value: "pause" },
				{ Name: "拒绝", Value: "reject" },
				{ Name: "启用", Value: "start" },
				{ Name: "停止", Value: "stop" }
			]
		});

		var type = Ext.create("Ext.data.Store", {
			fields: ["Name", "Value"],
			data: [
				{ Name: "淘宝网店", Value: "淘宝网店" },
				{ Name: "图文打印店", Value: "图文打印店" },
				{ Name: "摄影写真门店", Value: "摄影写真门店" }
			]
		});

		var pal = Ext.create('Ext.form.Panel', {
			id:"storeForm",
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
				fieldLabel:STOREOWNER_LABEL.contacts,
				id: 'contacts',
				name:'contacts',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.contacts
			},{
				xtype : 'textfield',
				fieldLabel: STOREOWNER_LABEL.phone,
				id: 'phone',
				name:'phone',
				allowBlank: false,
				enableKeyEvents:true,
				flex: 20,
				regex: /^((\d{3,4}-)*\d{7,8}(-\d{3,4})*|13\d{9})$/,
				value:data.phone
			},{
				xtype : 'textfield',
				fieldLabel: STOREOWNER_LABEL.email,
				id: 'email',
				name:'email',
				vtype:'email',
				allowBlank: true,
				enableKeyEvents:true,
				value:data.email
			},{
				xtype : 'textfield',
				fieldLabel: STOREOWNER_LABEL.city,
				id: 'city',
				name:'city',
				allowBlank: false,
				enableKeyEvents:true,
				value:data.city

			},{
				xtype : 'textfield',
				fieldLabel: STOREOWNER_LABEL.address,
				id: 'address',
				name:'address',
				allowBlank: true,
				enableKeyEvents:true,
				value:data.address
			},{
				xtype : 'combobox',
				fieldLabel: STOREOWNER_LABEL.storeType,
				id: 'storeType',
				name:'storeType',
				displayField: "Name",
				store: type,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				value:data.storeType
			},{
				xtype : 'combobox',
				fieldLabel: STOREOWNER_LABEL.status,
				id: 'status	',
				name:'status',
				displayField: "Name",
				store: status,
				editable: false,
				valueField: "Value",
				emptyText: "--请选择--",
				allowBlank: false,
				enableKeyEvents:true,
				value:data.status,

			},{
				xtype : 'textarea',
				fieldLabel: STOREOWNER_LABEL.note,
				id: 'note',
				name:'note',
				allowBlank: false,
				enableKeyEvents:true,
				labelSepartor: "：",
				labelWidth: 60,
				width: 230,
				value:data.note
			}
			]
		});
		var win = null;
		win = new Ext.Window({
			id:'editStoreWin',
			title: STORE_LABEL.editStore,
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

					var editStoreUrl = "/storeapi/server/"+data.id;

					var values = pal.getForm().getValues();

					SureAjax.ajax({
						url : editStoreUrl,
						type : "PUT",
						headers : {
							Accept : "application/json"
						},
						data : {
							contacts : values.contacts,
							phone : values.phone,
							storeType : values.storeType,
							address : values.address,
							email : values.email,
							status : values.status,
							note : values.note,
							city : values.city,
						},
						success : function(){
							if (typeof callbackFun === 'function')
								callbackFun();
							win.close();
						}
					});



					Soul.Ajax.request({
						url: editStoreUrl,
						jsonData: values,
						headers: {
							Accept: 'application/json'
						},
						method: 'PUT',
						loadMask: true,
						loadMsg: '正在更新服务商数据请稍候..',
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

	doManagerStatisticDetilFuncion :function(data,callbackFun){

	},

	doManagerShopDetialFuncion:function(data,callbackFun){

		var storeShopGrid = Ext.create('Module.Store.storemanager.view.StoreShopGrid',{
			id : 'manageStoreGrid',
			anchor : '100% 100%',
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar'
			}]
		});

		//设置相关的 store api
		var store = Ext.data.StoreManager.lookup("Module.Store.storemanager.store.StoreshopStore");
		store.proxy.api = {
			read : '/storeapi/server/'+data.id+'/shop/'
		};
		store.load();
		var winTitle = Ext.String.format(STORE_LABEL.storeShopDetialTitle, data.contacts);
		var win = new Ext.Window({
			title: winTitle,
			items: storeShopGrid,
			width: 1020,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.show();

	}

});