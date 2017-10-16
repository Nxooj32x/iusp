Ext.define("app.controller.BaseConfig",{
    extend : 'Ext.app.Controller',
    models:[
        'app.module.account.user.model.UserModel'
    ],
    init:function(){
        var userModel = this.getModel('app.module.account.user.model.UserModel');
        console.dir(userModel);
    },
    bind:function(){

    },
    load:function(){

    },
    reload:function(){

    },
    events:[],
    tirgger:function(event,param){

    }
});