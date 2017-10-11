Ext.define('Module.Platform.CI.view.SOSearchTab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.sosearchtab',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching'
    ],

    initComponent: function () {
		var me = this;
		console.log(1);
    	var grid = Ext.create('Module.Platform.CI.view.SOGrid', {
    		width : 800,
    		height : 600,
    		title : "服务商",
    		customerInfo : me.customerInfo,
    	    initFilter : [{
    	    	relationOp : 'and',
    	    	attr : 'ciId',
    	    	logicalOp : 'is null',
    	    	value : 1
    	    }],
    	    listeners : {
    	    	beforeactivate : function( pl, eOpts ) {
    	    		console.log(1);
    	    	}
    		}
    	
    	});
    	console.log(2);
    	var grid1 = Ext.create('Module.Platform.CI.view.ShopGrid', {
    		width : 800,
    		height : 600,
    		title : "店铺",
    		customerInfo : me.customerInfo,
    	    initFilter : [{
    	    	relationOp : 'and',
    	    	attr : 'status',
    	    	logicalOp : '=',
    	    	value : 'inuse'
    	    }],
    	    listeners : {
		    	beforeactivate : function( pl, eOpts ) {
		    		console.log(2);
		    	}
			}
    	});
    	console.log(3);
        Ext.apply(this, {
        	width : 800,
        	height : 600,
        	activeTab : 0,
            items: [
                    grid, grid1
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