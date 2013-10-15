# assertThat-fluent-js #

assertThat-fluent-js is a framework independant script for writing assertions like this :

	assertThat(element).isVisible().isEmpty();


It only requires to write the assertion methods you need, like this (example writen with [jQuery](http://jquery.com/) and [QUnit](http://qunitjs.com/)) :

    // First, define the assertion functions once, somewhere :
    assertThat.define('isVisible', function() {
        ok(this.is(':visible'));
    });
    assertThat.define('isEmpty', function() {
        strictEqual(this.val(), '');
    });

    // Then your tests :
    test("assert the textarea is visible and empty", function () {
        assertThat($('textarea')).isVisible().isEmpty();
    });
    
See [this JSFiddle](http://jsfiddle.net/6nb6r/).
