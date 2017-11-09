;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.IuspAjax = factory();
    }
})(this, function () {
//业务逻辑
    return {
        initOptions: function (options) {
            var me = this;
            options = options || new Object();
            var parseError = true;
            if (options.hasOwnProperty("parseError")) {
                parseError = options.parseError;
            }
            options.checkXSS = options.checkXSS || false;
            var successFunc = options.success;
            var errorFunc = options.error;
            options.headers = options.headers || {};
            options.headers.Accept = options.headers.Accept || "application/json";
            if (parseError && options.dataType != 'jsonp') {
                options.error = function (xhr, b, c) {
                    IuspMsg.warm(me.parseResponse(xhr), function () {
                        if (typeof (errorFunc) == "function")
                            errorFunc(xhr);
                    });
                };
            }

            options.success = function (xhr) {
                if (typeof (successFunc) == "function") {
                    if (xhr && xhr.hasOwnProperty('errorNum') && xhr.hasOwnProperty('errorMsg')) {
                        if (parseError && options.dataType != 'jsonp') {
                            IuspMsg.warm(me.parseResponse(xhr), function () {
                                if (typeof (errorFunc) == "function")
                                    errorFunc(xhr);
                            });
                        } else {
                            if (typeof (errorFunc) == "function")
                                errorFunc(xhr);
                        }

                    } else {
                        successFunc(xhr);
                    }
                }
            }
            return options;
        },
        parseResponse:function(response){
            var me = this, errorJson = null;
            var errorMsg = response.responseText;
            if (response.hasOwnProperty("responseJSON")) {
                errorJson = response.responseJSON;
            } else {
                try {
                    errorJson = eval("(" + errorMsg + ")");
                } catch (error) {
                    return;
                }
            }
            return errorJson.errorMsg;
        },
        processUrl: function (url, params) {
            if (url.indexOf("?") < 0) {
                url = url + "?";
            } else {
                url = url + "&";
            }
            if (typeof(params) != 'undefined') {
                for (var key in params) {
                    var temp = key + "=" + params[key];
                    url = url + temp + "&";
                }
            }
            return url;
        },
        xsscheck : function(val) {
            val = val.toString();
            val = val.replace(/[<]/g, "&lt;");
            val = val.replace(/[>]/g, "&gt;");
            val = val.replace(/%3C/g, "&lt;");
            val = val.replace(/%3E/g, "&gt;");
            val = val.replace(/"/g, "&quot;");
            val = val.replace(/'/g, "&#39;");
            val = val.replace(/\n/g, "&#10;");
            val = val.replace(/\r\n/g, "&#10;");
            return val;
        },
        ajax: function (options) {
            options = this.initOptions(options);
            if (options.checkXSS) {
                if (options.data) {
                    for (var p in options.data) {
                        if (options.data[p] != null && typeof(options.data[p]) === 'string' && options.data[p].trim() != "") {
                            options.data[p] = this.xsscheck(options.data[p]);
                        }
                    }
                }
            }
            options.url = this.processUrl(options.url, {});
            $.ajax(options);
        }
    };
});
