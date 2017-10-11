Ext.define('Module.Operate.activityAccess.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Operate.activityAccess.Tools'
	],

	getActivteyDataFunction:function(){
		var url = '/api/admin/access/activity/';
		var scopeCodeData = Soul.Ajax.getSyncData(url, null);
		return scopeCodeData;
	},

	doAddActivityAccessFunction : function(callbackFun) {

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
				Module.Operate.activityAccess.Tools.getActivityAccessPagesCombo(null),
				Module.Operate.activityAccess.Tools.getAcctivityCombo(null),
				Module.Operate.activityAccess.Tools.getActivityAccessStatusCombo('1')
			]
			}]
		});

		var win = null;
		win = new Ext.Window({
			title: ACTIVITYACCESS_LABEL.addActivityAccess,
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
			
					var importUrl="/api/admin/activityAccess/";				
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


	
	doChangeActivityAccessIsopenFunc : function(records,isopen,callbackFn){	
		
		  if(records.length==0){
			   Ext.Msg.alert('请选中需要修改的活动！');
			   return false;
		   }   
		   for(var i=0;i<records.length;i++) {
			  var params =  records[i].data;
			      params.isopen=isopen;
			      var url ="/api/admin/activityAccess/"+params.id;
			      Soul.Ajax.restAction(url, "put",null,  Ext.encode(params), function(ret){
				 callbackFn();
				}, null, null, null);
		   }	
	},
	doDelActivityAccessFunc : function(records,callbackFn){			
		  if(records.length==0){
			   Ext.Msg.alert('请选中需要删除的活动！');
			   return false;
		   }   
		  
		  Ext.Msg.confirm('', Ext.String.format('确定要删除选中的[{0}]条活动?', records.length), function(button, text) {
  			if (button == "yes") {
  			   for(var i=0;i<records.length;i++) {
  				  var params =  records[i].data;
  				      var url ="/api/admin/activityAccess/"+params.id;
  				      Soul.Ajax.restAction(url, "DELETE",null,  Ext.encode(params), function(ret){
  					 callbackFn();
  					}, null, null, null);
  			   }	
  				
  				
  			}
  		});
		  
		  
		
	}

});