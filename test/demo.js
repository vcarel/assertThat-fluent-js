module('Simple example');

assertThat.define('isVisible', function() {
    ok(this.is(':visible'));
});
assertThat.define('isEmpty', function() {
    strictEqual(this.val(), '');
});

test("assert the textarea is visible and empty", function () {
    assertThat($('textarea')).isVisible().isEmpty();
});


module('Chained assertions example with sinonJS');

assertThat.define('called', function(context) {
    context.called = {};
    ok(this.called);
});
assertThat.define('once', function(context) {
    if ('called' in context) {
        ok(this.calledOnce);
        context.called.once = true;
    } else {
        ok(false, 'bad usage: once() must be used after call()');
    }
});
assertThat.define('with', function(context) {
    if ('called' in context) {
        if (context.called.once) {
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
    assertThat(stub).called().once().with('foo', 'bar');

    stub('hello world');
    assertThat(stub).called().with('hello world');
});