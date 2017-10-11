Ext.define('Module.Template.bookTemplate.view.BtplSectionEdit', {
	extend : 'Ext.container.Container',
	alias : 'widget.btplsectionedit',

	uses : 'Ext.data.Store',

	requires : [  'Ext.dd.*', 'Module.Template.bookTemplate.Operation'  ],

	btpl : {},
	
	layout: {
        type: 'hbox',
        align: 'stretch',
        padding: 5
    },
    
	initComponent : function() {
		var me = this;
		var opt = Module.Template.bookTemplate.Operation;
		
		me.sectionGrid = Ext.create('Module.Template.bookTemplate.view.sectionMgt.SectionGrid', {
			   flex : 1,
			   enableDragDrop: true,
			   btpl : me.btpl,
			   viewConfig: {
	               plugins: [{
	                   ptype: 'gridviewdragdrop',
	                   ddGroup : me.btpl.id + 'bptlSection'
	               }],
	               listeners: {
	                   beforedrop : function(node, data, overModel, dropPosition, dropHandlers) {
	                       // Defer the handling
	                       dropHandlers.wait = true;
	                       
	                       if (!data.records[0].data.sectionType) {
	                    	   var section = data.records[0].data;
	                    	   var targetS = overModel.data;
	                    	   if (section.stpl.posMode != 0) {
	                    		   Soul.util.MessageUtil.showErrorInfo("对不起", "该类型章节位置固定，不能移动");
	                    		   dropHandlers.cancelDrop();
	                    	   } else if (targetS.stpl.posMode == 1 && dropPosition == "before"){
	                    		   Soul.util.MessageUtil.showErrorInfo("对不起", '你不能把"' + section.name + '"移动到"' + targetS.name + '"前面,"' + targetS.name + '"必须在第一位' );
	                    		   dropHandlers.cancelDrop();
	                    	   } else if (targetS.stpl.posMode == 2 && dropPosition == "after"){
	                    		   Soul.util.MessageUtil.showErrorInfo("对不起", '你不能把"' + section.name + '"移动到"' + targetS.name + '"后面,"' + targetS.name + '"必须在最后一位' );
	                    		   dropHandlers.cancelDrop();
	                    	   } else {
	                    		   dropHandlers.processDrop();
	                    	   }
	                    	   
	                    	   return;
	                       }
	                       
	                       var gv = this;
	                       var pos = 0;
	                       if (overModel && dropPosition) {
	                    	   pos = overModel.data.sectionPos;
	                    	   if (dropPosition === "after")
	                    		   pos += 1;
	                    	   else if (dropPosition === "before")
	                    		   pos -= 1;
	                       }
	                       if (data.records[0].data.onlyOne) {
	                    	   var cs = gv.getStore().getRange();
	                    	   var has = false;
	                    	   Ext.each(cs, function(r){
	                    		   if (r.data.type == data.records[0].data.sectionType) {
	                    			   has = true;
	                    			   return false;
	                    		   }
	                    	   });
	                    	   if (has) {
	                    		   Soul.util.MessageUtil.showErrorInfo("对不起", "该类型章节只能有一个，不能重复添加");
	                    		   dropHandlers.cancelDrop();
	                    		   return;
	                    	   }
	                       }
	                       
	                       opt.onAddSectionToBookClick(me.btpl.id, pos, data.records[0].data, function(){
	                    	   dropHandlers.cancelDrop();
                    		   gv.getStore().load();
	                       }, function(){
	                    	   dropHandlers.cancelDrop();
	                       });
	                   }
	               }
	           },
			   stripeRows: true,
			   title: '章节',
			   margins: '0 5 0 0'
			   });
	  me.sectionTplGrid = Ext.create('Module.Template.bookTemplate.view.sectionMgt.SectionTplGrid', {
	         width : 300,
	         //height : 600,
	         viewConfig: {
	                plugins: {
	                    ptype: 'gridviewdragdrop',
	                    dragGroup: me.btpl.id + 'bptlSection'
	                }
	            },
	            store: Ext.create('Module.Template.bookTemplate.store.BtplSectionTplStore', {
	         	   autoLoad : true
	            }),
	         stripeRows: true,
	         title: '可选章节模板'
	   });
		 
      this.items = [me.sectionGrid, me.sectionTplGrid];
	  this.callParent(arguments);
	},
    
    afterRender : function() {
		var me = this;
		me.callParent(arguments);
		
		var parent = me.findParentByType("bptleditview");
		var info = parent.getComponent(0);
		var w = parent.getSize().width;
		var h = parent.getSize().height - info.getSize().height;
		me.setSize(w, h);
		
		me.sectionGrid.getStore().on('load', function(store, records, successful, eOpts){
			var onlyType = [];
			Ext.each(records, function(r){
				if (r.data.stpl.onlyOne) {
					onlyType.push(r.data.stpl.sectionType);
				}
			});
			me.sectionTplGrid.getStore().clearFilter();
			if (onlyType.length > 0) {
				me.sectionTplGrid.getStore().filterBy(function(r) {  
                    return !Ext.Array.contains(onlyType, r.data.sectionType);
                }); 
			}
			
		});
		
	}
});
