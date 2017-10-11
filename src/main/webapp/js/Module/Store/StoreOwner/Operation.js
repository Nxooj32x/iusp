Ext.define('Module.Store.StoreOwner.Operation', {
	singleton: true,

	requires: [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView',
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Store.StoreOwner.Tools',
		'Module.Store.StoreOwner.store.StoreOwnerStore'
	],

	doSoCiBinding : function(soId, ciId, callback){

		Soul.Ajax.request({
			url : '/storeapi/server/' + soId + '/ciId',
			method : 'put',
			jsonData  : ciId,
			loadMask : true,
			loadMsg : '服务商-客户信息绑定',
			successMsg : '成功',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},

	doShowShopDetialFuncion:function(data,callbackFun){

		var storeShopGrid = Ext.create('Module.Store.StoreOwner.view.ShopGrid', {
			storeOwner : data,
			onDetailClick : function(view ,rowIndex, colIndex, item, e, record, row){
				var shopDetailPanel = Ext.create('Module.Store.StoreShop.view.ShopDetailPanel', {
					storeShop : record.data,
				});
				new Ext.Window({
					title: record.data.name + "详情",
					items: shopDetailPanel,
					width: 1020,
					height: 600,
					layout: 'fit',
					autoDestroy: true,
					modal: true,
				}).show();
			},
			listeners : {
	        	itemclick : function( grid, record, item, index, e, eOpts ){
	        	}
	        }
		});
		var winTitle = Ext.String.format(STORE_LABEL.storeShopDetialTitle, data.contacts);
		var win = new Ext.Window({
			title: winTitle,
			items: storeShopGrid,
			width: 600,
			height: 400,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		});
		win.show();

	}

});