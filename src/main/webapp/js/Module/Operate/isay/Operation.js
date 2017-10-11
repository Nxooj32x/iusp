Ext.define('Module.Operate.isay.Operation', {
    singleton: true,

    requires: [
        'Soul.util.HelpUtil',
        'Soul.util.ObjectView',
        'Soul.view.WizardWindow',
        'Soul.util.ObjectConfig',
        'Soul.ux.EmailDomainBox',
        'Module.Operate.isay.Tools',
        'Module.Operate.isay.store.ISayContentStore'
    ],

    viewISayContentFunction: function (isayTopic, callbackFun) {

        var delAction = Ext.create("Ext.Button", {
            text: '删除',
            name: 'delMessageTop',
            iconCls: 'x-del-icon',
            disabled: false
        });

        var isayContentGrid = Ext.create('Module.Operate.isay.view.ISayContentGrid', {
            id: 'isayContentGrid',
            anchor: '100% 100%',
            isayTopicRecord: isayTopic,
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [delAction]
            }],
            isayTopicId: isayTopic.id,
            isayTopicName: isayTopic.topic
        });

        //设置相关的 store api
        var store = Ext.data.StoreManager.lookup("Module.Operate.isay.store.ISayContentStore");
        store.proxy.api = {
            read: "/api/admin/isay/topic/" + isayTopic.id + "/content/"
        };

        var winTitle = Ext.String.format('内容-{0}', isayTopic.topic);

        var win = new Ext.Window({
            title: winTitle,
            items: isayContentGrid,
            width: 1020,
            height: 500,
            layout: 'fit',
            autoDestroy: true,
            modal: true
        });
        win.show();
    }

});