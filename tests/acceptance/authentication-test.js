import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker-client/tests/helpers/start-app';
import { invalidateSession, authenticateSession, currentSession } from '../helpers/ember-simple-auth';

module('Acceptance | authentication', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting protected route without auth will redirect to login page', function(assert) {
  invalidateSession(this.application);

  visit('/resources');

  andThen(() => {
    assert.equal(currentURL(), '/login');
  });
});

test('user can visit a protected route after authenticating', function(assert) {
  visit('/login');

  authenticateSession(this.application, { userId: 1 });

  visit('/protected');

  andThen(() => {
    let session = currentSession(this.application);

    assert.equal(currentURL(), '/protected');
    assert.equal(session.get('data.authenticated.userId'), 1);
  });
});
