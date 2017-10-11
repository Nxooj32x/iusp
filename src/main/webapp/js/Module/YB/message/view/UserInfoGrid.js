Ext.define('Module.YB.message.view.UserInfoGrid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.userinfogrid',
	
	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.YB.message.Data',
		'Module.YB.message.store.UserStore'
	],
    
	checkIndexes : ['fullName'], //默认选择的列
	disableIndexes : [],
	
	initComponent : function() {
		var columns = new Array();
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:MESSAGE_USER_PROPERTY.id, dataIndex:'id', searchType:'number', align:'center'
			},{
				text:MESSAGE_USER_PROPERTY.fullName, dataIndex:'fullName', searchType:'string', align:'center'
			}
		);
		
		// 右击
		var me = this;
		me.contextMenu = Ext.create('Ext.menu.Menu', {
			name : 'messageoperationmenu',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: MESSAGE_LABEL.addMessage,
					disabled: false,
					name: 'addMessageButton',
					iconCls: 'x-add-icon'
				}]
		});
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					//var records = sm2.getSelection();
					
					/*判断所选状态是否一致*/
					//Ext.each(records, function(record, index, rs){
					//	if (statusT == -1) {
					//		statusT = record.data.voucherBillStatus;
					//	} else if (statusT != record.data.voucherBillStatus){
					//		statusT = -1;
					//		return false;
					//	}
					//});
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : USER_MESSAGE.empty
			},
			store : Ext.data.StoreManager.lookup("Module.YB.message.store.UserStore"),
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
        
        var callbackFun = function(){
			var messageStore = Ext.data.StoreManager.lookup("Module.YB.message.store.MessageStore");
			messageStore.load();
		};

		var sm = me.selModel;
        var topAddMessageItem = me.down('button[name=addMessageButton]');
        var rightAddMessageItem = me.contextMenu.down('menuitem[name=addMessageButton]');
        var doAddMessageFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	if(records.length < 1) {
        		Ext.Msg.alert('系统提示','请选择您要发送的用户');
        		return;
        	}
        	Module.YB.message.Operation.doAddMessageFunction(records, 2, callbackFun);
        };
        topAddMessageItem.on('click', doAddMessageFunc);
        rightAddMessageItem.on('click', doAddMessageFunc);
    }
});