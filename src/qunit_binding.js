assertThat.define('is', function(context) {
    var expected = context.callArgs[0];
    var actual = context.toAssert;
    deepEqual(actual, expected);
});

assertThat.define('isNot', function(context) {
    var notExpected = context.callArgs[0];
    var actual = context.toAssert;
    notDeepEqual(actual, notExpected);
});

assertThat.define('throws', function(context) {
    var expected = context.callArgs[0];
    var callback = context.toAssert;

    // QUnit cannot distinguish exceptions based on their content. It only compares their types.
    if (expected instanceof Function) {
        // Using QUnit when expected is a function, assuming it is the constructor of an Exception object.
        throws(callback, expected);
    } else {
        var actual;
        try {
            context.toAssert();
        } catch (e) {
            actual = e;
        }
        if (expected === undefined) {
            notStrictEqual(undefined, actual);
        } else {
            strictEqual(actual, expected);
        }
    }
});


