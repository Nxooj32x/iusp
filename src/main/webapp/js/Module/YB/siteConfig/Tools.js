Ext.define('Module.YB.siteConfig.Tools', {
	singleton: true, 
	
	requires  : [
	],
	
	buildParamOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'paramoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: "增加配置",
					disabled:false,
					name : 'addparam',
					iconCls : 'x-add-icon'
				},{
					text: "修改配置",
					disabled:false,
					name : 'editparam',
					iconCls : 'extensive-edit'
				},{
					text: "删除配置",
					disabled:false,
					name : 'delparam',
					iconCls : 'x-del-icon'
				}]
	    });
		return menu;
    },
	
	constructor : function() {
        this.callParent(arguments);
    }
	
});
