Ext.define('Module.Shop.distributor.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],
    
    buildOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'epm',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: []
	    });
		return menu;
    },
     	
	constructor : function() {
        this.callParent(arguments);
    }
});