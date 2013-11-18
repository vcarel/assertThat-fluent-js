[![Build Status](https://travis-ci.org/vcarel/assertThat-fluent-js.png?branch=master)](https://travis-ci.org/vcarel/assertThat-fluent-js)

# assertThat-fluent-js

assertThat-fluent-js is a framework independant script for writing assertions like this :

	assert_that(element).is_visible().isEmpty();

or

	assert_that(stub).called().once().with('foo', 'bar');

or

    assert_that('foo').is('foo');
    assert_that('foo').is_not('bar');

It only requires to write the assertion methods you need, like this (example writen with [jQuery](http://jquery.com/) and [QUnit](http://qunitjs.com/)) :

    // First, define the assertion functions once, somewhere :
    assert_that.define('isVisible', function() {
        ok(this.is(':visible'));
    });
    assert_that.define('isEmpty', function() {
        strictEqual(this.val(), '');
    });

    // Then your tests :
    test("assert the textarea is visible and empty", function () {
        assert_that($('textarea')).is_visible().isEmpty();
    });
    
See [this JSFiddle](http://jsfiddle.net/6nb6r/2/) or the test/demo.js file for a more complex example.

### Thanks
Thanks to [jjeeb](https://github.com/jbpotonnier) for helping me out :)
