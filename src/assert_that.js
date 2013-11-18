var assert_that = (function () {
    var assertions = {};

    var module = function (toAssert) {
        var assertable = {};
        var session = {};
        var lastCalls = [];

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
                        return module.getMessage(name, toAssert, lastCalls);
                    }
                };
                lastCalls.push({assertionName: name, callArgs: callArgs});
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

    module.define = function (name, fn) {
        assertions[name] = fn;
    };

    module.prettify = function (obj) {
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

    module.getMessage = function (assertionName, toAssert, lastCalls) {
        var message = 'assert_that(' + module.prettify(toAssert) + ')';
        lastCalls.forEach(function (lastCall) {
            var prettyCallArgs;
            if (lastCall.callArgs instanceof Array) {
                prettyCallArgs = lastCall.callArgs.map(function (item) { return module.prettify(item); }, this).join(',');
            } else {
                prettyCallArgs = module.prettify(lastCall.callArgs);
            }
            message += '.' + lastCall.assertionName + '(' + prettyCallArgs + ')';
        });
        return message;
    };

    return module;
})();

