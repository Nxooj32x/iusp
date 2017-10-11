Ext.define('Module.YB.message.view.Grid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.messagegrid',

	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Soul.ux.grid.column.ComboColumn',
		'Module.YB.message.Data',
		'Module.YB.message.Renderer',
		'Module.YB.message.Tools',
		'Module.YB.message.Config'
	],

	checkIndexes : ['toUserName'],
	disableIndexes : [],

	initComponent : function() {
		var columns = new Array();
		var renders = Module.YB.message.Renderer;
		var comboData = Module.YB.message.Config.COMBO_DATA;

		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:MESSAGE_PROPERTY.subject, dataIndex:'subject', searchType:'string', align:'center', width:150
			},{
				text:MESSAGE_PROPERTY.content, dataIndex:'content', searchType:'string', align:'center', width:300
			},{
				text:MESSAGE_PROPERTY.toUserId, dataIndex:'toUserId', searchType:'number', align:'center', width:100
			},{
				text:MESSAGE_PROPERTY.toUserName, dataIndex:'toUserName', searchType:'string', align:'center', width:100
			},{
				text:MESSAGE_PROPERTY.type, dataIndex:'type', searchType:'combo', align:'center', width:100,
				renderer : function(v,u,r,rowIndex,columnIndex,s){
					return renders.translateMessageType(v);
				},
				comboData : comboData.type
			},{
				text:MESSAGE_PROPERTY.createTime, dataIndex:'createTime', searchType:'date', align:'center', width:150,
				renderer : function(v,u,r,rowIndex,columnIndex,s){
					var val = new Date(v);
					return Ext.util.Format.date(val, 'Y-m-d H:i:s');
				}
			}
		);
		
		var me = this;

		//右击事件
		me.contextMenu = me.portlet.buildMessageOptMenu();

		//双击事件 --> 订单详情
		//me.doubleClick = function(view, record, item, index, e){
		//	Module.YB.order.Operation.detailOrderFunc(record, null);
		//};
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
//				selectionchange: function(sm2) {
//					var records = sm2.getSelection();
//					var rightAddMessage = me.contextMenu.down('menuitem[name=addMessage]');
//
//					rightAddMessage.disable();
//					
//					if(records.length != 1){
//						return;
//					}
//					rightAddMessage.enable();
//				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : MESSAGE_MESSAGE.empty
			},
			store : Ext.data.StoreManager.lookup("Module.YB.message.store.MessageStore")
		});
		
		this.callParent(arguments);
	},
	
	afterRender: function() {
		var me = this;
		me.callParent(arguments);
		
		var sm = me.selModel;
		var callbackFn = function(){
			me.updateView(me);
			sm.deselectAll();
		};

		var topAddMessage = me.portlet.down('menuitem[name=addMessage]');
		var topAddMessageToAll = me.portlet.down('menuitem[name=addMessageToAll]');
		var rightAddMessage = me.contextMenu.down('menuitem[name=addMessage]');
		var rightAddMessageToAll = me.contextMenu.down('menuitem[name=addMessageToAll]');

		//增加消息
		var addMessageFunc = function() {
			var records = sm.getSelection();
			if(records.length > 0) {
				Module.YB.message.Operation.doAddMessageFunction(records, 0, callbackFn);
			} else {
				Module.YB.message.Operation.showUsersFunc(records, callbackFn);
			}
		};
		var addMessageToAllFunc = function(type) {
			Module.YB.message.Operation.doAddMessageFunction(null, 1, callbackFn);
		};
		topAddMessage.on('click', addMessageFunc);
		topAddMessageToAll.on('click', addMessageToAllFunc);
		rightAddMessageToAll.on('click', addMessageToAllFunc);
		rightAddMessage.on('click', addMessageFunc);
	}
});