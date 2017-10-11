Ext.define('Module.Operate.article.Operation', {
    singleton: true,

    requires: [
        'Soul.util.HelpUtil',
        'Soul.util.ObjectView',
        'Soul.view.WizardWindow',
        'Soul.util.ObjectConfig',
        'Soul.ux.EmailDomainBox',
        'Module.Operate.article.Tools'
    ],

    getArticleTypeDataFunction: function () {
        var url = '/api/admin/acrticleType/state/open';
        var scopeCodeData = Soul.Ajax.getSyncData(url, null);
        return scopeCodeData;
    },

    doAddArticleFunction: function (callbackFun) {
        var formpanel = new Ext.FormPanel({
            labelWidth: 60,
            width: 400,
            frame: true,
            layout: {
                type: 'column'
            },
            items: [{
                xtype: 'container',
                columnWidth: .50,
                autoHeight: true,
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 250
                },
                items: [{
                    name: 'name',
                    fieldLabel: ARTICLE_LABEL.name,
                    maxLength: 40,
                    maxLengthText: '最多输入40个字符',
                    allowBlank: false,
                    blankText: ARTICLE_LABEL.name
                }, {
                    name: 'alias',
                    fieldLabel: ARTICLE_LABEL.alias,
                    maxLength: 40,
                    maxLengthText: '最多输入40个字符',
                    allowBlank: false,
                    blankText: ARTICLE_LABEL.alias
                }, {
                    name: 'tag',
                    fieldLabel: ARTICLE_LABEL.tag,
                    maxLength: 40,
                    maxLengthText: '最多输入40个字符',
                    allowBlank: true,
                    blankText: ARTICLE_LABEL.tag
                }, {
                    xtype: 'numberfield',
                    allowDecimals: false,
                    minValue: 1,
                    step: 1,
                    name: 'seq',
                    fieldLabel: ARTICLE_LABEL.seq,
                    allowBlank: true,
                    blankText: ARTICLE_LABEL.seq
                }, Module.Operate.article.Tools.getArticleTypeCombo(null),
                    Module.Operate.article.Tools.getArticleStatusCombo("open"),
                    {
                        name: 'keywords',
                        fieldLabel: ARTICLE_LABEL.keywords,
                        readOnly: false,
                        allowBlank: false,
                        blankText: ARTICLE_LABEL.keywords
                    }, {
                        name: 'description',
                        fieldLabel: ARTICLE_LABEL.description,
                        readOnly: false,
                        allowBlank: false,
                        blankText: ARTICLE_LABEL.description
                    }]
            }]
        });

        var win = null;
		win = new Ext.Window({
            title: ARTICLE_LABEL.addArticle,
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
                    var importUrl = "/api/admin/article/";
                    formpanel.submit({
                        url: importUrl,
                        method: 'POST',
                        waitMsg: '正在创建文章请稍候...',
                        success: function (fp, o) {
                        	callbackFun();
                            win.close();
                        },
                        failure: function (fp, o) {
                        	callbackFun();
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

    doEditArticleFunction: function (data, callbackFun) {
        var formpanel = new Ext.FormPanel({
            labelWidth: 60,
            width: 400,
            frame: true,
            layout: {
                type: 'column'
            },
            items: [{
                xtype: 'container',
                columnWidth: .50,
                autoHeight: true,
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'right',
                    width: 250
                },
                items: [{
                    name: 'name',
                    fieldLabel: ARTICLE_LABEL.name,
                    maxLength: 40,
                    maxLengthText: '最多输入40个字符',
                    allowBlank: false,
                    value: data.name,
                    blankText: ARTICLE_LABEL.name
                }, {
                    name: 'alias',
                    fieldLabel: ARTICLE_LABEL.alias,
                    maxLength: 40,
                    maxLengthText: '最多输入40个字符',
                    allowBlank: false,
                    value: data.alias,
                    blankText: ARTICLE_LABEL.alias
                }, {
                    name: 'tag',
                    fieldLabel: ARTICLE_LABEL.tag,
                    maxLength: 40,
                    maxLengthText: '最多输入40个字符',
                    allowBlank: true,
                    value: data.tag,
                    blankText: ARTICLE_LABEL.tag
                },{
                    xtype: 'numberfield',
                    allowDecimals: false,
                    minValue: 1,
                    step: 1,
                    name: 'seq',
                    fieldLabel: ARTICLE_LABEL.seq,
                    allowBlank: true,
                    value: data.seq,
                    blankText: ARTICLE_LABEL.seq
                },
                    Module.Operate.article.Tools.getArticleTypeCombo(data.articleTypeId),
                    Module.Operate.article.Tools.getArticleStatusCombo(data.state),
                    {

                        name: 'keywords',
                        fieldLabel: ARTICLE_LABEL.keywords,
                        readOnly: false,
                        allowBlank: false,
                        value: data.keywords,
                        blankText: ARTICLE_LABEL.keywords
                    }, {
                        name: 'description',
                        fieldLabel: ARTICLE_LABEL.description,
                        readOnly: false,
                        allowBlank: false,
                        value: data.description,
                        blankText: ARTICLE_LABEL.description
                    }]
            }]
        });

        var win = null;
		win = new Ext.Window({
            title: ARTICLE_LABEL.editArticle,
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
                    params['name'] = params['name'].replace(new RegExp('%', 'gm'), '%25');
                    params['alias'] = params['alias'].replace(new RegExp('%', 'gm'), '%25');
                    params['keywords'] = params['keywords'].replace(new RegExp('%', 'gm'), '%25');
                    params['description'] = params['description'].replace(new RegExp('%', 'gm'), '%25');

                    Soul.Ajax.restAction('/api/admin/article/' +  data.id, 'PUT', Ext.encode(params), null, callbackFun, null, null);
                	callbackFun();
                    win.close();

                }
            }, {
                text: LABEL.cancel,
                handler: function () {
                	callbackFun();
                    win.close();
                }
            }]
        });

        win.show();
    },


    doEditArticleContentFunction: function (data, callbackFun) {
        window.open( "/admin/article/" + data.id+"/content" );
    },


    doChangeArticleStateFunc: function (records, state, callbackFn) {

        if (records.length == 0) {
            Ext.Msg.alert('请选中需要修改的文章！');
            return false;
        }
        for (var i = 0; i < records.length; i++) {
            var params = records[i].data;
            params.state = state;
            var url = "/api/admin/article/" + params.id + "/state";
            Soul.Ajax.restAction(url, "put", null, Ext.encode(params), function (ret) {
                callbackFn();
            }, null, null, null);
        }
    },
    doDelArticleFunc: function (records, callbackFn) {
        if (records.length == 0) {
            Ext.Msg.alert('请选中需要删除的文章！');
            return false;
        }

        Ext.Msg.confirm('', Ext.String.format('确定要删除选中的[{0}]篇文章?', records.length), function (button, text) {
            if (button == "yes") {
                for (var i = 0; i < records.length; i++) {
                    var params = records[i].data;
                    var url = "/api/admin/article/" + params.id;
                    Soul.Ajax.restAction(url, "DELETE", null, Ext.encode(params), function (ret) {
                        callbackFn();
                    }, null, null, null);
                }


            }
        });
    }

});