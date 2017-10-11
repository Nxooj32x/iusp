Ext.define('Module.Store.StoreShop.view.ShopInfoTab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.shopinfotab',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching'
    ],

    storeShop : null,

    initComponent: function () {
		var me = this;
    	var grid = Ext.create('Module.Store.StoreShop.view.ShopOrderGrid', {
    		title : "订单统计",
	    	initFilter : [{
		    	relationOp : 'and',
		    	attr : 'shopId',
		    	logicalOp : '=',
		    	value : me.storeShop.id
		    }],
	    	storeShop : me.storeShop,
    	    listeners : {
    	    	beforeactivate : function( pl, eOpts ) {
    	    		console.log(1);
    	    	}
    		}
    	
    	});
        Ext.apply(this, {
//        	width : 800,
//        	height : 600,
        	activeTab : 0,
            items: [
                    grid
               ] ,
            listeners : {
	        	tabchange : function(){
	            	console.log("tabchange")
	            }
        	}
        });
        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    }

});