Ext.define('Module.Operate.activity.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	
	getActivityStatusCombo : function(action, value){
		var disabled = false;
	
		var data = [];
		if(action == 'add'){
			data = ACTIVITY_COMBO.activityStatus_add;
		}else if(action == 'edit'){
			data = ACTIVITY_COMBO.activityStatus;
		}else{
			data = ACTIVITY_COMBO.activityStatus;
		}

		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : ACTIVITY_LABEL.state,
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