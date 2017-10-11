Ext.define('Module.Store.distributor.Operation', {
	singleton: true,

	requires: [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView',
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Store.distributor.Tools',
		'Module.Store.distributor.store.DistributorStore'
	],

	getOperationForStore:function(store){
		store.httpParams = new Object();
		store.httpMethod = new Object();
		store.requestBody = new Object();
		store.methodConfirm = new Object();
	},

	doAdd : function(callback){
		var win = null;
		var pal = Ext.create('Module.Store.distributor.view.UserGrid', {
			addCallback : function(){
				win.close();
				if (typeof callback == "function")
					callback();
			}
		});
	

		win = Ext.create('Ext.window.Window', {
			title: '选择渠道商用户',
		    bodyPadding: 5,
		    width: 600,
		    // 表单域 Fields 将被竖直排列, 占满整个宽度
		    layout: 'anchor',
		    defaults: {
		        anchor: '100%'
		    },
		    // The fields
		    defaultType: 'textfield',
		    items:pal
		  
		});
		win.show();
	},


	doModifyStatus : function(dr, status, callback){
		Soul.Ajax.request({
			url : '/storeapi/distributor/' + dr.id + '/status',
			method : 'put',
			params : {
				status : status
			},
			loadMask : true,
			loadMsg : '修改状态',
			successMsg : '成功',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},
});