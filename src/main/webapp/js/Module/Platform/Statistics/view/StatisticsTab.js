Ext.define('Module.Platform.Statistics.view.StatisticsTab', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
    ],

    initComponent: function () {
		var me = this;
    	var grid = Ext.create('Module.Platform.Statistics.view.OrderGrid', {
//    		width : 800,
//    		height : 600,
    	    listeners : {
    	    	beforeactivate : function( pl, eOpts ) {
    	    		console.log(1);
    	    	}
    		}
    	
    	});
    	
    	var grid1 = Ext.create('Module.Platform.Statistics.view.ShopGrid', {
//    		width : 800,
//    		height : 600,
    	    listeners : {
		    	beforeactivate : function( pl, eOpts ) {
		    		console.log(2);
		    	}
			}
    	});
    	
    	var grid2 = Ext.create('Module.Platform.Statistics.view.SMBTRGrid', {
//    		width : 800,
//			height : 600,
		    listeners : {
		    	beforeactivate : function( pl, eOpts ) {
		    		console.log(2);
		    	}
			}
    	});
    	
    	var grid3 = Ext.create('Module.Platform.Statistics.view.CouponTRGrid', {
//    		width : 800,
//			height : 600,
		    listeners : {
		    	beforeactivate : function( pl, eOpts ) {
		    		console.log(2);
		    	}
			}
    	});

		var grid4 = Ext.create('Module.Platform.Statistics.view.NoRenewGrid', {
//    		width : 800,
//			height : 600,
			listeners : {
				beforeactivate : function( pl, eOpts ) {
					console.log(2);
				}
			}
		});

        Ext.apply(this, {
        	width : 800,
        	height : 600,
        	activeTab : 0,
            items: [
                    grid,grid1,grid2,grid3,grid4
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