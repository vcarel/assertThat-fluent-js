(function () {

    assertThat.define('is', function(context) {
        var expected = context.callArgs[0];
        var actual = context.toAssert;
        deepEqual(actual, expected, context.getMessage());
    });

    assertThat.define('isNot', function(context) {
        var notExpected = context.callArgs[0];
        var actual = context.toAssert;
        notDeepEqual(actual, notExpected, context.getMessage());
    });

    assertThat.define('throws', function(context) {
        var expected = context.callArgs[0];
        var toExecute = context.toAssert;

        // QUnit cannot distinguish exceptions based on their content. It only compares their types.
        if (expected instanceof Function) {
            // Using QUnit when expected is a function, assuming it is the constructor of an Exception object.
            throws(toExecute, expected, context.getMessage());
        } else {
            var actual;
            try {
                context.toAssert();
            } catch (e) {
                actual = e;
            }
            if (expected === undefined) {
                notStrictEqual(undefined, actual, context.getMessage());
            } else {
                strictEqual(actual, expected, context.getMessage());
            }
        }
    });

})();

