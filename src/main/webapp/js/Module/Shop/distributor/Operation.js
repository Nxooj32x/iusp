Ext.define('Module.Shop.distributor.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Shop.distributor.store.ShopStore',
		'Module.YB.order.store.OrderStore',
		'Module.Shop.distributor.model.ShopModel',
		'Module.Shop.distributor.Renderer'
	],
	
	doChangeDistributorStateFunc : function(records,state,callbackFn){	
		
		  if(records.length==0){
			   Ext.Msg.alert('请选中需要修改的分销商！');
			   return false;
		   }   
		   for(var i=0;i<records.length;i++) {
			  var params =  records[i].data;
			      params.state=state;
			  Soul.Ajax.restAction("/api/admin/shop/", "put",null,  Ext.encode(params), function(ret){
					callbackFn();
				}, null, null, null);
		   }	
	},

	doviewOrderFunction: function(record, callbackFn) {
		var menu = Module.Shop.distributor.Tools.buildOptMenu();
        var initToolbar = function(){
        	var toolbar = new Array();
			itemMenu = {
				text: SHOP_MANAGE_LABEL.shopOperation,
            	iconCls: 'pool_setting',
	           	menu: menu
	       	};
			toolbar.push(itemMenu);
			return toolbar;
		};

		var orderStore = Ext.data.StoreManager.lookup("Module.YB.order.store.OrderStore");

		orderStore.proxy.api.read = '/api/admin/'+ record.data.id +'/order/';

		var orderGrid = Ext.create('Module.Shop.distributor.view.ShopOrderGrid',{
       		id : 'itemGrid',
       		anchor : '100% 100%',
       		store : orderStore,
       		dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				items: initToolbar()
           	}],

        });

        var win = new Ext.Window({
			title: SHOP_MANAGE_LABEL.orderGrid,
			items: orderGrid,
			width: 1000,
			height: 500,
			layout: 'fit',
			autoDestroy: true,
			modal: true
		});
		win.show();
	}
});