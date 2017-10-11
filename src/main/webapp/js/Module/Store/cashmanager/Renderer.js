Ext.define('Module.Store.cashmanager.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Store.cashmanager.Tools',
 		'Module.Store.cashmanager.model.cashModel'
  	],
  	translateCtime : function(v){
  		if(v == null){
  			return CASH_LABEL.unknown;
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	}

});