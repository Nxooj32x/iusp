Ext.define('Module.Platform.CI.view.AddContactlLogPanel', {
	extend : 'Ext.form.Panel',
alias: 'widget.addclview',

	uses : 'Ext.data.Store',

	requires : [  'Ext.dd.*', 'Soul.ux.form.DateTimeField'],

	customerInfo: {},
	
	//height : 120,
	
	frame : true,
	
	layout: {
        type: 'table',
        columns:4
    },
	
	bodyPadding: 5,
	
	defaultType: 'textfield',
	
	buttonAlign : 'right',
	
	autoScroll : true,
	
	defaults : {
		margin : '0 10 5 0',
		labelWidth : 80
	},
	
	initComponent : function() {
		var me = this;
		var dict = Module.Platform.CI.Data;
		me.title =  me.customerInfo.name;
		me.items = [{
			fieldLabel : '',
			hidden : true,
			name : 'id',
			editable : false
		}, {
			fieldLabel : '',
			hidden : true,
			name : 'ciId',
			editable : false
		}, {
			fieldLabel : '沟通方式',
			xtype : 'combo',
			name : 'contactWay',
			queryMode : 'local',
			store : dict.contactWayCombo,
			editable : false,
			allowBlank : false,
			triggerAction : 'all',
			listeners : {
				select : function( combo, records, eOpts ){
					var num = "";
					if (records.length > 0 ) {
						var data = records[0].data;
						console.log(data);
						num = me.customerInfo[data.field1]
					}
					combo.up('form').down('[name=contactNum]').setValue(num);
				}
			}
		}, {
			fieldLabel : '沟通号码',
			name : 'contactNum',
			allowBlank : false,
			regex : /^[^\s]*$/,
			regexText : '不能包含空格'
		}, {
			fieldLabel : '沟通时间',
			xtype : 'datetimefield',
			name : 'contactTime',
			format : 'Y-m-d',
			colspan: 2,
			width : 300,
			allowBlank : false
		}, {
			fieldLabel : '沟通内容',
			name : 'contactContent',
			allowBlank : false,
		    colspan: 4,
		    height : 500,
		    width : "100%",
			xtype : 'htmleditor',
			enableColors : false,
			enableAlignments : false,
			enableFont  : false,
			enableFontSize : false,
			enableFormat  : false,
			enableLinks : false,
			enableLists : false,
			enableSourceEdit : false,
			regexText : '不能包含空格',
			plugins: new Ext.ux.form.HtmlEditor.PasteImage(),
			listeners : {
				change : function( he, newValue, oldValue, eOpts ){
					var listV = he.up('cleditview').down('clgrid');
					listV.collapse();
				}
		    }
			
		}, {
			fieldLabel : '客户回复',
			name : 'customerFeedback',
			xtype : 'textareafield',
			regexText : '不能包含空格'
		}, {
			fieldLabel : '备注',
			name : 'remarks',
			xtype : 'textareafield',
			regexText : '不能包含空格'
		}];
		me.buttons = [{
			text : '返回客户信息列表',
			handler : function(){
				me.up('ciportlet').gotoView("Module.Platform.CI.view.Grid", {}, me.up('ciportlet'));
			}
		}, {
			text : "添加记录",
			handler : function(btn){
				var form = btn.up('form').getForm();
				if (!form.isValid())
					return;
				var values = form.getValues();
				values.contactTime = values.contactTime.substring(0, values.contactTime.indexOf(' ')) + "T" + values.contactTime.substring(values.contactTime.indexOf(' ') + 1) + ".000+0800";
				delete values.id 
				Soul.Ajax.request({
					url : '/platformapi/ci/' + me.customerInfo.id + '/contactLog/',
					method : 'post',
					jsonData  : values,
					loadMask : true,
					loadMsg : '新建沟通记录',
					successMsg : '成功',
					success : function(response, opts) {
						if (typeof callback === 'function')
							callback();
						var listV = me.up('cleditview').down('clgrid');
						listV.expand();
						var store = listV.getStore();
						store.reload();
						form.reset();
						
					}
				});
				

			}
		}, {
			text : "修改记录",
			handler : function(btn){
				var form = btn.up('form').getForm();
				if (!form.isValid())
					return;
				var values = form.getValues();
				if (values.id == null || values.id == "") {
					Soul.util.MessageUtil.showErrorInfo("", "请点击要修改的沟通记录");
					return;
				}
				values.contactTime = values.contactTime.substring(0, values.contactTime.indexOf(' ')) + "T" + values.contactTime.substring(values.contactTime.indexOf(' ') + 1) + ".000+0800";
				Soul.Ajax.request({
					url : '/platformapi/ci/' + me.customerInfo.id + '/contactLog/' + values.id,
					method : 'put',
					jsonData  : values,
					loadMask : true,
					loadMsg : '修改沟通记录',
					successMsg : '成功',
					success : function(response, opts) {
						if (typeof callback === 'function')
							callback();
						var listV = me.up('cleditview').down('clgrid');
						listV.expand();
						var store = listV.getStore();
						store.reload();
						form.reset();
					}
				});
			}
		}];
		me.callParent(arguments);
	},
    
    afterRender : function() {
    	var me = this;
		me.callParent(arguments);
		//me.getForm().setValues(this.btpl);
		
	}
});
