Ext.define('Module.YB.promotion.Portlet', {
    extend: 'Soul.view.ModulePortlet',
    alias: 'widget.PromotionPortlet',

    requires: [
        'Module.YB.promotion.Operation',
        'Module.YB.promotion.Data',
        'Module.YB.promotion.store.PromotionStore'
    ],

    VIEW: {
        'Module.YB.promotion.view.Grid': LABEL.grid
    },

    title: PROMOTION_LABEL.title,

    iconCls: 'md-user',

    moduleName: 'Module.YB.promotion',

    moduleSessionView: 'Module.YB.promotionCurrentView',

    dataObj: Module.YB.promotion.Data,

    configObj: Module.YB.promotion.Config,

    defaultView: 'Module.YB.promotion.view.Grid',

    supportView: ['Module.YB.promotion.view.Grid'],

    havUpdateButton: false,

    initComponent: function () {
        this.callParent(arguments);
    },

    initToolbar: function () {
        var me = this;
        var opt = Module.YB.promotion.Operation;
        var toolbar = this.callParent(arguments),
            addPromotionrMenu = {
                text: "增加",
                iconCls: 'x-add-icon',
                name: 'addPromotion',
                handler: function () {
                    opt.addPromotgion(function () {
                        me.updateView(me);
                    });
                }
            };
        toolbar.push(addPromotionrMenu);
        return toolbar;
    },

    buildPromotionOptMenu: function () {
        var menu = Ext.create('Ext.menu.Menu', {
            name: '促销操作',
            style: {
                overflow: 'visible'     // For the Combo popup
            },
            items: [
                {
                    text: PROMOTION_LABEL.addItem,
                    disabled: false,
                    name: 'addItem',
                    iconCls: 'extensive-add'
                },
                {
                    text: PROMOTION_LABEL.del,
                    disabled: false,
                    name: 'del',
                    iconCls: 'extensive-del'
                },
                {
                    text: PROMOTION_LABEL.change,
                    disabled: false,
                    name: 'change',
                    iconCls: 'extensive-stop'
                }, {
                    text: PROMOTION_LABEL.setting,
                    disabled: false,
                    name: 'setting',
                    iconCls: 'extensive-edit'
                }]
        });
        return menu;
    },
});