module('Test is() and is_not()');

test('Comparing booleans', function () {
    assert_that(true).is(true);
    assert_that(0).is(0);

    assert_that(false).is_not(true);
    assert_that(undefined).is_not(false);
    assert_that(0).is_not(false);
    assert_that([]).is_not(false);
    assert_that({}).is_not(false);
});

test('Comparing strings', function () {
    assert_that('').is('');
    assert_that('foo').is('foo');

    assert_that('foo').is_not('bar');
});

test('Comparing arrays', function () {
    assert_that([]).is([]);
    assert_that([1, 2, 3, [4, 5]]).is([1, 2, 3, [4, 5]]);

    assert_that([1, 2, 3, [4, 5]]).is_not([1, 2, 3, []]);
});

test('Comparing jsons', function () {
    assert_that({}).is({});
    assert_that({a: {b: [1, 2]}}).is({a: {b: [1, 2]}});

    assert_that({a: {b: [1, 2]}}).is_not({a: {b: [  ]}});
});


module('Test throws()');

test('Exception without exception object', function () {
    assert_that(function () {
        throw 'This is an error';
    }).throws();
});

test('Exception with exception object', function () {
    assert_that(function () {
        throw 'This is an error';
    }).throws('This is an error');
});

test('Exception with custom exception object', function () {
    function CustomException () {}
    assert_that(function Foo() {
        throw new CustomException();
    }).throws(CustomException);
});


module('Test contains() and not_contains()');

test('Comparing strings', function () {
    assert_that('hello world').contains('world');
    assert_that('foo').not_contains('bar');
});

test('Comparing arrays', function () {
    assert_that(['hello', 'world']).contains('world');
    assert_that(['hello', 'world']).not_contains('wo');
});


module('Test belongs_to() and not_belongs_to()');

test('Comparing strings', function () {
    assert_that('world').belongs_to('hello world');
    assert_that('bar').not_belongs_to('foo');
});

test('Comparing arrays', function () {
    assert_that('world').belongs_to(['hello', 'world']);
    assert_that('wo').not_belongs_to(['hello', 'world']);
});

