Ext.define('Module.Operate.articleType.Operation', {
    singleton: true,

    requires: [
        'Soul.util.HelpUtil',
        'Soul.util.ObjectView',
        'Soul.view.WizardWindow',
        'Soul.util.ObjectConfig',
        'Soul.ux.EmailDomainBox',
        'Module.Operate.articleType.Tools'
    ],

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
                },
                    Module.Operate.articleType.Tools.getArticleModelCombo(null),
                    Module.Operate.articleType.Tools.getArticleStatusCombo("open"),
                    {
                        xtype: 'textarea',
                        name: 'describtion',
                        fieldLabel: ARTICLE_LABEL.describtion,
                        readOnly: false,
                        allowBlank: true,
                        blankText: ARTICLE_LABEL.describtion

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

                    var importUrl = "/api/admin/articleType/";
                    formpanel.submit({
                        url: importUrl,
                        method: 'POST',
                        waitMsg: '正在创建文章分类请稍候...',
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
                    name: 'tag',
                    fieldLabel: ARTICLE_LABEL.tag,
                    maxLength: 40,
                    maxLengthText: '最多输入40个字符',
                    allowBlank: true,
                    value: data.tag,
                    blankText: ARTICLE_LABEL.tag

                }, {
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
                    Module.Operate.articleType.Tools.getArticleModelCombo(data.module),
                    Module.Operate.articleType.Tools.getArticleStatusCombo(data.state),
                    {
                        xtype: 'textarea',
                        name: 'describtion',
                        fieldLabel: ARTICLE_LABEL.describtion,
                        readOnly: false,
                        allowBlank: true,
                        value: data.describtion,
                        blankText: ARTICLE_LABEL.describtion
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
                    params['describtion'] = params['describtion'].replace(new RegExp('%', 'gm'), '%25');

                    Soul.Ajax.restAction('/api/admin/articleType/' + data.id, 'PUT', Ext.encode(params), null, callbackFun, null, null);
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

    doChangeArticleStateFunc: function (records, state, callbackFn) {

        if (records.length == 0) {
            Ext.Msg.alert('请选中需要修改的分类！');
            return false;
        }
        for (var i = 0; i < records.length; i++) {
            var params = records[i].data;
            params.state = state;
            var url = "/api/admin/articleType/" + params.id + "/state";
            Soul.Ajax.restAction(url, "put", null, Ext.encode(params), function (ret) {
                callbackFn();
            }, null, null, null);
        }
    },
    doDelArticleFunc: function (records, callbackFn) {
        if (records.length == 0) {
            Ext.Msg.alert('请选中需要删除的分类！');
            return false;
        }

 
        Ext.Msg.confirm('', Ext.String.format('确定要删除选中的[{0}]条分类?', records.length), function (button, text) {
            if (button == "yes") {
                for (var i = 0; i < records.length; i++) {
                    var params = records[i].data;
                    
                    var url_get = "/api/admin/acrticleType/"+params.id+"/acrticle/";
                    var articles = Soul.Ajax.getSyncData(url_get, null);
                    var url = "/api/admin/articleType/" + params.id;  
                    if(articles.length>0)
                    {
                    	  Ext.Msg.confirm('', Ext.String.format('分类 [{0}]中包含{1}条文章，删除该分类，对应的文章也将一并删除，是否任然确认删除?', params.name,articles.length), function (button, text) {
                              if (button == "yes") {
                            	  Soul.Ajax.restAction(url, "DELETE", null, Ext.encode(params), function (ret) {
                            		  callbackFn();
                            	  }, null, null, null);
                              }
                          });
                    	
                    }else{
                    	 Soul.Ajax.restAction(url, "DELETE", null, Ext.encode(params), function (ret) {
                   		  callbackFn();
                   	  }, null, null, null);  	
                    }               
                }
            }
        });
    }

});