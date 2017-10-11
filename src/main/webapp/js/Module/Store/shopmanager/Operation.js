Ext.define('Module.Store.shopmanager.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Store.shopmanager.Tools'
	],




	doEditShopFunction : function(records, callbackFun) {
		var shop = records[0].data;
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 600,
			frame: true,
			layout: {
				type: 'column'
			},
			items:[{
				xtype: 'container',
				columnWidth : .50,
				autoHeight : true,
				defaults: {
					xtype: 'textfield',
					labelAlign: 'right',
					width: 250
				},
				items:[
					{
						name: 'name',
						fieldLabel: STORE_LABEL.name,
						maxLength: 40,
						maxLengthText: '最多输入40个字符',
						allowBlank: false,
						value:shop.name,
						blankText: STORE_LABEL.STORE_LABEL
					},{
						xtype: 'textarea',
						name: 'business',
						maxLength: 120,
						maxLengthText: '最多输入120个字符',
						value:shop.business,
						fieldLabel: STORE_LABEL.business,
					},
					Module.Store.shopmanager.Tools.getStateCombo(shop.status)


				]
			}]
		});

		var win = null;
		win = new Ext.Window({
			title: STORESHOP_LABEL.editShop,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.apply,
				handler: function(){

					if (!formpanel.getForm().isValid()) return;
					var addPromotionUrl = "/storeapi/server/"+shop.storeOwnerId+"/shop/"+shop.id;
					var values = formpanel.getForm().getValues();

					SureAjax.ajax({
						url : addPromotionUrl,
						type : "PUT",
						headers : {
							Accept : "application/json"
						},
						data : {
							name : values.name,
							status : values.status,
							business : values.business,
						},
						success : function(){
							if (typeof callbackFun === 'function')
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



	doShowModuleFunction : function(records, callbackFun){

		var shop = records[0].data;

		var shopModuleGrid = Ext.create('Module.Store.shopmanager.view.ShopModuleGrid',{
			id : 'shopModuleGrid',
			anchor : '100% 100%',
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: []
			}],
			shopId : shop.id
			//channelIdName: channel.user.fullName
		});

		//设置相关的 store api
		var store = Ext.data.StoreManager.lookup("Module.Store.shopmanager.store.ShopModuleStore");
		store.proxy.api = {
			read : "/storeapi/shop/"+ shop.id+"/modules/"
		};

		var winTitle = Ext.String.format("站点，模块明细");
		var win = new Ext.Window({
			title: winTitle,
			items: shopModuleGrid,
			width: 1020,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		store.load();
		win.show();
	},

	doShowModuleBillingFunction : function(records, callbackFun){

		var module = records[0].data;

		var addShopMouleBilling = Ext.create("Ext.Button", {
			text: '添加计费',
			name: 'addShopMouleBilling',
			iconCls: 'x-add-icon',
			disabled: false
		});

		var shopModuleBillingGrid = Ext.create('Module.Store.shopmanager.view.ShopModuleBillingGrid',{
			id : 'shopModuleBillingGrid',
			anchor : '100% 100%',
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: [addShopMouleBilling]
			}],
			moduleId : module.id
		});

		//设置相关的 store api
		var store = Ext.data.StoreManager.lookup("Module.Store.shopmanager.store.ShopModuleBillingStore");
		store.proxy.api = {
			read : "/storeapi/shop/"+ module.shopId+"/module/"+module.id+"/billing/"
		};

		var winTitle = Ext.String.format("站点模块，计费明细");
		var win = new Ext.Window({
			title: winTitle,
			items: shopModuleBillingGrid,
			width: 1020,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		store.load();
		win.show();
	},



	doEditShopModuleBillingFunction : function(records, callbackFun) {
	var billing = records[0].data;
	var formpanel = new Ext.FormPanel({
		labelWidth: 60,
		width: 600,
		frame: true,
		layout: {
			type: 'column'
		},
		items:[{
			xtype: 'container',
			columnWidth : .50,
			autoHeight : true,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 250
			},
			items:[
				{
					name: 'name',
					fieldLabel: SHOP_MODULE_BILLING_LABEL.name,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					value:billing.name,
					blankText: STORE_LABEL.STORE_LABEL
				},{
					xtype: 'textarea',
					name: 'note',
					maxLength: 120,
					maxLengthText: '最多输入120个字符',
					value:billing.note,
					fieldLabel: SHOP_MODULE_BILLING_LABEL.note,
				},
				Module.Store.shopmanager.Tools.getShopMouduleBillingStateCombo(billing.status)


			]
		}]
	});

	var win = null;
	win = new Ext.Window({
		title: " 编辑计费",
		items: formpanel,
		stateful : false,
		autoDestroy:true,
		bodyStyle: 'padding:5px',
		modal:true,
		buttonAlign: 'center',
		buttons: [{
			text: LABEL.apply,
			handler: function(){

				if (!formpanel.getForm().isValid()) return;
				var addPromotionUrl = "/storeapi/shop/"+billing.shopId+"/module/"+billing.moduleId+"/billing/"+billing.id;

				var values = formpanel.getForm().getValues();

				SureAjax.ajax({
					url : addPromotionUrl,
					type : "PUT",
					headers : {
						Accept : "application/json"
					},
					data : {
						status : values.status,
						name : values.name,
						note : values.note,
					},
					success : function(){
						if (typeof callbackFun === 'function')
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

// doDelChannelUserFunction: function (channerId,records, callbackFn) {
    //
	// 	Ext.Msg.confirm('', Ext.String.format('确定要删除选中的[{0}]条下属用户?', records.length), function (button, text) {
	// 		if (button == "yes") {
	// 			for (var i = 0; i < records.length; i++) {
	// 				var url = "/api/channel/"+channerId+"/user/"+records[i].data.id+"/";
    //
	// 				Soul.Ajax.restAction(url, "DELETE", null, null, function (ret) {
	// 					callbackFn();
	// 				}, null, null, null);
    //
	// 			}
	// 		}
	// 	});
	// }


});