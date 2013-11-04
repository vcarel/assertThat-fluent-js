(function () {

    assertThat.define('not', function(context, session) {
        session.not = true;
    });

    assertThat.define('is', function(context, session) {
        var actual = context.toAssert;
        if (session.not) {
            notDeepEqual(actual, context.callArgs[0], context.getMessage());
        } else {
            deepEqual(actual, context.callArgs[0], context.getMessage());
        }
    });

    // Syntactic sugar for not().is()
    assertThat.define('isNot', function(context, session) {
        if (session.not) {
            assertThat(context.toAssert).within(context).is(context.callArgs[0]);
        } else {
            assertThat(context.toAssert).within(context).not().is(context.callArgs[0]);
        }
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

    assertThat.define('contains', function(context, session) {
        if (session.not) {
            ok(context.toAssert.indexOf(context.callArgs[0]) === -1);
        } else {
            ok(context.toAssert.indexOf(context.callArgs[0]) !== -1);
        }
    });

})();

