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