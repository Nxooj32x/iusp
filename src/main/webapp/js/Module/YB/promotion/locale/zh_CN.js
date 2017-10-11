PROMOTION_LABEL = {
    title : "促销管理",

    change : "改变状态",
    setting : "设置",
    addItem : "添加促销项",
    del : "删除"
};

PROMOTION_PROPERTY = {
    id : "促销ID",
    name : "促销名",
    desc : "描述",
    type : "类型",
    status : "状态",
    isOnly: "独享",
    supportOrderType: "支持订单类型",
    beginDate : "开始时间",
    endDate : "结束时间"
};

PROMOTION_ITEM_PROPERTY = {
    id : "ID",
    promotionId : "促销ID",
    promotionType : "类型",
    limitMoney : "限制金额",
    minMoney : "最小金额",
    maxMoney: "最大金额",
    discount: "折扣",
    orderType: "支持订单类型",
    reduceMoney : "减免金额"
};

PROMOTION_DATA = {
    proType : {
        '0': '商品-减去固定金额',
        '1': '商品-享受折扣',
        '2': '运费-减去固定金额',
        '3': '运费-享受折扣'
    },
    proStatus : {
        '1' : '进行中',
        '0' : '停止'
    },
    proIsOnly : {
        'true' : '独享',
        'false' : '非独享'
    },
    proItemType : {
        '0' : "折扣",
        '1' : "减免"
    }
};


PROMOTION_COMBO = {
    type : [
        [0,'商品-减去固定金额'],
        [1,'商品-享受折扣'],
        [2,'运费-减去固定金额'],
        [3,'运费-享受折扣']
    ],
    orderType : [
            ["BOOK",'书册'],
            ["PHOTO",'照片']

        ],
    itemType : [
        [0,'折扣'],
        [1,'减免']
    ]
};
