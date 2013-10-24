var assertThat = (function () {
    var assertions = {};

    var _assertThat = function (toAssert) {
        var assertable = {};
        var session = {};

        function createAssertion(name) {
            return function () {
                var context = {toAssert: toAssert, callArgs: Array.prototype.slice.apply(arguments)};
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

    return _assertThat;
})();
