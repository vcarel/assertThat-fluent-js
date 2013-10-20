var assertThat = (function () {
    var assertions = {};

    var _assertThat = function (toAssert) {
        function createAssertion(name) {
            return function () {
                assertable._context.callArgs = Array.prototype.slice.apply(arguments);
                assertable._context.toAssert = toAssert;
                assertions[name].call(toAssert, assertable._context);
                return assertable;
            };
        }

        var assertable = {_context: {}};

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

    return _assertThat;
})();
