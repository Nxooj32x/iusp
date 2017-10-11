Ext.define('Module.YB.message.Operation', {
	singleton : true,
	requires : [],

	//增加消息
	showUsersFunc : function(records, callbackFn) {
		
		var addAction = Ext.create("Ext.Button", {
			text: '新增消息',
			name: 'addMessageButton',
			iconCls: 'x-add-icon',
			disabled: false
		});
		
		var userInfoGrid = Ext.create('Module.YB.message.view.UserInfoGrid',{
			anchor : '100% 100%',
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: [addAction]
			}]
		});
		
		if(records.length > 0) {
			var userIds = [];
			Ext.each(records, function(r, i, rs){
				userIds.push(r.data.toUserId);
			});
			//设置相关的 store api
	        var store = Ext.data.StoreManager.lookup("Module.YB.message.store.UserStore");
	       //	store.proxy.extraParams = {
	       	//		userIds :  userIds}
	       	//};
	       	store.proxy.api = {
	       		read: '/admin/user/?userIds=' + userIds
	       	};
		}

		var win = new Ext.Window({
			id:'add_message_to_user_show_users',
			title: MESSAGE_LABEL.selectUser,
			items: userInfoGrid,
			width: 420,
			height: 550,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.show();
	},
	
	//增加消息 messageType:0为选中消息回复消息，1为发送全员消息，2为通过选择用户发送消息
	doAddMessageFunction : function(records, messageType, callbackFn) {
		
			var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 280,
			frame: true,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 250
			},
			items:[{
					name: 'subject',
					fieldLabel: MESSAGE_PROPERTY.subject,
					maxLength: 100,
					maxLengthText: '最多输入100个字符',
					allowBlank: false,
					emptyText: MESSAGE_PROPERTY.subject,
					blankText: '不可为空'
				},{
					xtype: 'textareafield', 
					name: 'content',
					fieldLabel: MESSAGE_PROPERTY.content,
					maxLength: 500,
					maxLengthText: '最多输入500个字符',
					allowBlank: false,
					emptyText: MESSAGE_PROPERTY.content,
					blankText: '不可为空'
				},{
					xtype: 'combo', 
					fieldLabel : MESSAGE_PROPERTY.type,  
					name : 'type',  
					store : new Ext.data.SimpleStore({  
						fields : ['key', 'value'],  
						data : [['1', '系统消息']] 
					}),
					displayField : 'value',  
					valueField : 'key',  
					mode : 'local',  
					typeAhead : true,  
					forceSelection : true,  
					triggerAction : 'all',  
					value: '1',
					selectOnFocus : true  
				}]
		});

		var win = null;
		win = new Ext.Window({
			id:'add_system_to_user_message',
			title: MESSAGE_LABEL.addMessage,
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
					var messageForm = formpanel.getForm();
					var users = [];
					if(records != null && records.length > 0) {
						if(0 == messageType) {
							var userIds = {};
							Ext.each(records, function(r, i, rs){
								if('undefined' == typeof(userIds[r.data.toUserId])) {
									userIds[r.data.toUserId] = r.data.toUserName;
									var userInfo = {
											id:r.data.toUserId,
											fullName:r.data.toUserName
									};
									users.push(userInfo);
								}
							});
						} else if(2 == messageType) {
							Ext.each(records, function(r, i, rs){
								users.push(r.data);
							});
						}
					}
					var messageParams = {
							subject:messageForm.findField('subject').getValue(),
							content:messageForm.findField('content').getValue(),
							type:messageForm.findField('type').getValue(),
							users:users,
							messageType:messageType
						};
					
					var url = '/api/admin/message';
					Soul.Ajax.restAction(url, 'post', messageParams, messageParams, callbackFn, null, null);
					if (win != null) {
						win.close();
						win = null;
					}
					Ext.getCmp('add_message_to_user_show_users').close();
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					if (win != null) {
						win.close();
						win = null;
					}
				}
			}]
		});

		win.show();
	}
});