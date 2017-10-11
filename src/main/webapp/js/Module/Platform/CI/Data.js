Ext.define('Module.Platform.CI.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],

   	ciTypeCombo : [ [ "淘宝", "淘宝" ],[ "冲印门店", "冲印门店" ], [ "图文快印", "图文快印"] , [ "摄影写真", "摄影写真"] , [ "印刷企业", "印刷企业"] , [ "个人", "个人"] , [ "其他", "其他"] ],
   	
   	statusCombo : [ [ "未沟通", "未沟通" ], [ "无回复", "无回复"] , [ "直接拒绝", "直接拒绝"] , [ "有兴趣", "有兴趣"] , [ "已试用", "已试用"] , [ "已购买", "已购买"] ],

   	contactWayCombo :  [ [ "qq", "QQ" ], [ "aliww", "旺旺"] , [ "phone", "电话"] , [ "mobile", "手机"] , [ "wechat", "微信"] , [ "email", "email"] ],

	useProductCombo :  [[ "照片冲印-淘宝", "照片冲印-淘宝"]  , [ "照片冲印-商城", "照片冲印-商城"] , [ "照片冲印-工具", "照片冲印-工具"],[ "照片书-淘宝", "照片书-淘宝"], [ "照片书-商城", "照片书-商城" ], [ "文件打印-工具", "文件打印-工具"] , [ "文件打印-商城", "文件打印-商城"]  ],

   	loadData : function(){
   		return;
   	},

   	updateAll : function(fn){
    	var callbackFn = function(){
    		Soul.Ajax.executeFnAfterLoad(fn);
    	};
    	callbackFn();
    },

    constructor : function() {
      this.callParent(arguments);
    }
});