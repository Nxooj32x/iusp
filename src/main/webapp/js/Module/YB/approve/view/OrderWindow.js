Ext.define('Module.YB.approve.view.OrderWindow', {
	singleton: true,

	requires  : [    
		'Module.YB.approve.Operation',
		'Module.YB.approve.view.Form',
		'Module.YB.approve.Renderer'
	],
	renders : Module.YB.approve.Renderer,
	approvalWindow:function(records,callbackFuc){
		var me = this;
		var form=Ext.create('Module.YB.approve.view.Form');
		var combo = form.down('combo[name=status]');
		combo.store = Ext.create('Ext.data.Store',{
			fields :['name','status'],
			data : Module.YB.approve.Operation.orderStatusDataFunction()
		});
		combo.readOnly = true;
		var editWindows = null;
		editWindows = Ext.create('Ext.window.Window',{
			 region:'center',
			 buttonAlign: 'center',
		     title: YB_APPROVE_LABEL.approval,
			 width: 490,
			 height:220,
			 items:[form],
			 modal:true,
			 buttons : [ {
             text : YB_APPROVE_LABEL.pass,
             handler : function(){
            	  var params = {};
            	  f = me.renders.getComponent(form,'orderId');
            	  params['orderId'] = f.getValue();
            	  params['approveStatus'] = '1';
            	  var callback = function(rec){
            		  if (editWindows != null) {
            			  editWindows.close();
            			  editWindows = null;
            		  }
            		  Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore").loadPage(1);
            	  };
            	  Module.YB.approve.Operation.doApprovalOrderByIdFunction(params,callback);
            	  callbackFuc();
              }
            }, {
              text : YB_APPROVE_LABEL.reject,
              handler : function() {
            	  var params = {};
            	  f = me.renders.getComponent(form,'orderId');
            	  params['orderId'] = f.getValue();
            	  params['approveStatus'] = '2';
            	  var callback = function(rec){
            		  if (editWindows != null) {
            			  editWindows.close();
            			  editWindows = null;
            		  }
            		  Ext.data.StoreManager.lookup("Module.YB.approve.store.OrderStore").loadPage(1);
            	  };
            	  Module.YB.approve.Operation.doApprovalOrderByIdFunction(params,callback);
            	  callbackFuc();
             }
            }, {
              text : LABEL.cancel,
              handler : function() {
            	  if (editWindows != null) {
        			  editWindows.close();
        			  editWindows = null;
        		  }
              }
          }]
		}).show();
		Ext.each(me.fields,function(v){
			f = me.renders.getComponent(form,v);
			if(v=='ctime'){
				f.setValue(new Date(records[v]));
			}else if(v=='singlePrice'){
				var value = records['originPirce'] / records['goodsNum'];
				f.setValue(value);
			}else if(v=='orderPrice'){
				var value = records['originPirce'];
				f.setValue(value);
			}else{
				f.setValue(records[v]);
			}
		});
	},
	fields : ['id','orderId','creator','orderPrice','goodsNum','singlePrice','address','bookName','status','ctime','approveStatus']

});