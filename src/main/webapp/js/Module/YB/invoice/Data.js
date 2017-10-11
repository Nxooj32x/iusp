Ext.define('Module.YB.invoice.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getInvoiceById : function(id){
   	//装载相关数据，此类相当于model----通过id来获取一个注册的Store
   		var store = Ext.data.StoreManager.lookup("Module.YB.invoice.store.InvoiceStore"); 
   		var rs = store.data.items;
   		var invoice = null;
   		Ext.each(rs, function(r, i, s){
   			if (r.data.id == id) {
   				invoice = r.data;
   				return false;
   			}
   		});
   		return invoice;
   	},

   	loadData : function(){
   		return;
   	},

   	updateAll : function(fn){
    	var callbackFn = function(){
    		Soul.Ajax.executeFnAfterLoad(fn);
    	};
    	callbackFn();
    },

	constructor : function() {
        this.callParent(arguments);
  }
});