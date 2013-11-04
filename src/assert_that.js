var assertThat = (function () {
    var assertions = {};

    var _assertThat = function (toAssert) {
        var assertable = {};
        var session = {};

        var messageFunction = null;
        assertable.within = function (context) {
            messageFunction = context.getMessage;
            return assertable;
        };

        function createAssertion(name) {
            return function () {
                var callArgs = Array.prototype.slice.apply(arguments);
                var context = {
                    toAssert: toAssert,
                    callArgs: callArgs,
                    getMessage: function () {
                        if (messageFunction) {
                            return messageFunction();
                        }
                        return _assertThat.getMessage(name, toAssert, callArgs);
                    }
                };
                assertions[name].call(toAssert, context, session);
                return assertable;
            };
        }

        for (var name in assertions) {
            if (assertions.hasOwnProperty(name)) {
                assertable[name] = createAssertion(name);
            }
        }

        return assertable;
    };

    _assertThat.define = function (name, fn) {
        assertions[name] = fn;
    };

    _assertThat.prettify = function (obj) {
        switch (typeof(obj)) {
            case 'boolean':
                return obj.toString();
            case 'number':
                return obj.toString();
            case 'undefined':
                return 'undefined';
            case 'function':
                if (obj.name) {
                    return 'function ' + obj.name;
                } else {
                    return 'anonymous function';
                }
        }
        return JSON.stringify(obj);
    };

    _assertThat.getMessage = function (assertionName, toAssert, callArgs) {
        var prettyCallArgs;
        if (callArgs instanceof Array) {
            prettyCallArgs = callArgs.map(function (item) { return this.prettify(item); }, this).join(',');
        } else {
            prettyCallArgs = this.prettify(callArgs);
        }
        return 'assertThat(' + this.prettify(toAssert) + ').'+ assertionName + '(' + prettyCallArgs  + ')';
    };

    return _assertThat;
})();
