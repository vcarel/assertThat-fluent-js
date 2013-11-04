module('assert_that/core', {
    setup: function () {
        this.callback = sinon.stub();
        assertThat.define('says', this.callback);
    }
});

test('assert_that provides 2 arguments ; first is a context containing what to assert and call parameters, second is session', function () {
    assertThat('duke').says('hello', 'world');
    ok(this.callback.calledOnce);
    ok(this.callback.calledOnce);
    strictEqual(this.callback.getCall(0).args.length, 2);
    strictEqual(this.callback.getCall(0).args[0].toAssert, 'duke');
    deepEqual(this.callback.getCall(0).args[0].callArgs, ['hello', 'world']);
    deepEqual(this.callback.getCall(0).args[1], {});
});

test('the session is reused at every calls, the context is not', function () {
    var assertable = assertThat('duke').says('hello world');
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
    strictEqual(assertThat.prettify(true), 'true');
});

test('number', function () {
    strictEqual(assertThat.prettify(42), '42');
});

test('string', function () {
    strictEqual(assertThat.prettify('abc'), '"abc"');
});

test('undefined', function () {
    strictEqual(assertThat.prettify(undefined), 'undefined');
});

test('null', function () {
    strictEqual(assertThat.prettify(null), 'null');
});

test('array', function () {
    deepEqual(assertThat.prettify(['foo', 1]), '["foo",1]');
});

test('json / other object', function () {
    deepEqual(assertThat.prettify({}), '{}');
    deepEqual(assertThat.prettify({foo: 'bar'}), '{"foo":"bar"}');
});

test('function with name', function () {
    strictEqual(assertThat.prettify(function sayHello() {}), 'function sayHello');
});

test('function without name', function () {
    strictEqual(assertThat.prettify(function () {}), 'anonymous function');
});


module('context.getMessage');

test('getMessage returns a message explaining the assertion with prettified arguments', function () {
    var message = null;
    assertThat.define('says', function(context) {
        message = context.getMessage();
    });

    assertThat('duke').says('hello world');
    strictEqual(message, 'assertThat("duke").says("hello world")');

    assertThat('duke').says('hello', 'world');
    strictEqual(message, 'assertThat("duke").says("hello","world")');

    assertThat('duke').says('hello', ['foo', 'bar']);
    strictEqual(message, 'assertThat("duke").says("hello",["foo","bar"])');
});

test('the returned message relates all calls', function () {
    var message = null;
    assertThat.define('says', function() {});
    assertThat.define('and', function(context) {
        message = context.getMessage();
    });

    assertThat('duke').says('hello').and('world');
    strictEqual(message, 'assertThat("duke").says("hello").and("world")');
});

test('getMessage returns the message from the related context, if any', function () {
    var messages = [];
    assertThat.define('says', function(context) {
        messages.push(context.getMessage());
    });
    assertThat.define('makesASpeech', function(context) {
        context.callArgs.forEach(function(sentence) {
            assertThat(context.toAssert).within(context).says(sentence);
        });
    });

    assertThat('duke').makesASpeech('check it baby !', 'wanna dance ?');
    deepEqual(messages, [
        'assertThat("duke").makesASpeech("check it baby !","wanna dance ?")',
        'assertThat("duke").makesASpeech("check it baby !","wanna dance ?")'
    ]);
});
