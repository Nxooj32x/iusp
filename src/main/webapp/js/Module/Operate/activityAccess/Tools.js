Ext.define('Module.Operate.activityAccess.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	
	getActivityAccessStatusCombo : function(value){
		var disabled = false;
	
		var data = ACTIVITYACCESS_COMBO.activityAccessStatus;


		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ACTIVITYACCESS_LABEL.isOpen,
			labelAlign : 'right',

			name : 'isOpen',
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
	getActivityAccessPagesCombo : function(value){
		var disabled = false;
	
		var data = ACTIVITYACCESS_COMBO.activityAccessPages;


		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ACTIVITYACCESS_LABEL.name,
			labelAlign : 'right',

			name : 'code',
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
	
	getAcctivityCombo : function(value){
		var disabled = false;
		var dt = [];
		var objs = Module.Operate.activityAccess.Operation.getActivteyDataFunction();
		
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
			fieldLabel : ACTIVITYACCESS_LABEL.accessName,
			labelAlign : 'right',

			name : 'activty',
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