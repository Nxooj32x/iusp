Ext.define('Module.Platform.TradeRecord.model.TradeRecordModel', {
	extend : 'Ext.data.Model',
	fields : ["id", "code", "inAccoutId", "outAccoutId", "applyTime", 
	          "completeTime", "money", "payMoney", "tansMoney", "busType", "busDesc", "payType",
	          "status", "opUserId", "opUserName", "frozenCode", "outTradeCode", "payWay", "productId", "productUserId", "productNum"]
});