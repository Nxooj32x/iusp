Ext.define('Module.YB.orderInvoice.view.Grid', {
	extend : 'Soul.view.AdvanceSearchGrid',
	alias : 'widget.ordergrid',

	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Soul.ux.grid.column.ComboColumn',
		'Module.YB.orderInvoice.Data',
		'Module.YB.orderInvoice.Renderer',
		'Module.YB.orderInvoice.Tools',
		'Module.YB.orderInvoice.Config'
	],

	checkIndexes : [],
	disableIndexes : ['defaultMoney', 'payMoney'],

	initComponent : function() {
		var columns = new Array();
		var renders = Module.YB.orderInvoice.Renderer;
		var comboData = Module.YB.orderInvoice.Config.COMBO_DATA;

		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text:ORDER_INVOICE_PROPERTY.invoiceNub, dataIndex:'invoiceNub', searchType:'string', align:'center', width:120
			},{
				text:ORDER_INVOICE_PROPERTY.title, dataIndex:'title', searchType:'string', align:'center', width:120
			},{
				text:ORDER_INVOICE_PROPERTY.content, dataIndex:'content', searchType:'string', align:'center', width:200
			},{
				text:ORDER_INVOICE_PROPERTY.type, dataIndex:'type', searchType:'combo', align:'center', width:80,
				renderer : function(v,u,r,rowIndex,columnIndex,s){
					return renders.translateOrderInvoiceType(v);
				},
				comboData : comboData.type
			},{
				text:ORDER_INVOICE_PROPERTY.category, dataIndex:'category', searchType:'combo', align:'center', width:80,
				renderer : function(v,u,r,rowIndex,columnIndex,s){
					return renders.translateOrderInvoiceCategory(v);
				},
				comboData : comboData.category
			},{
				text:ORDER_INVOICE_PROPERTY.state, dataIndex:'state', searchType:'combo', align:'center', width:80,
				renderer : function(v,u,r,rowIndex,columnIndex,s){
					return renders.translateOrderInvoiceStatus(v);
				},
				comboData : comboData.state
			// },{
			// 	text:ORDER_INVOICE_PROPERTY.isAloneDelivery, dataIndex:'isAloneDelivery', searchType:'combo', align:'center', width:100,
			// 	renderer : function(v,u,r,rowIndex,columnIndex,s){
			// 		return v == true ? '是' : '否';
			// 	},
			// 	comboData : comboData.bool
			// },{
			// 	text:ORDER_INVOICE_PROPERTY.isDelivery, dataIndex:'isDelivery', searchType:'combo', align:'center', width:100,
			// 	renderer : function(v,u,r,rowIndex,columnIndex,s){
			// 		return v == true ? '是' : '否';
			// 	},
			// 	comboData : comboData.bool
			},{
				text:ORDER_INVOICE_PROPERTY.ctime, dataIndex:'ctime', searchType:'date', align:'center', width:150,
				renderer : function(v,u,r,rowIndex,columnIndex,s){
					var val = new Date(v);
					return Ext.util.Format.date(val, 'Y-m-d H:i:s');
				}
			},{
				text:ORDER_INVOICE_PROPERTY.money, dataIndex:'money', searchType:'string', align:'center', width:80
			},{
				text:ORDER_INVOICE_PROPERTY.taxpayerId, dataIndex:'taxpayerId', searchType:'string', align:'center', width:100
			},{
				text:ORDER_INVOICE_PROPERTY.registerAddr, dataIndex:'registerAddr', searchType:'string', align:'center', width:200
			},{
				text:ORDER_INVOICE_PROPERTY.registerPhone, dataIndex:'registerPhone', searchType:'string', align:'center', width:100
			},{
				text:ORDER_INVOICE_PROPERTY.bankName, dataIndex:'bankName', searchType:'string', align:'center', width:100
			},{
				text:ORDER_INVOICE_PROPERTY.bankAccount, dataIndex:'bankAccount', searchType:'string', align:'center', width:100
			},{
				text:ORDER_INVOICE_PROPERTY.note, dataIndex:'note', searchType:'string', align:'center', width:200
			}
		);
		
		var me = this;

		//右击事件
		me.contextMenu = me.portlet.buildOrderInvoiceOptMenu();

		//双击事件 --> 订单发票详情
		me.doubleClick = function(view, record, item, index, e){
			Module.YB.orderInvoice.Operation.detailOrderInvoiceFunc(record, null);
		};
		
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

					var topMakeOrderInvoice = me.portlet.down('menuitem[name=makeOrderInvoice]');
					var topDetailOrderInvoice = me.portlet.down('menuitem[name=detailOrderInvoice]');
					var topDeliveryInfo = me.portlet.down('menuitem[name=deliveryInfo]');

					var rightMakeOrderInvoice = me.contextMenu.down('menuitem[name=makeOrderInvoice]');
					var rightDetailOrderInvoice = me.contextMenu.down('menuitem[name=detailOrderInvoice]');
					var rightDeliveryInfo = me.contextMenu.down('menuitem[name=deliveryInfo]');

					topMakeOrderInvoice.disable();
					topDetailOrderInvoice.disable();
					topDeliveryInfo.disable();

					rightMakeOrderInvoice.disable();
					rightDetailOrderInvoice.disable();
					rightDeliveryInfo.disable();

					if(records.length != 1){
						return;
					}

					var data = records[0].data;

					//发票详情
					topDetailOrderInvoice.enable();
					rightDetailOrderInvoice.enable();

					//未开票，则开票按钮可用
					if(data.state == ORDER_INVOICE_DATA.STATE_WAIT){
						topMakeOrderInvoice.enable();
						rightMakeOrderInvoice.enable();
					}

					//已开票 & 独立运送，则可以填写货运信息(暂时默认与货物一起配送)
					// if(data.state == ORDER_INVOICE_DATA.STATE_ALREADY
					// 	&& data.isAloneDelivery == true){
					// 	topDeliveryInfo.enable();
					// 	rightDeliveryInfo.enable();
					// }
				}
			}
		});
		
		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : ORDER_INVOICE_MESSAGE.empty
			},
			store : Ext.data.StoreManager.lookup("Module.YB.orderInvoice.store.OrderInvoiceStore")
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

		var topMakeOrderInvoice = me.portlet.down('menuitem[name=makeOrderInvoice]');
		var topDetailOrderInvoice = me.portlet.down('menuitem[name=detailOrderInvoice]');
		var topDeliveryInfo = me.portlet.down('menuitem[name=deliveryInfo]');
		var topExportExcel = me.portlet.down('menuitem[name=exportExcel]');

		var rightMakeOrderInvoice = me.contextMenu.down('menuitem[name=makeOrderInvoice]');
		var rightDetailOrderInvoice = me.contextMenu.down('menuitem[name=detailOrderInvoice]');
		var rightDeliveryInfo = me.contextMenu.down('menuitem[name=deliveryInfo]');
		var rightExportExcel = me.contextMenu.down('menuitem[name=exportExcel]');

		//订单发票详情
		var detailOrderInvoiceFunc = function() {
			var records = sm.getSelection();
			if(records.length == 1){
				Module.YB.orderInvoice.Operation.detailOrderInvoiceFunc(records[0], null);
			}
		};
		topDetailOrderInvoice.on('click', detailOrderInvoiceFunc);
		rightDetailOrderInvoice.on('click', detailOrderInvoiceFunc);

		var makeOrderInvoiceFunc = function() {
			var records = sm.getSelection();
			if(records.length == 1){
				Module.YB.orderInvoice.Operation.makeOrderInvoiceFunc(records[0], callbackFn);
			}
		};
		topMakeOrderInvoice.on('click', makeOrderInvoiceFunc);
		rightMakeOrderInvoice.on('click', makeOrderInvoiceFunc);

		//订单发票物流信息
		var deliveryInfoFunc = function() {
			var records = sm.getSelection();
			if(records.length == 1){
				Module.YB.orderInvoice.Operation.deliveryInfoFunc(records[0], callbackFn);
			}
		};
		topDeliveryInfo.on('click', deliveryInfoFunc);
		rightDeliveryInfo.on('click', deliveryInfoFunc);

		//导出订单发票列表
		var exportExcelFunc = function() {
			var store = Ext.data.StoreManager.lookup("Module.YB.orderInvoice.store.OrderInvoiceStore");
			var filter = store.proxy.extraParams.filter;
			if(filter != null){
				filter = filter.replace(new RegExp('%','gm'),'%25');
			}
			var exportExcelUrl = '/api/admin/export/xls/orderInvoice';
			location.href = exportExcelUrl + "?filter=" + filter;
		};
		topExportExcel.on('click', exportExcelFunc);
		rightExportExcel.on('click', exportExcelFunc);
	}
});