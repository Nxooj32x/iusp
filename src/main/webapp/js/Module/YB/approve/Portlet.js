Ext.define('Module.YB.approve.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [//需要的类列表（数组）    实例化类之前必须加载的类列表
		'Module.YB.approve.Operation',
		'Module.YB.approve.Data',
		'Module.YB.approve.store.OrderStore'
 	],
 		
 	VIEW : {
		'Module.YB.approve.view.Grid' : LABEL.grid,
		'Module.YB.approve.view.DataView' :LABEL.dataView
	},
    
	title: "订单管理",//logo下面的table表头
			
	iconCls : 'md-role',
	
	moduleName : 'Module.YB.approve',
    
    moduleSessionView : 'Module.YB.approveCurrentView',
    
    dataObj : Module.YB.approve.Data,
    
    configObj : Module.YB.approve.Config,
	
    defaultView : 'Module.YB.approve.view.Grid',
	
    supportView :['Module.YB.approve.view.Grid',
                  'Module.YB.approve.view.DataView'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
	
	buildOrderOptMenu : function(){//加载菜单----用户操作的相关菜单：增删改
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'orderoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
            items : [{
				iconCls : 'switch',
				name:'approval',
				tooltip: ORDER_BUTTON.approval,
				text :  YB_APPROVE_LABEL.approval,
				disabled:true
			}
         ]
	    });
		return menu;
    },
     		//初始化主菜单callParent为重写父类方法
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			roleMenu = {
	            text: "操作",
	            iconCls: 'pool_setting',  
	            menu: this.buildOrderOptMenu()//指定子类自己的方法，并进行渲染
	        };
		toolbar.push(roleMenu);
		return toolbar;
    }
});




