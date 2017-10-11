Ext.define('Module.YB.approve.view.Form',{
	extend : 'Ext.panel.Panel',
	requires  : [    
	     		'Module.YB.approve.Operation'
	     	],
//	labelWidth : 75, 
    frame : true,
    bodyStyle : 'padding:5px 5px 0',
    waitMsgTarget : true,
    defaults : {
    	  labelAlign:'right',
          width : 220,
          labelWidth :70
    },
    defaultType : 'textfield',
	initComponent : function(){
		var me = this;
		me.layout = {
			type : 'table',
			columns : 2
		},
		me.items=me.setItems();
		 me.callParent();
	},
	setItems : function(){
		return	[{
	        	xtype:'textfield',
	            name : 'id',
	            hidden: true
	    	},{
				xtype:'textfield',
	            fieldLabel :YB_APPROVE_PROPERTY.orderId,
	            name : 'orderId',
	            readOnly: true
	        },{
	        	xtype:'textfield',
	            fieldLabel : YB_APPROVE_PROPERTY.bookName,
	            name : 'bookName',
	            readOnly: true
	    	},{
	        	xtype:'textfield',
	            fieldLabel : YB_APPROVE_PROPERTY.singlePrice,
	            name : 'singlePrice',
	            readOnly: true
	        },{
	        	xtype:'textfield',
	            fieldLabel : YB_APPROVE_PROPERTY.orderPrice,
	            name : 'orderPrice',
	            readOnly: true
	        },{
	        	xtype:'textfield',
	            fieldLabel :YB_APPROVE_PROPERTY.creator,
	            name : 'creator',
	            readOnly: true
	        },{
				xtype:'datefield',
				fieldLabel:YB_APPROVE_PROPERTY.ctime,
				format:'Y-m-d',
				name:'ctime',
	            readOnly: true
			},{
	        	xtype:'textfield',
	            fieldLabel : YB_APPROVE_PROPERTY.address,
	            name : 'address',
	            readOnly: true
	        },{
	        	xtype:'textfield',
	            fieldLabel : YB_APPROVE_PROPERTY.goodsNum,
	            name : 'goodsNum',
	            readOnly: true
	        },{
				xtype:'combo',
				fieldLabel:YB_APPROVE_PROPERTY.status,
				name:'status',
				value:'',
				displayField : 'name',
				valueField : 'status',
				store : null,
	            readOnly: false
			},{
				xtype:'combo',
				fieldLabel:YB_APPROVE_PROPERTY.approveStatus,
				name:'approveStatus',
	            readOnly: true,
				displayField : 'name',
				valueField : 'status',
				store : Ext.create('Ext.data.Store',{
					fields :['name','status'],
					data : Module.YB.approve.Operation.approveStatus()
				})
			}
		];
	}
});