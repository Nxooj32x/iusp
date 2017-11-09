;(function(root,factory){
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.IuspMsg = factory();
    }
})(this,function(){
//业务逻辑
    return {
        tip:function(title,content){
            this.destory("sys-msg");
            var d = dialog({
                id:"sys-msg",
                title:title,
                fixed: true,
                width:300,
                content: content
            });
            d.show();
            $("div[aria-labelledby='title:sys-msg']").css("top","10px");
            setTimeout(function () {
                d.close().remove();
            }, 2000);
        },
        warm:function(message,okFunc){
            this.destory("sys-warm");
            var d = dialog({
                id:"sys-warm",
                title: '警告',
                width:300,
                content: message,
                okValue: '确 定',
                ok: function() {
                    if (typeof (okFunc) == "function"){
                        okFunc();
                    }
                    d.close().remove();
                },
            });
            d.showModal();
        },
        error:function(content){
            this.destory("sys-error");
            var d = dialog({
                id:"sys-error",
                fixed: true,
                title:"错误",
                width:300,
                content: content
            });
            d.show();
        },
        showModal:function(){

        },
        destory:function(id){
            if(dialog.list[id]){
                dialog.list[id].close().remove();
            }
        },
        confirm:function(title,content,ok,cancel){
            this.destory("sys-confirm");
            var d = dialog({
                id:"sys-confirm",
                title: title,
                content: content,
                width:300,
                okValue: '确 定',
                ok: function() {
                    if (typeof (ok) == "function"){
                        ok();
                    }
                    d.close().remove();
                },
                cancelValue: '取消',
                cancel: function() {
                    if (typeof (ok) == "function"){
                        cancel();
                    }
                    d.close().remove();
                }
            });
            d.showModal();
        }
    };
});
