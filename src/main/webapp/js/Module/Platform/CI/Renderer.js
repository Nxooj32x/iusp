Ext.define('Module.Platform.CI.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Platform.CI.Tools',
 		'Module.Platform.CI.model.CustomerInfo'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return CASH_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	
	constructor : function() {
		this.config = {
			ctime : Soul.util.RendererUtil.getDateInfo2,
		};
		this.callParent(arguments);
	}

});