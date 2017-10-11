Ext.define('Module.Store.StoreShop.Operation', {
	singleton: true,
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Store.StoreShop.Tools'
	],

	doDelStoreShopFunction:function(records, callbackFun){
		var params = records[0].data;
		var url = "/storeapi/shop/"+params.id+"/status/delete";
		Soul.Ajax.restAction(url, "put", null, null, function (ret) {
			callbackFun();
		}, null, null, null);
	},

	doChangeStoreShopStateFunction :function(records,status, callbackFun){
		var params = records[0].data;
		var url = "/storeapi/shop/"+params.id+"/status/"+status;

		Soul.Ajax.restAction(url, "put", null, null, function (ret) {
			callbackFun();
		}, null, null, null);
	},

	doRecoverShopFunction : function(records, callbackFun){
		var shop = records[0].data;
		var url = "/storeapi/shop/"+shop.id;

		Soul.Ajax.request({
			url: url,
			headers: {
				Accept: 'application/json'
			},
			method: 'PUT',
			loadMask: true,
			loadMsg: '服务站点启用中..',
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
	},
	
	doShowShopDetialFuncion:function(storeShop,callbackFun){
		var shopDetailPanel = Ext.create('Module.Store.StoreShop.view.ShopDetailPanel', {
			storeShop : storeShop,
		});
		new Ext.Window({
			title: storeShop.name + "详情",
			items: shopDetailPanel,
			width: 1020,
			height: 600,
			layout: 'fit',
			autoDestroy: true,
			modal: true,
		}).show();
	
	}




});