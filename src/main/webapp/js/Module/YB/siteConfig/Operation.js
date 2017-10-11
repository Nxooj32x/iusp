
Ext.define('Module.YB.siteConfig.Operation', {
	singleton: true,
	
	requires  : [
	     		'Module.YB.siteConfig.Tools'
	     	],
	
	doEditParamFunction : function(record, store) {
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'key',
				fieldLabel: "页面SEO配置",
				value: record.data.key,
				xtype: 'displayfield',
				submitValue: true,
			},{
				name: 'value',
				fieldLabel: "值",
				value: record.data.value,
			}]
		});

		var win = new Ext.Window({
			title: "编辑参数 ",
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.save,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

					var paramConfig = {};
					paramConfig['key'] = params['key'];
					paramConfig['value'] = params['value'];
					Soul.Ajax.restAction('/globalconfig/seo/yearbook', 
						'put', paramConfig, paramConfig, function(ret){
							var idx = store.indexOf(record);
							store.remove(store.getAt(idx));
							store.insert(idx, params);
							formpanel.up('window').close();
						}, null, null);
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					formpanel.up('window').close();
				}
			}]
		});

		win.show();
	},

	doAddParamFunction : function(store) {
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'key',
				fieldLabel: "页面SEO配置"
			},{
				name: 'value',
				fieldLabel: "值"
			}]
		});

		var win = new Ext.Window({
			title: "增加参数 ",
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.save,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

					var paramConfig = {};
					paramConfig['key'] = params['key'];
					paramConfig['value'] = params['value'];
					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/globalconfig/seo/yearbook', 
						'put', paramConfig, paramConfig, function(ret){
							var idx = store.getCount();
							for (var i = 0; i < idx; i++) {
								if (store.getAt(i).get('key') == params['key']) {
									Ext.Msg.alert(Ext.String.format("参数 [{0}]已存在, 不可重复添加!", params['key']));
									return;
								}
							}
							store.insert(idx, params);
							formpanel.up('window').close();
						}, null, null);
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					formpanel.up('window').close();
				}
			}]
		});

		win.show();
	},

	doDelParamFunction : function(record, store) {
		var paramConfig = {};
		paramConfig['key'] = record.data.key;
		paramConfig['value'] = record.data.value;

		Ext.Msg.confirm('', Ext.String.format('确定要删除参数: [{0}]?', record.data.key), function(button, text) {
			if (button == "yes") {
				Soul.Ajax.restAction('/globalconfig/seo/yearbook', 
						'delete', paramConfig, paramConfig, function(ret){
					var idx = store.indexOf(record);
					store.remove(store.getAt(idx));
				}, null, null);
			}
		});
	},
});
