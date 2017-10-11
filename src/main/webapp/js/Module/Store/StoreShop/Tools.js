Ext.define('Module.Store.StoreShop.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],

	

	getStateCombo : function(value){
		var disabled = false;

		var data = STORE_SHOP_COMBO.status;


		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : STORE_LABEL.status,
			labelAlign : 'right',

			name : 'status',
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

	getShopMouduleBillingStateCombo : function(value){
		var disabled = false;

		var data = SHOP_MODULE_BILLING_COMBO.status;


		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : STORE_LABEL.status,
			labelAlign : 'right',

			name : 'status',
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