module('Simple example');

assert_that.define('is_visible', function() {
    ok(this.is(':visible'));
});
assert_that.define('is_empty', function() {
    strictEqual(this.val(), '');
});

test("assert the textarea is visible and empty", function () {
    assert_that($('textarea')).is_visible().is_empty();
});


module('Chained assertions example with sinonJS');

assert_that.define('called', function(context, session) {
    session.called = {};
    ok(this.called);
});
assert_that.define('once', function(context, session) {
    if ('called' in session) {
        ok(this.calledOnce);
        session.called.once = true;
    } else {
        ok(false, 'bad usage: once() must be used after call()');
    }
});
assert_that.define('with', function(context, session) {
    if ('called' in session) {
        if (session.called.once) {
            deepEqual(this.getCall(0).args, context.callArgs);
        } else {
            ok(this.calledWithExactly.apply(this, context.callArgs));
        }
    } else {
        ok(false, 'bad usage: with(...) must be used after call()');
    }
});

test("assert called with arguments", function () {
    var stub = sinon.stub();
    stub('foo', 'bar');
    assert_that(stub).called().once().with('foo', 'bar');

    stub('hello world');
    assert_that(stub).called().with('hello world');
});