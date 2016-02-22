import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker-client/tests/helpers/start-app';
import { authenticateSession } from 'booker-client/tests/helpers/ember-simple-auth';
import Pretender from 'pretender';

let server = new Pretender(function() { // jshint ignore:line
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
            schedule: [{ start: '2016-02-21T22:07:27Z', end: '2016-02-21T23:30:00Z' }]
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
  this.get('/api/resources/1/events', function() {
    let response = {
      resourceEvent: {
        id: 5,
        title: 'Meeting Title',
        creator: 'tomnez@gmail.com',
        start: '2:00pm',
        end: '5:00pm'
      }
    };
    return [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
  });
});

let application;

module('Acceptance | resources', {
  beforeEach() {
    application = startApp();

    visit('/login');
    authenticateSession(application);
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('List resources', function(assert) {
  visit('/resources');

  andThen(() => {
    assert.equal(currentURL(), '/resources');
    assert.equal(find('.resource-block-item').length, 2, 'All resources are rendered');
    assert.equal(find('.btn-sign-out').length, 1, 'Sign out button is shown');
  });
});

test('Load resource event details', function(assert) {
  visit('/resources');

  click('.resource-icon-details');

  andThen(() => {
    assert.equal(find('.resource-details-header').length, 1, 'Event header is rendered');
    assert.equal(find('.resource-details-booked-by').length, 1, 'Event details are rendered');
  });
});
