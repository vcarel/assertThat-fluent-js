module('assert_that/core', {
    setup: function () {
        this.callback = sinon.stub();
        assert_that.define('says', this.callback);
    }
});

test('assert_that provides 2 arguments ; first is a context containing what to assert and call parameters, second is session', function () {
    assert_that('duke').says('hello', 'world');
    ok(this.callback.calledOnce);
    ok(this.callback.calledOnce);
    strictEqual(this.callback.getCall(0).args.length, 2);
    strictEqual(this.callback.getCall(0).args[0].toAssert, 'duke');
    deepEqual(this.callback.getCall(0).args[0].callArgs, ['hello', 'world']);
    deepEqual(this.callback.getCall(0).args[1], {});
});

test('the session is reused at every calls, the context is not', function () {
    var assertable = assert_that('duke').says('hello world');
    var context1 = this.callback.getCall(0).args[0];
    var session1 = this.callback.getCall(0).args[1];

    session1.foo = 'bar';
    assertable.says('wanna dance ?');

    var context2 = this.callback.getCall(1).args[0];
    var session2 = this.callback.getCall(1).args[1];
    notDeepEqual(context2, context1);
    deepEqual(session2, session1);
});


module('assert_that/prettify');

test('boolean', function () {
    strictEqual(assert_that.prettify(true), 'true');
});

test('number', function () {
    strictEqual(assert_that.prettify(42), '42');
});

test('string', function () {
    strictEqual(assert_that.prettify('abc'), '"abc"');
});

test('undefined', function () {
    strictEqual(assert_that.prettify(undefined), 'undefined');
});

test('null', function () {
    strictEqual(assert_that.prettify(null), 'null');
});

test('array', function () {
    deepEqual(assert_that.prettify(['foo', 1]), '["foo",1]');
});

test('json / other object', function () {
    deepEqual(assert_that.prettify({}), '{}');
    deepEqual(assert_that.prettify({foo: 'bar'}), '{"foo":"bar"}');
});

test('function with name', function () {
    strictEqual(assert_that.prettify(function sayHello() {}), 'function sayHello');
});

test('function without name', function () {
    strictEqual(assert_that.prettify(function () {}), 'anonymous function');
});


module('context.getMessage');

test('getMessage returns a message explaining the assertion with prettified arguments', function () {
    var message = null;
    assert_that.define('says', function(context) {
        message = context.getMessage();
    });

    assert_that('duke').says('hello world');
    strictEqual(message, 'assert_that("duke").says("hello world")');

    assert_that('duke').says('hello', 'world');
    strictEqual(message, 'assert_that("duke").says("hello","world")');

    assert_that('duke').says('hello', ['foo', 'bar']);
    strictEqual(message, 'assert_that("duke").says("hello",["foo","bar"])');
});

test('the returned message relates all calls', function () {
    var message = null;
    assert_that.define('says', function() {});
    assert_that.define('and', function(context) {
        message = context.getMessage();
    });

    assert_that('duke').says('hello').and('world');
    strictEqual(message, 'assert_that("duke").says("hello").and("world")');
});

test('getMessage returns the message from the related context, if any', function () {
    var messages = [];
    assert_that.define('says', function(context) {
        messages.push(context.getMessage());
    });
    assert_that.define('makes_a_speech', function(context) {
        context.callArgs.forEach(function(sentence) {
            assert_that(context.toAssert).within(context).says(sentence);
        });
    });

    assert_that('duke').makes_a_speech('check it baby !', 'wanna dance ?');
    deepEqual(messages, [
        'assert_that("duke").makes_a_speech("check it baby !","wanna dance ?")',
        'assert_that("duke").makes_a_speech("check it baby !","wanna dance ?")'
    ]);
});
