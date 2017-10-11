Ext.define('Module.YB.promotion.Operation', {
    singleton: true,
    requires: [
        'Soul.util.HelpUtil',
        'Soul.util.ObjectView',
        'Soul.view.WizardWindow',
        'Soul.util.ObjectConfig',
        'Soul.ux.EmailDomainBox'
    ],

    addPromotgion: function (callbackFn) {
        Ext.apply(Ext.form.VTypes, {
            dateValue: function (value, field) {
                var start = field.up('form').down('field[name=beginDate]');
                var end = field.up('form').down('field[name=endDate]');

                if (start == null || end == null) {
                    return true;
                }

                if (start.getValue() > end.getValue()) {
                    return false;
                } else {
                    return true;
                }
            }
        });

        var formpanel = new Ext.FormPanel({
            labelWidth: 60,
            width: 600,
            frame: true,
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'container',
                    columnWidth: 1,
                    autoHeight: true,
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        width: 500
                    },
                    items: [
                        {
                            name: 'name',
                            fieldLabel: PROMOTION_PROPERTY.name,
                            maxLength: 40,
                            maxLengthText: '最多输入40个字符',
                            allowBlank: false,
                            blankText: PROMOTION_PROPERTY.name
                        },
                        Module.YB.promotion.Tools.getPromotionTypeCombo(),
                        Module.YB.promotion.Tools.getPromotionOrderTypeCombo(), 
                        {
                            xtype: 'datefield',
                            name: 'beginDate',
                            format: 'Y-m-d H:i:s',
                            minValue: new Date(),
                            editable: false,
                            allowBlank: false,
                            disabled: false,
                            fieldLabel: PROMOTION_PROPERTY.beginDate,
                            vtype: 'dateValue',
                            vtypeText: '开始时间不能大于截至时间！',
                            width : 300,
                            listeners: {
                                change: function (field) {
                                    var end = field.up('form').down('field[name=endDate]');
                                    if (end == null) return;
                                    end.validate();
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'endDate',
                            format: 'Y-m-d H:i:s',
                            editable: false,
                            allowBlank: false,
                            disabled: false,
                            fieldLabel: PROMOTION_PROPERTY.endDate,
                            vtype: 'dateValue',
                            width : 300,
                            vtypeText: '截至时间不能小于开始时间！',
                            listeners: {
                                change: function (field) {
                                    var start = field.up('form').down('field[name=beginDate]');
                                    if (start == null) return;
                                    start.validate();
                                },
                                select: function (field, value) {
                                    var time = Ext.Date.add(value, Ext.Date.HOUR, 23);
                                    time = Ext.Date.add(time, Ext.Date.MINUTE, 59);
                                    time = Ext.Date.add(time, Ext.Date.SECOND, 59);
                                    field.setValue(time);
                                }
                            }
                        },
                        {
                            xtype: 'textarea',
                            name: 'desc',
                            fieldLabel: PROMOTION_PROPERTY.desc,
                            readOnly: false,
                            allowBlank: true,
                            blankText: PROMOTION_PROPERTY.desc
                        }]
                }
            ]
        });

        var win = null;
        win = new Ext.Window({
            title: "增加促销",
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

                    var addPromotionUrl = "/api/admin/promotion/";

                    var values = formpanel.getForm().getValues();
                    var promotion = {};
                    promotion.name = values.name;
                    promotion.desc = values.desc;
                    promotion.endDate = values.endDate;
                    promotion.beginDate = values.beginDate;
                    promotion.type = values.type;
                    promotion.isOnly = false;
                    promotion.supportOrderType=values.supportOrderType.join(",");
                    Soul.Ajax.request({
                        url : addPromotionUrl,
                        jsonData : promotion,
                        headers : {
                            Accept : 'application/json'
                        },
                        loadMask : true,
                        loadMsg : '新建促销',
                        success : function(response, opts) {
                            if (typeof callbackFn === 'function')
                                callbackFn();
                            win.close();
                        },
                        failure : function(){
                        	  callbackFn();
                            win.close();
                        }
                    });
                }
            }, {
                text: LABEL.cancel,
                handler: function () {
                    win.close();
                }
            }]
        });

        win.show();
    },

    viewPromotionItems: function (record, callbackFn) {
        Soul.Ajax.request({
            url : "/api/admin/promotion/" + record.data.id + "/items",
            method : 'GET',
            timeout : 1000 * 60 * 20,
            headers : {
                Accept : 'application/json'
            },
            loadMask : true,
            loadMsg : '获取促销信息',
            successMsg : '获取成功',
            success : function(response, opts) {
                var itemsGrid = Ext.create("Module.YB.promotion.view.ItemGrid", {
                    promotion : record.data,
                    width : 900
                });
                itemsGrid.getStore().loadData(response);
                Soul.util.ObjectView.showInNewWin(itemsGrid, "促销信息");
            }
        });
    },

    doAddPromotionItemProcessFunction : function (records, callbackFn) {
        var promotion = records[0].data;

        var formpanel = new Ext.FormPanel({
            labelWidth: 60,
            width: 400,
            frame: true,
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'container',
                    columnWidth: 1,
                    autoHeight: true,
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        width: 300
                    },
                    items: [
                        Module.YB.promotion.Tools.getPromotionItemTypeCombo(),
                        {
                            name: 'limitMoney',
                            fieldLabel: PROMOTION_ITEM_PROPERTY.limitMoney,
                            maxLength: 40,
                            maxLengthText: '最多输入40个字符',
                            allowBlank: false,
                            blankText: PROMOTION_ITEM_PROPERTY.limitMoney
                        }, {
                            name: 'minMoney',
                            fieldLabel: PROMOTION_ITEM_PROPERTY.minMoney,
                            maxLength: 40,
                            maxLengthText: '最多输入40个字符',
                            allowBlank: false,
                            blankText: PROMOTION_ITEM_PROPERTY.minMoney
                        }, {
                            name: 'maxMoney',
                            fieldLabel: PROMOTION_ITEM_PROPERTY.maxMoney,
                            maxLength: 40,
                            maxLengthText: '最多输入40个字符',
                            allowBlank: false,
                            blankText: PROMOTION_ITEM_PROPERTY.maxMoney
                        }, {
                            name: 'discount',
                            fieldLabel: PROMOTION_ITEM_PROPERTY.discount,
                            maxLength: 40,
                            maxLengthText: '最多输入40个字符',
                            allowBlank: false,
                            blankText: PROMOTION_ITEM_PROPERTY.discount
                        }, {
                            name: 'reduceMoney',
                            fieldLabel: PROMOTION_ITEM_PROPERTY.reduceMoney,
                            maxLength: 40,
                            maxLengthText: '最多输入40个字符',
                            allowBlank: false,
                            blankText: PROMOTION_ITEM_PROPERTY.reduceMoney
                        }
                    ]
                }
            ]
        });

        var win = null;
        win = new Ext.Window({
            title: "增加促销项",
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

                    var addPromotionUrl = "/api/admin/promotion/" + promotion.id + "/items";

                    var values = formpanel.getForm().getValues();
                    var item = {};
                    item.promotionId = promotion.id ;
                    item.promotionType = values.promotionType;
                    item.limitMoney = values.limitMoney;
                    item.minMoney = values.minMoney;
                    item.maxMoney = values.maxMoney;
                    item.discount = values.discount;
                    item.reduceMoney = values.reduceMoney;

                    if( item.minMoney>item.maxMoney)
                    {
                    	
                    	Ext.Msg.alert('错误提示','最小金额不能大于最大金额');
                		return;
                    }
                
                    
                    Soul.Ajax.request({
                        url : addPromotionUrl,
                        jsonData : item,
                        headers : {
                            Accept : 'application/json'
                        },
                        loadMask : true,
                        loadMsg : '新建促销',
                        success : function(response, opts) {
                            if (typeof callbackFn === 'function')
                                callbackFn();
                            win.close();
                        },
                        failure : function(){
                            win.close();
                        }
                    });
                }
            }, {
                text: LABEL.cancel,
                handler: function () {
                    win.close();
                }
            }]
        });

        win.show();

    },

    doDelPromotionProcessFunction: function (records, callbackFn) {
        var promotion = records[0].data;

        var url = "/api/admin/promotion/" + promotion.id;
        Soul.Ajax.restAction(url, "delete", null, null, function (ret) {
            callbackFn();
        }, null, null, null);
    },

    doSettingPromotionProcessFunction: function (records, callbackFn) {
    	var promotion = records[0].data;
    	
        Ext.apply(Ext.form.VTypes, {
            dateValue: function (value, field) {
                var start = field.up('form').down('field[name=beginDate]');
                var end = field.up('form').down('field[name=endDate]');

                if (start == null || end == null) {
                    return true;
                }

                if (start.getValue() > end.getValue()) {
                    return false;
                } else {
                    return true;
                }
            }
        });

        var formpanel = new Ext.FormPanel({
            labelWidth: 60,
            width: 600,
            frame: true,
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'container',
                    columnWidth: 1,
                    autoHeight: true,
                    defaults: {
                        xtype: 'textfield',
                        labelAlign: 'right',
                        width: 500
                    },
                    items: [
                        {
                            name: 'name',
                            fieldLabel: PROMOTION_PROPERTY.name,
                            maxLength: 40,
                            maxLengthText: '最多输入40个字符',
                            allowBlank: false,
                            value: promotion.name,
                            blankText: PROMOTION_PROPERTY.name
                        },
                        Module.YB.promotion.Tools.getPromotionTypeCombo(promotion.type),
                        Module.YB.promotion.Tools.getPromotionOrderTypeCombo(promotion.supportOrderType), 
                        {
                            xtype: 'datefield',
                            name: 'beginDate',
                            format: 'Y-m-d H:i:s',
                            minValue: new Date(),
                            editable: false,
                            allowBlank: false,
                            disabled: false,
                            fieldLabel: PROMOTION_PROPERTY.beginDate,
                            vtype: 'dateValue',
                            vtypeText: '开始时间不能大于截至时间！',
                            width : 300,
                            value: promotion.beginDate,
                            listeners: {
                                change: function (field) {
                                    var end = field.up('form').down('field[name=endDate]');
                                    if (end == null) return;
                                    end.validate();
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'endDate',
                            format: 'Y-m-d H:i:s',
                            editable: false,
                            allowBlank: false,
                            disabled: false,
                            fieldLabel: PROMOTION_PROPERTY.endDate,
                            vtype: 'dateValue',
                            width : 300,
                            value: promotion.endDate,
                            vtypeText: '截至时间不能小于开始时间！',
                            listeners: {
                                change: function (field) {
                                    var start = field.up('form').down('field[name=beginDate]');
                                    if (start == null) return;
                                    start.validate();
                                },
                                select: function (field, value) {
                                    var time = Ext.Date.add(value, Ext.Date.HOUR, 23);
                                    time = Ext.Date.add(time, Ext.Date.MINUTE, 59);
                                    time = Ext.Date.add(time, Ext.Date.SECOND, 59);
                                    field.setValue(time);
                                }
                            }
                        },
                        {
                            xtype: 'textarea',
                            name: 'desc',
                            fieldLabel: PROMOTION_PROPERTY.desc,
                            readOnly: false,
                            allowBlank: true,
                            value: promotion.desc,
                            blankText: PROMOTION_PROPERTY.desc
                        }]
                }
            ]
        });

        var win = null;
        win = new Ext.Window({
            title: "修改促销",
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
                    var values = formpanel.getForm().getValues();

                    var addPromotionUrl = "/api/admin/promotion/"+ records[0].data.id;

                    var promotion = {};
                    promotion.name = values.name;
                    promotion.desc = values.desc;
                    promotion.endDate = values.endDate;
                    promotion.beginDate = values.beginDate;
                    promotion.type = values.type;
                    promotion.isOnly = false;        
                    promotion.supportOrderType=values.supportOrderType.join(",");
   
                    Soul.Ajax.restAction(addPromotionUrl, 'PUT', null, Ext.encode(promotion), function(){
                    	
                    	  if (typeof callbackFn === 'function')
                              callbackFn();
                          win.close();
                    	
                    }, null, null);   
                }
            }, {
                text: LABEL.cancel,
                handler: function () {
                    win.close();
                }
            }]
        });

        win.show();
    
    },

    doChangeStatusPromotionProcessFunction: function (records, callbackFn) {
        var promotion = records[0].data;

        var url = "/api/admin/promotion/" + promotion.id + "/status?";
        var params = {};
        if (promotion.status == 1) {
            url += "status=0";
        } else {
            url += "status=1";
        }
        Soul.Ajax.restAction(url, "put", params, null, function (ret) {
            callbackFn();
        }, null, null, null);
    }
});