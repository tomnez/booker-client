import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('resource-block', 'Integration | Component | resource block', {
  integration: true
});

const resource = Ember.Object.create({
  name: 'Meeting Room',
  access: 'owner',
  schedule: [],
  busyNow: false
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('resource', resource);
  this.render(hbs`{{resource-block model=resource}}`);

  assert.equal(this.$('.resource-info-all-container').length, 1, 'resource block component renders');
});

test('clicking the details icon opens/closes the details panel', function(assert) {
  assert.expect(2);

  this.set('resource', resource);
  this.render(hbs`{{resource-block model=resource}}`);

  this.$('.resource-icon-details').click();

  assert.equal(this.$('.resource-details-container').length, 1, 'resource details panel is shown');

  this.$('.resource-icon-details').click();

  assert.equal(this.$('.resource-details-container').length, 0, 'resource details panel is hidden');
});
