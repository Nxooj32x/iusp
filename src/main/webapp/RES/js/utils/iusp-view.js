(function(w){

    var _AllView = {};
    var _AllEvent = {};

    var _isDebug = false;

    w.V = {

        reloadCB : function(){},

        add: function (view, isInit) {
            if (!!view) {
                var check = _AllView[view.name];
                if (!check) {
                    _AllView[view.name] = view;

                    $.each(view.events, function(i, event){
                        var eventView = _AllEvent[event];
                        if (eventView == undefined) {
                            _AllEvent[event] = [];
                        }
                        _AllEvent[event].push(view);
                    });
                    if (_isDebug) {
                        console.log("View Add -> %s", view.name);
                    }
                }
                if (!!isInit) {
                    !!view.init && view.init();
                }
            }
        },

        find: function (name) {
            return _AllView[name];
        },

        trigger: function (event, param) {

            function triggerE(e) {
                var views = _AllEvent[e];
                if (!!views) {
                    if (_isDebug) {
                        console.log("View trigger view ->");
                        console.table(views);
                    }
                    if (views.length == 1) {
                        return views[0].trigger(e, param);
                    } else {
                        $.each(views, function(i, view){
                            view.trigger(e, param);
                        });
                    }
                }
            }

            if (_isDebug) {
                console.log("View trigger event -> %s", event);
            }

            if ($.isArray(event)) {
                if ($.inArray(event, 'eReload')) {
                    V.reloadCB();
                }
                $.each(event, function(i, e) {
                    triggerE(e, param);
                })

            } else {
                if (event == "eReload")
                    V.reloadCB();
                return triggerE(event, param);
            }
        },

        init: function (name, cb) {
            if (!!name) {
                var view = _AllView[name];
                !!view.init && view.init();
            } else {
                for (var key in _AllView) {
                    var view = _AllView[key];
                    !!view.init && view.init();
                }
            }
            if (!!cb)
                this.reloadCB = cb;
        },

        load : function (name, cb) {
            if (!!name) {
                var view = _AllView[name];
                !!view.load && view.load();
            } else {
                for (var key in _AllView) {
                    var view = _AllView[key];
                    !!view.load && view.load();
                }
            }
            !!cb && cb();
        },

        reload : function (name, cb) {
            this.reloadCB();
            if (!!name) {
                var view = _AllView[name];
                !!view.reload && view.reload();
            } else {
                for (var key in _AllView) {
                    var view = _AllView[key];
                    !!view.reload && view.reload();
                }
            }
            !!cb && cb();
        },

        show : function() {
            console.table(_AllView);
            console.table(_AllEvent);
        }
    };
})(window);