(function () {

    assertThat.define('is', function(context) {
        var expected = context.callArgs[0];
        var actual = context.toAssert;
        deepEqual(actual, expected, 'assertThat(' + prettify(actual) + ').is(' + prettify(expected) + ')');
    });

    assertThat.define('isNot', function(context) {
        var notExpected = context.callArgs[0];
        var actual = context.toAssert;
        notDeepEqual(actual, notExpected, 'assertThat(' + prettify(actual) + ').isNot(' + prettify(notExpected) + ')');
    });

    assertThat.define('throws', function(context) {
        var expected = context.callArgs[0];
        var toExecute = context.toAssert;

        // QUnit cannot distinguish exceptions based on their content. It only compares their types.
        if (expected instanceof Function) {
            // Using QUnit when expected is a function, assuming it is the constructor of an Exception object.
            throws(toExecute, expected, 'assertThat(' + prettify(toExecute) + ').throws(' + prettify(expected) + ')');
        } else {
            var actual;
            try {
                context.toAssert();
            } catch (e) {
                actual = e;
            }
            if (expected === undefined) {
                notStrictEqual(undefined, actual, 'assertThat(' + prettify(toExecute) + ').throws()');
            } else {
                strictEqual(actual, expected, 'assertThat(' + prettify(toExecute) + ').throws(' + prettify(expected) + ')');
            }
        }
    });

})();

