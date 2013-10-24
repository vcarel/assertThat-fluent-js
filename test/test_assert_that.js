module('assert_that', {
    setup: function () {
        this.callback = sinon.stub();
        assertThat.define('says', this.callback);
    }
});

test('assert_that provides 2 arguments ; first is a context containing what to assert and call parameters, second is session', function () {
    assertThat('duke').says('hello', 'world');
    ok(this.callback.calledOnce);
    deepEqual(this.callback.getCall(0).args, [{toAssert: 'duke', callArgs: ['hello', 'world']}, {}]);
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






