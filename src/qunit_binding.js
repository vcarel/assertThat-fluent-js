(function () {

    assert_that.define('is', function(context, session) {
        deepEqual(context.toAssert, context.callArgs[0], context.getMessage());
    });

    assert_that.define('is_not', function(context, session) {
        notDeepEqual(context.toAssert, context.callArgs[0], context.getMessage());
    });

    assert_that.define('throws', function(context) {
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

    assert_that.define('contains', function(context, session) {
        ok(context.toAssert.indexOf(context.callArgs[0]) !== -1, context.getMessage());
    });

    assert_that.define('not_contains', function(context, session) {
        ok(context.toAssert.indexOf(context.callArgs[0]) === -1, context.getMessage());
    });

    assert_that.define('belongs_to', function(context, session) {
        ok(context.callArgs[0].indexOf(context.toAssert) !== -1, context.getMessage());
    });

    assert_that.define('not_belongs_to', function(context, session) {
        ok(context.callArgs[0].indexOf(context.toAssert) === -1, context.getMessage());
    });
})();

