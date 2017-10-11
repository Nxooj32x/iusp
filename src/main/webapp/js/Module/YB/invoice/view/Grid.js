Ext.define('Module.YB.invoice.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.invoicegrid',

	requires : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching',
		'Module.YB.invoice.Data',
		'Module.YB.invoice.Renderer',
		'Module.YB.order.Renderer'
	],

	checkIndexes : ['order.orderId','order.status','order.payWay','issueMode'],
	disableIndexes : ['order.creator','order.bookId','order.originPirce',
	'order.goodsNum','order.invoiceMailPrice','order.price','order.accountTime',
	'order.issueDate','invoiceCode','type','content','title','taxpayerId','registerAddr',
	'registerPhone','bankName','bankAccount','invoiceNote','address.recvName',
	'address.mobile','address.addrInfo','freightType','freightCode'],

	initComponent : function() {
		var columns = new Array();
		var renders = Module.YB.invoice.Renderer;
		var orderRenders = Module.YB.order.Renderer;
		columns.push(
			new Ext.grid.RowNumberer({text:'行号', align:'center', width:35}),
			{//order info start
				text:INVOICE_ORDER_PROPERTY.ctime, dataIndex:'order.ctime', searchType:'date', align:'center', width:100,
				renderer: function(v,u,r,rowIndex,columnIndex,s){
					return renders.translateCdate(v);
				}
			},{
				text:INVOICE_ORDER_PROPERTY.orderId, dataIndex:'order.orderId', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_ORDER_PROPERTY.creator, dataIndex:'order.creator', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_ORDER_PROPERTY.bookId, dataIndex:'order.bookId', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_ORDER_PROPERTY.singlePrice, dataIndex:'order.originPirce', searchType:'string', align:'center', width:100,
				renderer: function(v,u,r,rowIndex,columnIndex,s){
					if(v == null){
						return v;
					}
					var data = r.data.data;
					if(data == null){
						return v;
					}
					var order = data.order;
					if(order == null){
						return v;
					}
					var num = order.goodsNum;
					var sp = v / num;
					return sp;
				}
			},{
				text:INVOICE_ORDER_PROPERTY.goodsNum, dataIndex:'order.goodsNum', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_ORDER_PROPERTY.originPirce, dataIndex:'order.originPirce', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_ORDER_PROPERTY.status, dataIndex:'order.status', searchType:'combo', align:'center', width:100,
				renderer: function(v,u,r,rowIndex,columnIndex,s){
					return orderRenders.translateStatus(v);
				},
				comboData : INVOICE_COMBO.orderStatus
			},{
				text:INVOICE_ORDER_PROPERTY.invoiceMailPrice, dataIndex:'order.invoiceMailPrice', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_ORDER_PROPERTY.payWay, dataIndex:'order.payWay', searchType:'combo', align:'center', width:100,
				renderer: function(v,u,r,rowIndex,columnIndex,s){
					return orderRenders.translateOrderPayWay(v);
				},
				comboData : INVOICE_COMBO.orderPayWay
			},{
				text:INVOICE_ORDER_PROPERTY.price, dataIndex:'order.price', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_ORDER_PROPERTY.accountTime, dataIndex:'order.accountTime', searchType:'string', align:'center', width:100,
				renderer: function(v,u,r,rowIndex,columnIndex,s){
					return renders.translateCdate(v);
				}
			},{
				text:INVOICE_ORDER_PROPERTY.issueDate, dataIndex:'order.issueDate', searchType:'string', align:'center', width:100,
				renderer: function(v,u,r,rowIndex,columnIndex,s){
					return renders.translateCdate(v);
				}
			},{// invoice start
				text:INVOICE_PROPERTY.invoiceCode, dataIndex:'invoiceCode', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_PROPERTY.type, dataIndex:'type', searchType:'string', align:'center', width:100,
				renderer: function(v,u,r,rowIndex,columnIndex,s){
					return renders.translateInvoiceType(v);
				},
			},{
				text:INVOICE_PROPERTY.issueMode, dataIndex:'issueMode', searchType:'combo', align:'center', width:100,
				renderer: function(v,u,r,rowIndex,columnIndex,s){
					return renders.translateInvoiceIssueMode(v);
				},
				comboData : INVOICE_COMBO.invoiceIssueMode
			},{
				text:INVOICE_PROPERTY.content, dataIndex:'content', searchType:'string', align:'center', width:200,
			},{
				text:INVOICE_PROPERTY.invoiceMoney, dataIndex:'order.price', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_PROPERTY.title, dataIndex:'title', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_PROPERTY.taxpayerId, dataIndex:'taxpayerId', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_PROPERTY.registerAddr, dataIndex:'registerAddr', searchType:'string', align:'center', width:200,
			},{
				text:INVOICE_PROPERTY.registerPhone, dataIndex:'registerPhone', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_PROPERTY.bankName, dataIndex:'bankName', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_PROPERTY.bankAccount, dataIndex:'bankAccount', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_PROPERTY.invoiceNote, dataIndex:'invoiceNote', searchType:'string', align:'center', width:200,
			},{
				text:INVOICE_PROPERTY.invoiceReviceName, dataIndex:'address.recvName', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_PROPERTY.invoiceRevicePhone, dataIndex:'address.mobile', searchType:'string', align:'center', width:100,
				renderer: function(v,u,r,rowIndex,columnIndex,s){
					if(v != null && v.trim() != ""){
						return v;
					}else{
						var data = r.data.data;
						if(data.address){
							return data.address.phone;
						}else{
							return "";
						}
					}
				}
			},{
				text:INVOICE_PROPERTY.invoiceReviceAddr, dataIndex:'address.addrInfo', searchType:'string', align:'center', width:200,
			},{
				text:INVOICE_PROPERTY.freightType, dataIndex:'freightType', searchType:'string', align:'center', width:100,
			},{
				text:INVOICE_PROPERTY.freightCode, dataIndex:'freightCode', searchType:'string', align:'center', width:100,
			}
		);

		var me = this;
		me.contextMenu = me.portlet.buildInvoiceOptMenu();

		var sm = new Ext.selection.RowModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();

					var topEditItem = me.portlet.down('menuitem[name=editInvoice]');
					var rightEditItem = me.contextMenu.down('menuitem[name=editInvoice]');
					if(records.length == 1){
						rightEditItem.enable();
						topEditItem.enable();
					}else{
						rightEditItem.disable();
						topEditItem.disable();
					}
				}
			}
		});

		Ext.apply(this, {
			selModel: sm,
			columns : columns,
			viewConfig : {
				emptyText : INVOICE_MESSAGE.noInvoice
			},
			store : Ext.data.StoreManager.lookup("Module.YB.invoice.store.InvoiceStore"),
		});
		
		this.callParent(arguments);
	},

	afterRender: function() {
        var me = this;
        me.callParent(arguments);

		var sm = me.selModel;
		var callbackFun = function(){
			me.updateView(me);
			sm.deselectAll();
		};

		var topEditItem = me.portlet.down('menuitem[name=editInvoice]');
		var rightEditItem = me.contextMenu.down('menuitem[name=editInvoice]');
		var topExportItem = me.portlet.down('menuitem[name=exportInvoice]');
		var rightExportItem = me.contextMenu.down('menuitem[name=exportInvoice]');

		var editInvoiceFunc = function() {
			var records = sm.getSelection();
			if(records.length == 1){
				Module.YB.invoice.Operation.editInvoiceFunc(records[0].data, callbackFun);
			}
		};
		topEditItem.on('click', editInvoiceFunc);
		rightEditItem.on('click', editInvoiceFunc);

		var exportInvoiceFunc = function() {
			var store = Ext.data.StoreManager.lookup("Module.YB.invoice.store.InvoiceStore");
			var filter = store.proxy.extraParams.filter;
			if(filter != null){
				filter = filter.replace(new RegExp('%','gm'),'%25');
			}
			var exportExcelUrl = '/admin/invoice/export/xls';
			location.href = exportExcelUrl + "?filter=" + filter;
		};
		topExportItem.on('click', exportInvoiceFunc);
		rightExportItem.on('click', exportInvoiceFunc);
	}
});