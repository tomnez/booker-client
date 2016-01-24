import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('resource-block', 'Integration | Component | resource block', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{resource-block}}`);

  assert.equal(this.$('.resource-info-all-container').length, 1, 'resource block component renders');
});

test('clicking the details icon opens/closes the details panel', function(assert) {
  assert.expect(2);

  this.render(hbs`{{resource-block}}`);

  this.$('.resource-icon-details').click();

  assert.equal(this.$('.resource-details-container').length, 1, 'resource details panel is shown');

  this.$('.resource-icon-details').click();

  assert.equal(this.$('.resource-details-container').length, 0, 'resource details panel is hidden');
});
