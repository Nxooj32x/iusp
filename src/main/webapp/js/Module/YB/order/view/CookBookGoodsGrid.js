Ext.define('Module.YB.order.view.CookBookGoodsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.goodsgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Module.YB.order.Data',
        'Module.YB.order.Renderer',
        'Module.YB.order.Tools',
        'Module.YB.order.Config'
    ],

    order : null,
    
    initComponent: function () {
        var columns = new Array();
        var renders = Module.YB.order.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: GOODS_BOOK_PROPERTY.name,
                dataIndex: 'name',
                align: 'center',
                width: 150
            },{
                text: GOODS_BOOK_PROPERTY.price,
                dataIndex: 'price',
                align: 'center',
                width: 50,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {                  
                	return "￥" + v;
                }
            },  {
                text: GOODS_BOOK_PROPERTY.num,
                dataIndex: 'num',
                align: 'center',
                width: 50
            },{
                text: GOODS_BOOK_PROPERTY.totalPrice,
                dataIndex: 'totalPrice',
                searchType: 'string',
                align: 'center',
                width: 80,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {                  
                	return "￥" + v;
                }
            }, {
                text: GOODS_BOOK_PROPERTY.binding,
                dataIndex: 'binding',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateBookBinding(v);
                }
            }, {
                text: GOODS_BOOK_PROPERTY.leather,
                dataIndex: 'leather',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateBookLeather(v);
                }
            }, {
                text: GOODS_BOOK_PROPERTY.texture,
                dataIndex: 'texture',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateBookTexture(v);
                }
            }, {
                text: GOODS_BOOK_PROPERTY.size,
                dataIndex: 'size',
                align: 'center',
                width: 100,
                renderer: function (v, u, r, rowIndex, columnIndex, s) {
                    return renders.translateBookSize(v);
                }
            }, {
                text: "预览",
                xtype: 'actioncolumn',
                width: 50,
                dataIndex: 'view',
                editor: false,
                align: 'center',
                items: [{
                    icon: '/img/icon/view.png',
                    tooltip: '预览',
                    name: 'view',
                    scope: this,
                    handler: this.onPreviewClick,
                    isDisabled: function (v, r, c, item, r) {
                    }
                }]
            }, {
                text: "编辑",
                xtype: 'actioncolumn',
                width: 50,
                dataIndex: 'view',
                editor: false,
                align: 'center',
                items: [{
                    icon: '/img/icon/change.png',
                    tooltip: '编辑',
                    name: 'view',
                    scope: this,
                    handler: this.onEditClick,
                    isDisabled: function (v, r, c, item, r) {
                    }
                }]
            }, {
                text: "重新制作",
                xtype: 'actioncolumn',
                width: 80,
                dataIndex: 'view',
                editor: false,
                align: 'center',
                items: [{
                    icon: '/img/icon/init.png',
                    tooltip: '从当前书册重新制作打印书册 ',
                    name: 'view',
                    scope: this,
                    handler: this.onRebuildClick,
                    isDisabled: function (v, r, c, item, r) {
                    }
                }]
            }
        );
        var sm = new Ext.selection.CheckboxModel({});
        Ext.apply(this, {
            selModel: sm,
            columns: columns,
            store : {
                fields: ['name', 'status', 'price', 'binding', 'num', 'totalPrice', 'size', 'bookId', 'code','leather','leatherVien','texture']
            },
            viewConfig: {
                emptyText: ORDER_MESSAGE.empty
            }
        });

        this.callParent(arguments);
    },
    
    onRebuildClick : function(view ,rowIndex, colIndex, item, e, record, row){
    	var me = this;
    	var code  = me.order.code;
    	var orderId = me.order.id;
    	Soul.Ajax.request({
            url : "/api/admin/order/" + orderId + "/file" ,
            method : 'POST',
            timeout : 1000 * 60 * 20,
            loadMask : true,
            loadMsg : '生成压缩文件 ',
            successMsg : '生成成功，可以使用订单工具重新导出',
            success : function(response, opts) {
            }
        });
    },
    
    onPreviewClick : function(view ,rowIndex, colIndex, item, e, record, row){
        var me = this;
        var code  = me.order.code;
        var domain =  Module.YB.order.Operation.getBookPreviewDomainFunction();
        var previewUrl = domain+"book/" + record.get("bookId") + "/preview?mode=turn&booktype=printBook&layout=small&orderCode=" + code;
        window.open(previewUrl);
    },
    
    onEditClick : function(view ,rowIndex, colIndex, item, e, record, row){
        var host=window.location.host
        host=host.replace("yearbook.com.cn","caipuyi.com")
        var editUrl ="http://"+host+"/book/" + record.get("bookId") + "/space";
        window.open(editUrl);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    }
});
