module('Test is() and not.is()');

test('Comparing booleans', function () {
    assertThat(true).is(true);
    assertThat(0).is(0);

    assertThat(false).not().is(true);
    assertThat(undefined).not().is(false);
    assertThat(0).not().is(false);
    assertThat([]).not().is(false);
    assertThat({}).not().is(false);
});

test('Comparing strings', function () {
    assertThat('').is('');
    assertThat('foo').is('foo');

    assertThat('foo').not().is('bar');
});

test('Comparing arrays', function () {
    assertThat([]).is([]);
    assertThat([1, 2, 3, [4, 5]]).is([1, 2, 3, [4, 5]]);

    assertThat([1, 2, 3, [4, 5]]).not().is([1, 2, 3, []]);
});

test('Comparing jsons', function () {
    assertThat({}).is({});
    assertThat({a: {b: [1, 2]}}).is({a: {b: [1, 2]}});

    assertThat({a: {b: [1, 2]}}).not().is({a: {b: [  ]}});
});

test('isNot is an alias for not().is()', function () {
    assertThat(false).isNot(true);
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


module('Test contains()');

test('Comparing strings', function () {
    assertThat('hello world').contains('world');
    assertThat('foo').not().contains('bar');
});

test('Comparing arrays', function () {
    assertThat(['hello', 'world']).contains('world');
    assertThat(['hello', 'world']).not().contains('wo');
});
