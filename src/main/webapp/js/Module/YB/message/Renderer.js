Ext.define('Module.YB.message.Renderer', {
	singleton: true,

	requires  : [
		'Soul.util.RendererUtil',
		'Soul.util.GridRendererUtil',
		'Module.YB.message.Tools',
		'Module.YB.message.model.MessageModel'
	],

	//消息类型
	translateMessageType : function(v) {
		var messageType = MESSAGE_DATA.type[v];
		if(messageType){
			return messageType;
		}
		return v;
	}
});