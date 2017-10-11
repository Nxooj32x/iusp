Ext.define('Module.Template.bookTemplate.view.BtplInfoPanel', {
	extend : 'Ext.form.Panel',
	alias : 'widget.btplinfopanel',

	uses : 'Ext.data.Store',

	requires : [  'Ext.dd.*', 'Module.Template.bookTemplate.Operation'  ],

	btpl : {},
	
	height : 120,
	
	frame : true,
	
	layout: {
        type: 'table',
        columns: 3
    },
	
	bodyPadding: 5,
	
	defaultType: 'textfield',
	
	buttonAlign : 'right',
	
	defaults : {
		margin : '0 10 5 0',
		labelWidth : 80
	},
	
	initComponent : function() {
		var me = this;
		var dict = Module.Template.bookTemplate.Data;
		me.title =  me.btpl.name;
		
		me.items = [{
			fieldLabel : '名称',
			name : 'name',
			allowBlank : false,
			regex : /^[^\s]*$/,
			regexText : '不能包含空格'
		}, {
			fieldLabel : '模板类型',
			xtype : 'combo',
			name : 'tplType',
			queryMode : 'local',
			disabled : true,
			store : dict.typeCombo,
			editable : false,
			allowBlank : false,
			triggerAction : 'all'
		}, {
			fieldLabel : '状态',
			xtype : 'combo',
			name : 'status',
			queryMode : 'local',
			store : dict.statusCombo,
			editable : false,
			allowBlank : false,
			triggerAction : 'all'
		}, {
			fieldLabel : '描述',
			name : 'desc',
			regex : /^[^\s]*$/,
			regexText : '不能包含空格'
		}, {
			fieldLabel : '风格',
			name : 'style',
			regex : /^[^\s]*$/,
			regexText : '不能包含空格'
		}];
		
		me.buttons = [{
			text : '其他',
			handler : function(){
				me.up('btplportlet').gotoView("Module.Template.bookTemplate.view.Grid", {}, me.up('btplportlet'));
			}
		}, {
			text : '编辑书页',
			handler : function(){
				window.open("/book/" + me.btpl.id + "/space");
			}
		}, {
			text : "确定",
			handler : function(btn){
				var form = btn.up('form').getForm();
				if (!form.isValid())
					return;
				var values = form.getValues();
				
				var btpl = me.btpl;
				btpl.name = values.name;
				btpl.desc = values.desc;
				btpl.style = values.style;
				btpl.labels = values.labels;
				btpl.status = values.status;
				
				Soul.Ajax.request({
					url : '/book/tpl/' + me.btpl.id,
					method : 'put',
					jsonData : btpl,
					loadMask : true,
					loadMsg : '修改中'
				});
			}
		}];
		
		me.callParent(arguments);
	},
    
    afterRender : function() {
    	var me = this;
		me.callParent(arguments);
		me.getForm().setValues(this.btpl);
		
	}
});
