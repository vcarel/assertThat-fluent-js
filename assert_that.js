var assertThat = (function() {
    var assertions = {};

    var _assertThat = function(target) {
            var assertable = {_context: {}};

            for (var name in assertions) {
                if (assertions.hasOwnProperty(name)) {
                    assertable[name] = createAssertion(name);
                }
            }

            function createAssertion(name) {
                return function () {
                    assertions[name].call(target, assertable._context, Array.prototype.slice.apply(arguments));
                    return assertable;
                };
            }

            return assertable;
        };

    _assertThat.define = function(name, fn) {
        assertions[name] = fn;
    };

    return _assertThat;
})();
