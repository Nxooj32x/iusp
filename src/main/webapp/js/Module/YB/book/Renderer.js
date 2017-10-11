Ext.define('Module.YB.book.Renderer', {
	singleton: true,
	requires  : [
	    'Module.YB.book.model.BookModel'
  	],
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.YB.book.model.BookModel;
   	}
});