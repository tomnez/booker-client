import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker-client/tests/helpers/start-app';
import { authenticateSession } from '../helpers/ember-simple-auth';
import Pretender from 'pretender';

let server;

module('Acceptance | resources', {
  beforeEach() {
    this.application = startApp();

    visit('/login');
    authenticateSession(this.application);
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
    server.shutdown();
  }
});

test('List resources', function(assert) {
  server = new Pretender(function() {
    this.get('/api/users/1/resources', function() {
      let response = {
        data: [
          {
            id: 1,
            type: 'resource',
            attributes: {
              name: 'Monster Mash Meeting Room',
              access: 'owner',
              'busy-now': false,
              schedule: []
            }
          },
          {
            id: 2,
            type: 'resource',
            attributes: {
              name: 'Meat Space',
              access: 'owner',
              'busy-now': false,
              schedule: []
            }
          }
        ]
      };
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
    });
    this.get('/api/me', function() {
      let response = {
        user: {
          id: 1,
          type: 'user',
          attributes: {
            displayName: 'Tom Nez'
          },
          relationships: {
            resources: {
              links: {
                self: '/users/1/relationships/resources',
                related: '/users/1/resources'
              }
            }
          }
        }
      };
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
    });
  });

  visit('/resources');

  andThen(() => {
    assert.equal(currentURL(), '/resources');
    assert.equal(find('.resource-block-item').length, 2, 'All resources are rendered');
    assert.equal(find('.btn-sign-out').length, 1, 'Sign out button is shown');
  });
});
