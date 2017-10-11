Ext.define('Module.YB.approve.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getOrderById : function(id){
   	//装载相关数据，此类相当于model----通过id来获取一个注册的Store
   		var store = Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore"); 
   		var rs = store.data.items;
   		var order = null;
   		Ext.each(rs, function(r, i, s){
   			if (r.data.id == id) {
   				order = r.data;
   				return false;
   			}
   		});
   		return order;
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
