STORE_SHOP_COMBO = {
    status: [['inuse', '正常使用'], ['delete', '已经删除'], ['expire', '欠费']],
};

SHOP_MODULE_BILLING_COMBO = {
    status: [['obsolete', '过期'], ['online', '在线'], ['unused', '未使用']],
};

SHOP_MODULE_COMBO = {
    status: [['online', '正常使用'], ['delete', '已经删除'], ['expire', '欠费'], ['pause', '暂停']],
};

STORE_LABEL = {
    ctime:"创建时间",
    utime:"更新事件",
    status:"状态",
    logo:"标志",
    name:"店铺名称",
    code:"店铺唯一code",
    createUserId:"创建者ID",
    appId:"appId",
    id:"主键",
    soUserId:"服务商用户ID",
    storeOwnerId:"服务商ID",
    viewTplId:"显示模板ID",
    lastStaticTime:"上次静态化时间",
    lastStaticTask:"上次静态化任务",
    lastCountTime:"上次统计时间",
    business:"店铺功能（业务）",

    shopType:"店铺类型",

    linkman:"联系人",
    telephone:"电话",
    email:"邮箱",
    city:"城市",
    address:"地址",
    contacts:"备注",

    editStore:"编辑",
    executeStatistics:"执行统计",
    statisticsDetail:"统计明细",
    shopDetial:"店铺明细",

    storeStatisticsDetialTitle:"管理-统计明细-【{0}】",
    storeShopDetialTitle:"管理-店铺明细-【{0}】"

};

STORESHOP_LABEL={
	recoverShop:"恢复站点",
    editShop:"编辑站点",
    staticShop:"静态化站点",
    opertionShop:"站点操作",
    noShop:"没有站点",
    shop:"服务商站点管理",
    shopModule:"站点模块管理"
}


STOREOWNER_LABEL = {
    id:"ID",
    ctime:"创建时间",
    utime:"更新时间",
    status:"状态",
    note:"备注",
    contacts:"联系人",
    phone:"联系电话",
    qq:"QQ号码",
    wechat:"微信号",
    email:"邮件",
    userId:"用户ID",
    storeType:"服务商类型",
    city:"城市",
    address:"地址",
    storeNum:"店铺个数",
    lastCountTime:"上次统计时间",
};



MODULE_COMBO = {
    source : {
        SYSTEM : "系统",
        USER : "用户"
    }
};
MODULE_MANAGER = {
    NAME:"模块管理"
};

BILLING_LABEL = {
    id : "ID",
    name:"名称",
    moduleId:"模块ID",
    billingType:"计费类型",
    price:"价格",
    createUserId:"创建者ID",
    serviceTime:"时长/次数",
    onlyOne:"是否使用（购买）一次",
    global:"是否全局",
    ctime : "创建时间",
    utime : "修改时间",
    status:"状态",
    description:"描述",
    manageBillingTitle:"计费方式管理-【{0}】",
    addBilling:"添加",
    editBilling:"编辑",
    delBilling:"删除",

    defaultBilling:"设置为默认"
};



BILLING_MESSAGE ={
    noBilling:"对应模块没有相关计费数据"
};

CONFIG_LABEL = {
    id : "ID",
    name:"名称",
    moduleId:"模块ID",
    key:"配置KEY",
    type:"配置类型",
    createUserId:"创建者ID",
    maxNum:"支持个数",
    isOrder:"是否需要按照顺序",
    required:"是否必填",
    ctime : "创建时间",
    utime : "修改时间",
    defaultValue:"默认值",

    manageConfigTitle:"可配置项管理-【{0}】",
    addConfig:"添加",
    editConfig:"编辑",
    delConfig:"删除"
};

SHOP_MODULE_BILLING_LABEL = {
    id : "ID",
    btime:"购买时间",
    status:"状态",
    billingType:"计费类型",
    type:"配置类型",
    money:"费用",
    name:"模块名称",
    startTime:"起始时间",
    endTime:"截止时间",
    note : "备注",

    opUserId : "操作用户ID",
    opUserName:"操作人",
    shopId:"站点Id",
    moduleId:"模块Id",
    serviceTime:"服务时长",
    usedTime:"已使用时长"
};
SHOP_MODULE_LABEL={
    id : "ID",
    ctime:"创建时间",
    utime:"更新时间",
    btime:"开始使用时间",
    etime:"到期时间",
    currentBillingEtime:"当前计费包到期时间",
    status:"状态",
    name:"模块名称",
    moduleId:"关联的模块ID",
    shopId:"站点ID",
};


