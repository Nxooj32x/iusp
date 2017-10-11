Ext.define('Module.YB.promotion.Tools', {
	singleton: true, 
	
	requires : [
		'Soul.util.ObjectView'
	],

	getPromotionTypeCombo : function(value){
		var disabled = false;

		var data = PROMOTION_COMBO.type;

		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : PROMOTION_PROPERTY.type,
			labelAlign : 'right',

			name : 'type',
			displayField: 'name',
			valueField: 'value',

			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 300,

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
	getPromotionOrderTypeCombo : function(value){
		var disabled = false;

		var data = PROMOTION_COMBO.orderType;

		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : PROMOTION_PROPERTY.type,
			labelAlign : 'right',

			name : 'supportOrderType',
			displayField: 'name',
			valueField: 'value',

			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 300,
			multiSelect:true,
			typeAhead: true,
			selectOnFocus: true,
			indent: true,
			allowBlank : false,
			editable : false,
			disabled: disabled,
			store : store
	
		});
		if(value != null){		
			var obj = value.split(",");     
			combo.setValue(obj);
		}
		return combo;
	},
	
	
	getPromotionItemTypeCombo : function(value){
		var disabled = false;

		var data = PROMOTION_COMBO.itemType;

		var store = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : data
		});
		var combo = new Ext.form.ComboBox({
			fieldLabel : PROMOTION_ITEM_PROPERTY.promotionType,
			labelAlign : 'right',

			name : 'promotionType',
			displayField: 'name',
			valueField: 'value',

			queryMode: 'local',
			triggerAction: 'all',
			emptyText: '请选择...',
			blankText: '请选择...',
			width: 300,

			typeAhead: true,
			selectOnFocus: true,
			indent: true,
			allowBlank : false,
			editable : false,
			disabled: disabled,

			store : store,
			listeners: {
				select: function(combo, record, index){
					
					var value = record[0].data.value;
					var discount = this.up('form').down('field[name=discount]');
					var reduceMoney = this.up('form').down('field[name=reduceMoney]');
					 //'0' : "折扣",  '1' : "减免"								
					discount.hide();
					reduceMoney.hide();
					discount.allowBlank = false
					reduceMoney.allowBlank = false
					
					if(value=='0')
					{
						discount.show();
						reduceMoney.allowBlank = true;
					}else{			
						discount.allowBlank = true;
						reduceMoney.show()
					}		
				}
			}
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