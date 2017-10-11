Ext.define('Module.YB.order.Operation', {
    singleton: true,
    requires: [],


    getBookPreviewDomainFunction: function () {
        var url = "/api/config/cookbook/baseUrl/";
        return Soul.Ajax.getSyncText(url, null);
    },


    //订单评论详情
    commentDetailFunc: function (record, callbackFn) {

        var url = '/admin/order/' + record.data.id + '/comment';
        var title = "订单【" + record.data.name + "】评论管理";

        var win = Ext.create("Ext.window.Window", {
            id: "commentInfoWin",
            title: title,
            width: 700,
            height: 460,
            layout: "fit",
            autoShow: true,
            html: "<iframe scrolling='auto' frameborder='0' width='100%' height='100%' src='" + url + "'> </iframe>"
        });
        win.show();
    },


    //订单详情
    detailOrderFunc: function (record, callbackFn) {

        if (record.data.type == "PHOTO") {
            var url = '/admin/order/' + record.data.id + '/detail';
            window.open(url);
            return true;
        }

        var panel = new Ext.Panel({
            height: 600,
            width: 600,
            frame: true,
            autoScroll: true,
            layoutConfig: {
                animate: true
            },
            html: '<div id="orderDetailDiv"></div>',
            listeners: {
                'beforerender': function () {
                    var url = '/admin/order/' + record.data.id + '/detail';
                    Ext.Ajax.request({
                        url: url,
                        params: [],
                        success: function (ret) {
                            document.getElementById("orderDetailDiv").innerHTML = ret.responseText;
                        },
                        failure: function (ret) {
                            document.getElementById("orderDetailDiv").innerHTML = ret.responseText;
                        }
                    });
                }
            }
        });

        new Ext.Window({
            title: ORDER_LABEL.orderDetailInfo,
            autoDestroy: true,
            modal: true,
            items: panel
        }).show();
    },

    //取消订单
    cancelOrderFunc: function (record, callbackFn) {
        var confirm = {
            "DELETE": {
                msg: Ext.String.format(ORDER_MESSAGE.confirmCancelOrder, record.data.code)
            }
        };
        var method = "DELETE";
        var url = '/order/' + record.data.id;
        Soul.Ajax.confirmRestAction(url, method, {}, null, callbackFn, null, null, confirm);
    },

    //订单生产
    produceOrderFunc: function (record, callbackFn) {
        var confirm = {
            "PUT": {
                msg: Ext.String.format(ORDER_MESSAGE.confirmProduceOrder, record.data.code)
            }
        };
        var method = "PUT";
        var url = '/order/' + record.data.id + '/status/producing';
        Soul.Ajax.confirmRestAction(url, method, {}, null, callbackFn, null, null, confirm);
    },

    //订单发货
    deliveryOrderFunc: function (record, callbackFn) {
        this.deliveryInfoFunc(record, callbackFn);
    },

    //编辑物流信息
    deliveryInfoFunc: function (record, callbackFn) {
        var me = this;
        var id = record.data.id;
        var url = '/order/' + id + '/delivery';
        Soul.Ajax.request({
            url: url,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ContentType: 'application/json'
            },
            success: function (response, option) {
                if (response == null) {
                    response = {};
                    response.id = id;
                }
                me.editDeliveryInfo(response, callbackFn);
            },
            failure: function (response) {
                Soul.util.MessageUtil.parseResponse(response);
            }
        });
    },

    doExportExcelFuncForIDFunction: function (records, callbackFn) {
        var requestBody = [];
        var requestName = [];
        var ids = "";
        Ext.each(records, function (r, i, rs) {
            requestBody.push();
            requestName.push(r.data.name);

            if (ids == "")
                ids = r.data.id;
            else
                ids += ("," + r.data.id);

        });
//		var method = "get";
//		var confirm = {
//			"get" : {
//				msg : Ext.String.format(ORDER_MESSAGE.confirmDownLoadOrder, requestName)
//			}
//		};
        //用 Soul.Ajax.confirmRestAction提交 返回报错   Ext.Error: You're trying to decode an invalid JSON String: ��ࡱ�
        //Soul.Ajax.confirmRestAction("/api/admin/export/xls/order", method, {idStr:ids}, null,  callbackFn, null, null, confirm);
        location.href = "/api/admin/export/xls/order?idStr=" + ids;
    },

    doExportExcelDetailFuncForIDFunction: function (records, callbackFn) {
        var requestBody = [];
        var requestName = [];
        var ids = "";
        Ext.each(records, function (r, i, rs) {
            requestBody.push();
            requestName.push(r.data.name);

            if (ids == "")
                ids = r.data.id;
            else
                ids += ("," + r.data.id);

        });
        location.href = "/api/admin/export/xls/order/prints?idStr=" + ids;
    },


    //编辑物流信息，共用(data不可为空，至少需要有id字段，即物流id)
    editDeliveryInfo: function (data, callbackFn) {
        var radiogroup = new Ext.form.RadioGroup({
            fieldLabel: ORDER_LABEL.deliveryInfoType,
            labelAlign: 'right',
            items: [{
                boxLabel: '快递',
                name: "type",
                inputValue: "express",
                checked: true
            }, {
                boxLabel: '平邮',
                name: "type",
                inputValue: "post",
                disabled: true
            }]
        });
        radiogroup.setValue(data.type);

        var ctime = data.ctime == null ? null : Ext.util.Format.date(new Date(data.ctime), 'Y-m-d');
        var formpanel = new Ext.FormPanel({
            labelWidth: 60,
            width: 280,
            frame: true,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                width: 250
            },
            items: [radiogroup, {
                name: 'name',
                fieldLabel: ORDER_LABEL.deliveryInfoName,
                maxLength: 15,
                maxLengthText: '最多输入15个字符',
                allowBlank: false,
                value: data.name,
                blankText: '不可为空'
            }, {
                name: 'code',
                fieldLabel: ORDER_LABEL.deliveryInfoCode,
                maxLength: 40,
                maxLengthText: '最多输入40个字符',
                allowBlank: false,
                value: data.code,
                blankText: '不可为空'
            }, {
                xtype: 'datefield',
                name: 'ctime',
                format: 'Y-m-d',
                maxValue: new Date(),
                editable: true,
                allowBlank: false,
                disabled: false,
                value: ctime,
                fieldLabel: ORDER_LABEL.deliveryInfoCtime
            }]
        });
        var win = null;
        win = new Ext.Window({
            title: ORDER_LABEL.deliverInfo,
            items: formpanel,
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: LABEL.apply,
                handler: function () {
                    if (!formpanel.getForm().isValid()) return;

                    var params = formpanel.getForm().getValues();
                    var url = '/order/' + data.id + '/delivery?send=' + true;
                    Soul.Ajax.restAction(url, 'put', params, params, callbackFn, null, null);
                    if (win != null) {
                        win.close();
                        win = null;
                    }
                }
            }, {
                text: LABEL.cancel,
                handler: function () {
                    if (win != null) {
                        win.close();
                        win = null;
                    }
                }
            }]
        });

        win.show();
    }
});