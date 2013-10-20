module('prettify');

test('boolean', function () {
    assertThat(prettify(true)).is('true');
});

test('number', function () {
    assertThat(prettify(42)).is('42');
});

test('string', function () {
    assertThat(prettify('abc')).is('"abc"');
});

test('undefined', function () {
    assertThat(prettify(undefined)).is('undefined');
});

test('null', function () {
    assertThat(prettify(null)).is('null');
});

test('array', function () {
    assertThat(prettify(['foo', 1])).is('["foo",1]');
});

test('json / other object', function () {
    assertThat(prettify({})).is('{}');
    assertThat(prettify({foo: 'bar'})).is('{"foo":"bar"}');
});

test('function with name', function () {
    assertThat(prettify(function sayHello() {})).is('function sayHello');
});

test('function without name', function () {
    assertThat(prettify(function () {})).is('anonymous function');
});



