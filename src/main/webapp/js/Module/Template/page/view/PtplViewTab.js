Ext.define('Module.Template.page.view.PtplViewTab', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.ptplviewtab',

	uses : 'Ext.data.Store',

	requires : ['Soul.view.AdvanceSearchView',"Module.Template.page.store.PtplStore", "Module.Template.page.Tools"],

	pageTpl : {},
	
	width : "100%",
	title : '预览模板',
	iconCls : 'view',
	flex: 1,
	showP : 'left',
	edit : false,
	hiddenPropShow : false,
	showDefault : false,

	initComponent : function() {
		var me = this;
		var rand = Math.random() * 1000;
		
	   this.dockedItems = [{
        	 xtype: 'toolbar',
             dock: 'top',
             items: [ {
            	 text : '查看属性',
            	 iconCls : 'view',
            	 hidden : me.hiddenPropShow,
            	 handler : function(){
            		 Module.Template.page.Tools.showTemplateInEast(me.pageTpl);
            	 }
             }, "-",  {
            	 fieldLabel : '显示测试内容',
            	 labelWidth : 70,
            	 xtype: 'checkbox',
            	 checked : me.showDefault,
            	 handler : function(cb, checked){
            		 me.showDefault = checked;
            		 me.getActiveTab().fireEvent('activate');
            	 }
             },  "-",{
                 xtype : 'radiogroup',
                 fieldLabel: '选择页面位置',
                 columns: 3,
                 items: [
                   { boxLabel: '左页', name: "showP" + rand, inputValue: 'left' , width : 50, checked: true},
                   { boxLabel: '右页', name: "showP" + rand, inputValue: 'right', width : 50},
                   { boxLabel: '双页', name: "showP" + rand, inputValue: 'double', width : 50}
                 ],
                 listeners : {
                	 change : function(rg, nv, ov, eOpts){
                		 me.showP = nv["showP" + rand];
                		 me.getActiveTab().fireEvent('activate');
                	 }
                 }
             }, '->', {
            	 text : '编辑模板资源',
            	 icon : '/img/icon/fileoperation.png',
            	 handler : function(cb, checked){
            		 var showP = me.showP;
            		 if (showP === "double")
            			 showP = "right";
            		 window.open("/pageTpl/edit/?pageId="+me.pageTpl.id );
            	 }
             }]
        }];
		
		this.items = [{
	        title: '预览模式',
	        tabConfig: {
	        	icon : '/img/icon/computer.png',
	            tooltip: '预览时，显示此页面'
	        },
	        itemId: 'tiny',
	        html: '<iframe name="ptplTinyView' + rand + '" id="ptplTinyView' + rand + '" frameborder="0" width="100%" height="100%">请选择模板</iframe>',
	        listeners : {
	        	activate : function(p){
	        		if (me.pageTpl.id) {
		        		var tvSrc = "/pageTpl/" + me.pageTpl.id + "/view/tiny/" + me.showP + "?showDefault=" +  me.showDefault;
		        		var tv = Ext.get("ptplTinyView" + rand);
		        		if (tv)
		        			tv.dom.src = tvSrc;
	        		}
	        	}
	        }
	        }, {
	        title: '编辑模式',
	        itemId: 'small',
	        tabConfig: {
	        	icon : '/img/icon/fileoperation.png',
	            tooltip: '用户在编辑时，显示此页面'
	        },
	        dockedItems : [{
	        	 xtype: 'toolbar',
	             dock: 'left',
	             hidden : true,
	             items: [{
	            	 xtype : 'checkbox',
	            	 boxLabel  : '开启编辑',
	                 checked   : false,
	                 handler : function(cb, checked){
	                 }
	             }]
	        }],
	        html: '<iframe id="ptplSmallView' + rand + '" frameborder="0" width="100%" height="100%"></iframe>',
	        listeners : {
	        	activate : function(p){
	        		if (me.pageTpl.id) {
	        			svSrc = "/pageTpl/" + me.pageTpl.id + "/view/small/" + me.showP + "?showDefault=" +  me.showDefault;;
		        		var sv = Ext.get("ptplSmallView" + rand);
		        		if (sv)
		        			sv.dom.src = svSrc;
	        		}
	        	}
	        }
	    }, {
	        title: '打印模式',
	        itemId: 'big',
	        tabConfig: {
	        	icon : '/img/icon/download.png',
	            tooltip: '用户不会看到此页面，如果用户需要打印，则打印页面为此状态'
	        },
	        html: '<iframe id="ptplBigView' + rand + '" frameborder="0" width="100%" height="100%"></iframe>',
	        listeners : {
	        	activate : function(p){
	        		if (me.pageTpl.id) {
		        		var bvSrc ="/pageTpl/" + me.pageTpl.id + "/view/big/" + me.showP + "?showDefault=" +  me.showDefault;
		        		var bv = Ext.get("ptplBigView" + rand);
		        		if (bv)
		        			bv.dom.src = bvSrc;
	        		}
	        	}
	        }
	    }];
		this.callParent(arguments);
	},

	afterRender : function() {
		var me = this;
		me.callParent(arguments);
	}
});
