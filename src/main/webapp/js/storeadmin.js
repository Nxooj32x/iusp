var ybApp = Ext.application({
	requires : [ 'Ext.container.Viewport', 'Soul.Ajax'],

	controllers : [
	               'AppConfig',
	               'BaseConfig',
	               'Login'
	],

	name : 'StoreAdmin',

	appFolder : '/js/StoreAdmin',
	
	appConfig : null,

	launch : function() {
		var me = this;
		Ext.QuickTips.init();
		
		var cfg = Ext.Loader.getConfig();
		cfg.enabled = true;
		Ext.Loader.setConfig(cfg);
		Ext.Loader.setPath('Soul', '/js/lib/Soul');
		Ext.Loader.setPath('Module', '/js/Module');
		
		//设置state处理器
		var cp = Ext.create('Ext.state.LocalStorageProvider', {
		});
		Ext.state.Manager.setProvider(cp);
		
		
		//获取登录信息
		SureAuthInfo.init();
		var saki = SureAuthInfo.getAccessKeyId() || 'none';
		var loginName = SureAuthInfo.getLoginName();
		
		var BaseConfig = this.getModel('BaseConfig');
		BaseConfig.load("", {
		    success: function(bc) {
		    	//获取语言文件
		    	me.getController("BaseConfig").getLanguageFile(bc.data.language);
		    	
		    	me.saveAppId(bc.data.appId);
		    	
		    	//设置title
		    	document.title = bc.data.headerTitle;
		    	//初始化APP
		    	if (saki != 'none')
		    		me.initApp(bc.data, loginName);
		    	else 
		    		me.initLogin(bc.data, saki);
		    }
		});
	},
	
	saveAppId : function(appId){
		sessionStorage.setItem("appId", appId);
	},
	
	initApp :function(bc, loginName){
		var appC = this.getController("AppConfig");
		appC.initSingleWin(bc, loginName, appC);
	},
	
	initLogin :function(bc){
		var loginWin = Ext.create('StoreAdmin.view.app.LoginWindow');
		var loginPortal = Ext.create('Soul.view.LoginPortal', {
				useLoginWin : true,
				loginWin : loginWin,
				baseConfig : bc
			});
		loginPortal.initLoginWin();
	}

});