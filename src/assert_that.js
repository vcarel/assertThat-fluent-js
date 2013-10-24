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

    return _assertThat;
})();
