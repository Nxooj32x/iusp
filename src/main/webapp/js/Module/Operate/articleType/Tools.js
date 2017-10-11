Ext.define('Module.Operate.articleType.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],
	
	getArticleModelCombo : function(value){
		var disabled = false;
	
		var data = ARTICLE_COMBO.articleModel;

		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ARTICLE_LABEL.module,
			labelAlign : 'right',

			name : 'module',
			displayField: 'name',
			valueField: 'value',
			
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 250,

			typeAhead: true,
			selectOnFocus: true,
			indent: true,
			allowBlank : false,
			editable : false,
			disabled: disabled,

			store : store
		});

		if(value != null){
			combo.setValue(value);
		}
		return combo;
	},
	
	getArticleStatusCombo : function( value){
		var disabled = false;
	
		var data =ARTICLE_COMBO.articleStatus;
	
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ARTICLE_LABEL.state,
			labelAlign : 'right',

			name : 'state',
			displayField: 'name',
			valueField: 'value',
			
			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 250,

			typeAhead: true,
			selectOnFocus: true,
			indent: true,
			allowBlank : false,
			editable : false,
			disabled: disabled,

			store : store
		});

		if(value != null){
			combo.setValue(value);
		}
		return combo;
	},
	
	constructor : function() {
        this.callParent(arguments);
    }
});