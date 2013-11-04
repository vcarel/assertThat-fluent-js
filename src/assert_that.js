var assertThat = (function () {
    var assertions = {};

    var _assertThat = function (toAssert) {
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
                        return _assertThat.getMessage(name, toAssert, lastCalls);
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

    _assertThat.getMessage = function (assertionName, toAssert, lastCalls) {
        var message = 'assertThat(' + _assertThat.prettify(toAssert) + ')';
        lastCalls.forEach(function (lastCall) {
            var prettyCallArgs;
            if (lastCall.callArgs instanceof Array) {
                prettyCallArgs = lastCall.callArgs.map(function (item) { return _assertThat.prettify(item); }, this).join(',');
            } else {
                prettyCallArgs = _assertThat.prettify(lastCall.callArgs);
            }
            message += '.' + lastCall.assertionName + '(' + prettyCallArgs + ')';
        });
        return message;
    };

    return _assertThat;
})();
