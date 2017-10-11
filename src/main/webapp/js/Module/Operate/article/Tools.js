Ext.define('Module.Operate.article.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	getArticleTypeCombo : function(value){
		var disabled = false;

		var dt = [];
		var objs = Module.Operate.article.Operation.getArticleTypeDataFunction();
		
		$.each(objs, function(key, obj){
			var ar = [obj.id, obj.name];
			dt.push(ar);
		});

		var	data=dt;
		
		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ARTICLE_LABEL.type,
			labelAlign : 'right',

			name : 'type',
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
	
	getArticleStatusCombo : function(value){
		var disabled = false;
	
		var data = ARTICLE_COMBO.articleStatus;
		

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