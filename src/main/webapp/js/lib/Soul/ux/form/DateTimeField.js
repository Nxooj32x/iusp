Ext.define('Soul.ux.form.DateTimeField', {
	  extend: 'Ext.form.field.Date',
	  alias: 'widget.datetimefield',
	  requires: ['Soul.ux.DateTimePicker'],

	  initComponent: function() {
		  this.format = this.format + ' ' + 'H:i:s';
		  this.callParent();
	  },
	  // overwrite
	  createPicker: function() {
		  var me = this,
			  format = Ext.String.format;

		  return Ext.create('Soul.ux.DateTimePicker', {
			    ownerCt: me.ownerCt,
			    renderTo: document.body,
			    floating: true,
			    hidden: true,
			    focusOnShow: true,
			    minDate: me.minValue,
			    maxDate: me.maxValue,
			    disabledDatesRE: me.disabledDatesRE,
			    disabledDatesText: me.disabledDatesText,
			    disabledDays: me.disabledDays,
			    disabledDaysText: me.disabledDaysText,
			    format: me.format,
			    showToday: me.showToday,
			    startDay: me.startDay,
			    minText: format(me.minText, me.formatDate(me.minValue)),
			    maxText: format(me.maxText, me.formatDate(me.maxValue)),
			    listeners: {
				    scope: me,
				    select: me.onSelect
			    },
			    keyNavConfig: {
				    esc: function() {
					    me.collapse();
				    }
			    }
		    });
	  }
  });