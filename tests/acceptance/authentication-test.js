import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker-client/tests/helpers/start-app';

module('Acceptance | authentication', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('visit a protected route before logging in', function(assert) {
  visit('/resources');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
