Ext.define('Module.YB.printBook.Renderer', {
	singleton: true,
	requires  : [
	           'Module.YB.printBook.model.PrintBookModel'
  	],
  	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.YB.printBook.model.PrintBookModel;
   	},
});