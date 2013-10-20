module('Test is()');

test('Comparing booleans', function () {
    assertThat(true).is(true);
    assertThat(0).is(0);
});

test('Comparing strings', function () {
    assertThat('').is('');
    assertThat('foo').is('foo');
});

test('Comparing arrays', function () {
    assertThat([]).is([]);
    assertThat([1, 2, 3, [4, 5]]).is([1, 2, 3, [4, 5]]);
});

test('Comparing jsons', function () {
    assertThat({}).is({});
    assertThat({a: {b: [1, 2]}}).is({a: {b: [1, 2]}});
});


module('Test isNot()');

test('Comparing primitive types and empty objects', function () {
    assertThat(false).isNot(true);
    assertThat(undefined).isNot(false);
    assertThat(0).isNot(false);
    assertThat([]).isNot(false);
    assertThat({}).isNot(false);
});

test('Comparing strings', function () {
    assertThat('foo').isNot('bar');
});

test('Comparing arrays', function () {
    assertThat([1, 2, 3, [4, 5]]).isNot([1, 2, 3, []]);
});

test('Comparing jsons', function () {
    assertThat({a: {b: [1, 2]}}).isNot({a: {b: [  ]}});
});


module('Test throws()');

test('Exception without exception object', function () {
    assertThat(function () {
        throw 'This is an error';
    }).throws();
});

test('Exception with exception object', function () {
    assertThat(function () {
        throw 'This is an error';
    }).throws('This is an error');
});

test('Exception with custom exception object', function () {
    function CustomException () {}
    assertThat(function Foo() {
        throw new CustomException();
    }).throws(CustomException);
});

