Ext.onReady(function(){
    Ext.Loader.setConfig({enabled:true});
    Ext.Loader.setPath('module', '/RES/js/mvc/module');
    Ext.application({
        requires : [ 'Ext.container.Viewport'],
        controllers : [
            'BaseConfig'
        ],

        name : 'app',

        appFolder : '/RES/js/mvc/app',

        appConfig : null,

        launch:function(){
            var me = this;
            Ext.QuickTips.init();
            var  baseConfig = me.getController("BaseConfig");
        }

    })
});