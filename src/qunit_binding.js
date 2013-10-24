(function () {

    assertThat.define('is', function(context) {
        var expected = context.callArgs[0];
        var actual = context.toAssert;
        deepEqual(actual, expected, 'assertThat(' + assertThat.prettify(actual) + ').is(' + assertThat.prettify(expected) + ')');
    });

    assertThat.define('isNot', function(context) {
        var notExpected = context.callArgs[0];
        var actual = context.toAssert;
        notDeepEqual(actual, notExpected, 'assertThat(' + assertThat.prettify(actual) + ').isNot(' + assertThat.prettify(notExpected) + ')');
    });

    assertThat.define('throws', function(context) {
        var expected = context.callArgs[0];
        var toExecute = context.toAssert;

        // QUnit cannot distinguish exceptions based on their content. It only compares their types.
        if (expected instanceof Function) {
            // Using QUnit when expected is a function, assuming it is the constructor of an Exception object.
            throws(toExecute, expected, 'assertThat(' + assertThat.prettify(toExecute) + ').throws(' + assertThat.prettify(expected) + ')');
        } else {
            var actual;
            try {
                context.toAssert();
            } catch (e) {
                actual = e;
            }
            if (expected === undefined) {
                notStrictEqual(undefined, actual, 'assertThat(' + assertThat.prettify(toExecute) + ').throws()');
            } else {
                strictEqual(actual, expected, 'assertThat(' + assertThat.prettify(toExecute) + ').throws(' + assertThat.prettify(expected) + ')');
            }
        }
    });

})();

