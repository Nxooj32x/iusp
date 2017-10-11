Ext.define('Module.Store.cashmanager.Operation', {
    singleton: true,

    requires: [
        'Soul.util.HelpUtil',
        'Soul.util.ObjectView',
        'Soul.view.WizardWindow',
        'Soul.util.ObjectConfig',
        'Soul.ux.EmailDomainBox',
        'Module.Store.cashmanager.Renderer',
        'Module.Store.cashmanager.Tools'
    ],
    doManagerDetailCashFunction: function (data,keyupFunc,callbackFun) {

        var way = Ext.create("Ext.data.Store", {
            fields: ["Name", "Value"],
            data: [
                { Name: "支付宝", Value: "alipay" },
                { Name: "微信", Value: "wechat" },
                { Name: "银联", Value: "bank" }
            ]
        });
        var status = Ext.create("Ext.data.Store", {
            fields: ["Name", "Value"],
            data: [
                { Name: "提现成功", Value: "success" },
                { Name: "提现失败", Value: "failure" }
            ]
        });


        var pal = Ext.create('Ext.form.Panel', {
            id:"cashForm",
            bodyPadding: 5,
            width: 350,
            url: '',
            method:'put',
            // 表单域 Fields 将被竖直排列, 占满整个宽度
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            // The fields
            items: [{
                xtype : 'textfield',
                fieldLabel:CASH_LABEL.applyCashMoney,
                id: 'applyCashMoney',
                name:'applyCashMoney',
                allowBlank: false,
                enableKeyEvents:true,
                value:data.applyCashMoney,
                disabled:true
            },{
                xtype: 'numberfield',
                allowDecimals: true,
                minValue: 1,
                step: 1,
                fieldLabel:CASH_LABEL.commission,
                id: 'commission',
                name:'commission',
                allowBlank: false,
                enableKeyEvents:true,
                value:data.commission,
                disabled:false
            },{
                xtype : 'combobox',
                fieldLabel: CASH_LABEL.way,
                id: 'way',
                name:'way',
                displayField: "Name",
                store: way,
                editable: false,
                valueField: "Value",
                emptyText: "--请选择--",
                allowBlank: false,
                enableKeyEvents:true,
                value:data.way,
                disabled:true
            },{
                xtype : 'textfield',
                fieldLabel: CASH_LABEL.applyTime,
                id: 'applyTime',
                name:'applyTime',
                allowBlank: false,
                enableKeyEvents:true,
                value:Ext.util.Format.date(new Date(data.applyTime), 'Y-m-d H:i:s'),
                disabled:true
            },{
                xtype: 'numberfield',
                allowDecimals: true,
                minValue: 1,
                step: 1,
                fieldLabel:CASH_LABEL.actualCashMoney,
                id: 'actualCashMoney',
                name:'actualCashMoney',
                allowBlank: false,
                enableKeyEvents:true,
                disabled:false
            },{
                xtype : 'combobox',
                fieldLabel: CASH_LABEL.status,
                id: 'status',
                name:'status',
                displayField: "Name",
                store: status,
                editable: false,
                valueField: "Value",
                emptyText: "--请选择--",
                allowBlank: false,
                enableKeyEvents:true,
                listeners: {
                    keyup: keyupFunc
                }
            },{
                xtype : 'textfield',
                fieldLabel:"第三方支付流水号",
                id: 'targetOutCode',
                name:'targetOutCode',
                allowBlank: false,
                enableKeyEvents:true,
                disabled:false
            },{
                xtype : 'textarea',
                fieldLabel: CASH_LABEL.opNote,
                id: 'opNote',
                name:'opNote',
                allowBlank: false,
                enableKeyEvents:true,
                labelSepartor: "：",
                labelWidth: 60,
                width: 230,
                listeners: {
                    keyup: keyupFunc
                }
            }
            ]
        });
        var win = null;
        win = new Ext.Window({
            id:'editCashWin',
            title: CASH_LABEL.editCash,
            items: pal,
            stateful : false,
            autoDestroy:true,
            bodyStyle: 'padding:5px',
            modal:true,
            buttonAlign: 'center',
            buttons: [{
                id:"saveBtn",
                text: LABEL.apply,
                handler: function(){

                    if (!pal.getForm().isValid()) return;

                    var editStoreUrl = "/storeapi/shop/"+data.ownerId+"/cash/"+data.id;

                    var values = pal.getForm().getValues();

                    var status=values.status;
                    if(status=="success"){
                        values.isSuccess =true;
                    }else {
                        values.isSuccess=false;
                    }

                    SureAjax.ajax({
                        url : editStoreUrl,
                        type : "PUT",
                        headers : {
                            Accept : "application/json"
                        },
                        data : {
                            isSuccess : values.isSuccess,
                            accoutCashMoney : values.actualCashMoney,
                            targetOutCode : values.targetOutCode,
                            note : values.opNote,
                            commission : values.commission,
                        },
                        success : function(){
                            if (typeof callbackFun === 'function')
                                callbackFun();
                            win.close();
                        }
                    });
                }
            },{
                text: LABEL.cancel,
                handler: function(){
                    win.close();
                }
            }]
        });

        win.show();
        
    }
});
