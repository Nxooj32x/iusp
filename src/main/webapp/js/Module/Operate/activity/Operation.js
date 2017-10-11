Ext.define('Module.Operate.activity.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Operate.activity.Tools'
	],

	doAddActivityFunction : function(callbackFun) {
		Ext.apply(Ext.form.VTypes, {
			dateValue: function (value, field) {
				var start = field.up('form').down('field[name=beginTime]');
				var end = field.up('form').down('field[name=endTime]');

				if(start == null || end == null){
					return true;
				}

				if(start.getValue() > end.getValue()){
					return false;
				}else{
					return true;
				}
			}
		});

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
				items:[{
					name: 'name',
					fieldLabel: ACTIVITY_LABEL.name,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					blankText: ACTIVITY_LABEL.name
				},{
					name: 'code',
					fieldLabel: ACTIVITY_LABEL.code,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					blankText: ACTIVITY_LABEL.code
				},
				Module.Operate.activity.Tools.getActivityStatusCombo('add', 'proceed'),
				{	
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'browseNub',
					fieldLabel: ACTIVITY_LABEL.browseNub,
					allowBlank: false,
					blankText: ACTIVITY_LABEL.browseNub
				},{
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'joinNub',
					fieldLabel: ACTIVITY_LABEL.joinNub,
					allowBlank: false,
					blankText: ACTIVITY_LABEL.joinNub,
				},{
					xtype: 'datefield',
					name: 'beginTime',
					format: 'Y-m-d H:i:s',
					minValue: new Date(),
					editable: false,
					allowBlank: false,
					disabled: false,
					fieldLabel: ACTIVITY_LABEL.beginTime,
					vtype: 'dateValue',
					vtypeText: '开始时间不能大于截至时间！',
					listeners: {
						change: function(field){
							var end = field.up('form').down('field[name=endTime]');
							if(end == null) return;
							end.validate();
						}
					}
				},{
					xtype: 'datefield',
					name: 'endTime',
					format: 'Y-m-d H:i:s',
					editable: false,
					allowBlank: false,
					disabled: false,
					fieldLabel: ACTIVITY_LABEL.endTime,
					vtype: 'dateValue',
					vtypeText: '截至时间不能小于开始时间！',
					listeners: {
						change: function(field){
							var start = field.up('form').down('field[name=beginTime]');
							if(start == null) return;
							start.validate();
						},
						select: function(field, value){
							var time = Ext.Date.add(value, Ext.Date.HOUR, 23);
							time = Ext.Date.add(time, Ext.Date.MINUTE, 59);
							time = Ext.Date.add(time, Ext.Date.SECOND, 59);
							field.setValue(time);
						}
					}
				}]
			},{
				xtype: 'container',
				columnWidth : .50,
				autoHeight : true,
				defaults: {
					xtype: 'textfield',
					labelAlign: 'right',
					width: 250
				},
				items:[{
					name: 'banner',
					id: 'banner',
	                xtype: 'filefield' ,
	                fieldLabel: ACTIVITY_LABEL.banner,
	                buttonText: '选择zip压缩文件',
	                submitValue: true,
					allowBlank: false,
				},{
					name: 'link',
					fieldLabel: ACTIVITY_LABEL.link,
					maxLength: 250,
					maxLengthText: '最多输入250个字符',
					allowBlank: false,
					blankText: ACTIVITY_LABEL.link
				},{
					xtype: 'textarea',
					name: 'describe',
					fieldLabel: ACTIVITY_LABEL.describe,
					readOnly: false,
					allowBlank: false,
					blankText: ACTIVITY_LABEL.describe
				}]
			}]
		});
		var win = null;
		win = new Ext.Window({
			title: ACTIVITY_LABEL.addActivity,
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
			
					var importUrl="/api/admin/activity/";				
					formpanel.submit({
						url: importUrl,
						method: 'POST',
						waitMsg: '正在创建活动请稍候...',
						success: function(fp, o) {
							callbackFn();
							win.close();
						},
						failure: function(fp, o) {
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

	doEditActivityFunction : function(data, callbackFun) {
		
		Ext.apply(Ext.form.VTypes, {
			dateValue: function (value, field) {
				var start = field.up('form').down('field[name=beginTime]');
				var end = field.up('form').down('field[name=endTime]');

				if(start == null || end == null){
					return true;
				}

				if(start.getValue() > end.getValue()){
					return false;
				}else{
					return true;
				}
			}
		});

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
				items:[{
					name: 'name',
					fieldLabel: ACTIVITY_LABEL.name,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					blankText: ACTIVITY_LABEL.name,
					value: data.name
				},{
					name: 'code',
					fieldLabel: ACTIVITY_LABEL.code,
					maxLength: 40,
					maxLengthText: '最多输入40个字符',
					allowBlank: false,
					value: data.code,
					blankText: ACTIVITY_LABEL.code
				},
				
				Module.Operate.activity.Tools.getActivityStatusCombo('edit', 'proceed'),
				{	
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'browseNub',
					fieldLabel: ACTIVITY_LABEL.browseNub,
					allowBlank: false,
					blankText: ACTIVITY_LABEL.browseNub,
					value: data.browseNub
				},{
					xtype: 'numberfield',
					allowDecimals: false,
					minValue: 1,
					step: 1,
					name: 'joinNub',
					fieldLabel: ACTIVITY_LABEL.joinNub,
					allowBlank: false,
					blankText: ACTIVITY_LABEL.joinNub,
					value: data.joinNub
				},{
					xtype: 'datefield',
					name: 'beginTime',
					format: 'Y-m-d H:i:s',
					editable: false,
					allowBlank: false,
					disabled: false,
					fieldLabel: ACTIVITY_LABEL.beginTime,
					vtype: 'dateValue',
					vtypeText: '开始时间不能大于截至时间！',
					value:  Module.Operate.activity.Renderer.translateCtime(data.beginTime),
					listeners: {
						change: function(field){
							var end = field.up('form').down('field[name=endTime]');
							if(end == null) return;
							end.validate();
						}
					}
				},{
					xtype: 'datefield',
					name: 'endTime',
					format: 'Y-m-d H:i:s',
					minValue: new Date(),
					editable: false,
					allowBlank: false,
					disabled: false,
					fieldLabel: ACTIVITY_LABEL.endTime,
					vtype: 'dateValue',
					vtypeText: '截至时间不能小于开始时间！',
					value: Module.Operate.activity.Renderer.translateCtime(data.endTime),
					listeners: {
						change: function(field){
							var start = field.up('form').down('field[name=beginTime]');
							if(start == null) return;
							start.validate();
						},
						select: function(field, value){
							var time = Ext.Date.add(value, Ext.Date.HOUR, 23);
							time = Ext.Date.add(time, Ext.Date.MINUTE, 59);
							time = Ext.Date.add(time, Ext.Date.SECOND, 59);
							field.setValue(time);
						}
					}
				}]
			},{
				xtype: 'container',
				columnWidth : .50,
				autoHeight : true,
				defaults: {
					xtype: 'textfield',
					labelAlign: 'right',
					width: 250
				},
				items:[{
					name: 'banner',
					id: 'banner',
	                xtype: 'filefield' ,
	                fieldLabel: ACTIVITY_LABEL.banner,
	                buttonText: '选择zip压缩文件',
	                submitValue: true,
					allowBlank: true,
					blankText: "为空默认不更新",
				},{
					
					name: 'link',
					fieldLabel: ACTIVITY_LABEL.link,
					maxLength: 250,
					maxLengthText: '最多输入250个字符',
					allowBlank: false,
					blankText: ACTIVITY_LABEL.link,
					value: data.link
				},{
					xtype: 'textarea',
					name: 'describe',
					fieldLabel: ACTIVITY_LABEL.describe,
					readOnly: false,
					allowBlank: false,
					blankText: ACTIVITY_LABEL.describe,
					value: data.describe
				}]
			}]
		});
		var win = null;
		win = new Ext.Window({
			title: ACTIVITY_LABEL.editActivity,
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

					var url="/api/admin/activity/"+data.id;			
					formpanel.submit({
						url: url,
						method: 'PUT',
						waitMsg: '正在更新活动请稍候...',
						success: function(fp, o) {						
							callbackFun();
							win.close();
						},
						failure: function(fp, o) {
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
	
	doChangeActivityStateFunc : function(records,state,callbackFn){	
		
		  if(records.length==0){
			   Ext.Msg.alert('请选中需要修改的活动！');
			   return false;
		   }   
		   for(var i=0;i<records.length;i++) {
			  var params =  records[i].data;
			      params.state=state;
			      var url ="/api/admin/activity/"+params.id;
			      Soul.Ajax.restAction(url, "put",null,  Ext.encode(params), function(ret){
				 callbackFn();
				}, null, null, null);
		   }	
	},

	doDelActivityStateFunc : function(records,callbackFn){			
		  if(records.length==0){
			   Ext.Msg.alert('请选中需要删除的活动！');
			   return false;
		   }   
		  
		  Ext.Msg.confirm('', Ext.String.format('确定要删除选中的[{0}]条活动?', records.length), function(button, text) {
  			if (button == "yes") {
  			   for(var i=0;i<records.length;i++) {   
  				  var params =  records[i].data;
  				  var url ="/api/admin/activity/"+params.id;
  				  var url_get ="/api/admin/activity/"+params.id+"/activityAccess/";
  				  var activityAccessLis = Soul.Ajax.getSyncData(url_get, null);
  				
  		        if(activityAccessLis.length>0)
                {	
  		           Ext.Msg.alert(Ext.String.format('活动 [{0}]中包含{1}条该推广入口，必须到活动配置中 ，先删除对应的推广入口', params.name,activityAccessLis.length));                	
                }else{
                	status
                	   Soul.Ajax.restAction(url, "DELETE",null,  Ext.encode(params), function(ret){
        					 callbackFn();
        					}, null, null, null);
                }       
  				      
  			   }	
  				
  			}
  		});
		  
		  
		
	}
});
