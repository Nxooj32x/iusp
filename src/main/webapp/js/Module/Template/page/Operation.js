Ext.define('Module.Template.page.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox'
	],
	
	onBatchModifyStatusClick : function(selection, callback) {
		var dict = Module.Template.page.Config;
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [ {
				xtype : 'combo',
				fieldLabel : '状态',
				name : 'status',
				queryMode : 'local',
				autoSelect : true,
				value : 0,
				store : dict.COMBO_CFG.statusEdit,
				editable : false,
				allowBlank : false,
				triggerAction : 'all'
			} ],
			buttonAlign:'center',
			buttons : [ {
				text : '修改状态',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					var ids = new Array();
					var records = selection;
					Ext.each(records, function(r){
						ids.push(r.data.id);
					});
					Soul.Ajax.request({
						url : "/api/tpl/page/status/" + values.status + "/",
						headers: {
							Accept: "application/json"
						},
						method : 'put',
						jsonData  : ids,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						confirm : '确认要修改页面模板状态吗？',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
					
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "改变状态");
	},
	
	onBatchAddStyleClick : function(selection, callback){
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '风格',
				name : 'style',
				minLength: 1,
				regex : /^[^,，\s]*$/,
				regexText : '不能包含","和"，"和空格', 
				blankText: "请输入要添加的风格",
				emptyText: "请输入要添加的风格",
				allowBlank : false
			} ],
			buttonAlign:'center',
			buttons : [ {
				text : '添加风格',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					var ids = [];
					var records = selection;
					Ext.each(records, function(r){
						ids.push(r.data.id);
					});
					Soul.Ajax.request({
						url : "/api/tpl/page/style/" + values.style + "/",
						method : 'put',
						jsonData  : ids,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						confirm : '确认要给所选的页面添加"' + values.style + '"的风格？',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
					
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "添加风格");
	},
	
	onBatchAddLabelClick : function(selection, callback){
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '标签',
				name : 'label',
				minLength: 1,
				regex : /^[^,，\s]*$/,
				regexText : '不能包含","和"，"和空格', 
				blankText: "请输入要添加的标签",
				emptyText: "请输入要添加的标签",
				allowBlank : false
			} ],
			buttonAlign:'center',
			buttons : [ {
				text : '添加标签',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					var ids = [];
					var records = selection;
					Ext.each(records, function(r){
						ids.push(r.data.id);
					});
					Soul.Ajax.request({
						url : "/api/tpl/page/labels/" + values.label + "/",
						method : 'put',
						jsonData  : ids,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						confirm : '确认要给所选的页面添加"' + values.label + '"的标签？',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "添加标签");
	},

	onBatchRemoveClick : function(selection, callback) {
		var ids = [];
		var records = selection;
		Ext.each(records, function(r){
			ids.push(r.data.id);
		});
		
		Soul.Ajax.request({
			url : "/api/tpl/page/",
			method : 'delete',
			jsonData  : ids,
			loadMask : true,
			loadMsg : '删除中',
			successMsg : '删除成功',
			confirm : '确定要删除所选的模板？',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},

	onLoadTplClick : function(callback) {
		Soul.Ajax.request({
			url : "/api/tpl/page/",
			method : 'post',
			loadMask : true,
			loadMsg : '载入中',
			successMsg : '载入成功',
			confirm : '确认要从系统中重新载入模板吗？',
			success : function(response, opts) {
				if (typeof callback === 'function')
					callback();
			}
		});
	},

	onExportClick : function(callback) {
		var exportUrl = '/api/tpl/page/export/';
		location.href = exportUrl;

	},

	doAddImportFunction : function(callbackFun) {

		var formpanel = new Ext.FormPanel({
			labelWidth: 100,
			width: 400,
			frame: true,
			layout: {
				type: 'column'
			},
			items:[{
				xtype: 'container',
				columnWidth : .50,
				autoHeight : true,
				defaults: {
					xtype: 'textfield',
					labelAlign: 'right',
					width: 250
				},
				items:[{
					name: 'pageTplXls',
					id: 'pageTplXls',
					xtype: 'filefield' ,
					fieldLabel: '选择excel',
					buttonText: '选择',
					submitValue: true,
					allowBlank: false,

					}]
			}]
		});
		var win = null;
		win = new Ext.Window({
			title: '导入模板',
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.apply,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;
					var importUrl="/api/tpl/page/import/";
					formpanel.submit({
						url: importUrl,
						method: 'POST',
						waitMsg: '正在根据模板更新pageTpl请稍候...',
						success: function(fp, o) {
							callbackFun();
							win.close();
						},
						failure: function(fp, o) {
							callbackFun();
							win.close();
						}
					});


				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	},



	onSetCoverClick : function(selection, callback){
		if (selection.length <= 0) {
			return;
		}
		
		var id = selection[0].data.id;
		
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [Module.Template.page.Config.coverCombo()],
			buttonAlign:'center',
			buttons : [ {
				text : '设定',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					Soul.Ajax.request({
						url : "/api/tpl/page/" + id,
						method : 'put',
						jsonData  : values,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "设置关联封面模板");
	},
	
	onSetBackCoverClick : function(selection, callback){
		if (selection.length <= 0) {
			return;
		}
		
		var id = selection[0].data.id;
		
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : [Module.Template.page.Config.backCoverCombo()],
			buttonAlign:'center',
			buttons : [ {
				text : '设定',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					Soul.Ajax.request({
						url : "/api/tpl/page/" + id,
						method : 'put',
						jsonData  : values,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "设置关联封底模板");
	},
	
	onSetBaseAttrClick : function(selection, callback){
		if (selection.length <= 0) {
			return;
		}
		
		var data = selection[0].data;
		var id = selection[0].data.id;
		
		var items = [{
			xtype : 'textfield',
			fieldLabel : '名称',
			name : 'name',
			minLength: 1,
			value : data.name,
			regex : /^[^,，\s]*$/,
			regexText : '不能包含","和"，"和空格', 
			blankText: "请输入名称",
			emptyText: "请输入名称",
			allowBlank : false
		}, {
			xtype : 'textarea',
			fieldLabel : '描述',
			value : data.desc,
			name : 'desc'
		}, {
			xtype : 'textfield',
			fieldLabel : '主风格',
			regex : /^[^\s]*$/,
			regexText : '不能包含空格', 
			value : data.majorStyle,
			name : 'majorStyle'
		} , {
			xtype : 'textfield',
			regex : /^[^\s]*$/,
			regexText : '不能包含空格', 
			fieldLabel : '辅风格',
			value : data.minorStyle,
			name : 'minorStyle'
		}, {
			xtype : 'textfield',
			fieldLabel : '主颜色',
			regex : /^[^\s]*$/,
			regexText : '不能包含空格',
			value : data.majorColor,
			name : 'majorColor'
		} , {
			xtype : 'textfield',
			regex : /^[^\s]*$/,
			regexText : '不能包含空格',
			fieldLabel : '辅颜色',
			value : data.minorColor,
			name : 'minorColor'
		} , {
			xtype : 'textfield',
			regex : /^[^\s]*$/,
			regexText : '不能包含空格',
			fieldLabel : '标签',
			value : data.tag,
			name : 'tag'
		} ];
		
		if (data.type === "CATALOGUE") {
			items.push({
				xtype : 'numberfield',
				fieldLabel : '目录条目数',
				value : data.catalogItemNum,
				name : 'catalogItemNum'
			});
		}
		
		if (data.type === "PINDEX") {
			items.push({
				xtype : 'numberfield',
				fieldLabel : '索引条目数',
				value : data.pIndexNum,
				name : 'pIndexNum'
			});
		}
		
		var baseForm = Ext.create("Ext.form.Panel", {
			frame:true,
			bodyStyle:'padding:5px',
			items : items,
			buttonAlign:'center',
			buttons : [ {
				text : '设定',
				handler : function() {
					if (!this.up('form').getForm().isValid())
						return;
					var win = this.up('window');
					var values = this.up('form').getForm().getValues();
					Soul.Ajax.request({
						url : "/api/tpl/page/" + id,
						method : 'put',
						jsonData  : values,
						loadMask : true,
						loadMsg : '修改中',
						successMsg : '修改成功',
						success : function(response, opts) {
							if (typeof callback === 'function')
								callback();
							win.close();
						}
					});
				}
			} ],
		});
		Soul.util.ObjectView.showInNewWin(baseForm, "设置属性");
	}

});