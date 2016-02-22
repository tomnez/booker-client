import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('resource-block', 'Integration | Component | resource block', {
  integration: true
});

const resource = Ember.Object.create({
  id: 1,
  name: 'Meeting Room',
  access: 'owner',
  schedule: [{ start: '2016-02-21T22:07:27Z', end: '2016-02-21T23:30:00Z' }],
  busyNow: false
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('resource', resource);
  this.render(hbs`{{resource-block model=resource}}`);

  assert.equal(this.$('.resource-info-all-container').length, 1, 'resource block component renders');
});
