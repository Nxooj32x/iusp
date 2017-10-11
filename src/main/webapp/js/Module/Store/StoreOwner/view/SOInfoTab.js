Ext.define('Module.Store.StoreOwner.view.SOInfoTab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.soinfotab',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
    ],

    storeOwner : null,

    initComponent: function () {
		var me = this;
    	var grid = Ext.create('Module.Store.StoreOwner.view.ShopGrid', {
    		title : "",
    		storeOwner : me.storeOwner,
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