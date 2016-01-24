import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('minute-counter', 'Integration | Component | minute counter', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{minute-counter}}`);

  assert.equal(this.$('.counter-btn-container').length, 3, 'The plus, minus, and minute buttons all render.');
  assert.equal(this.$('.message-row').text().trim(), 'Tap center circle to book for 5 minutes.', 'The directions message renders');
});

test('the counter buttons increase or decrease the minutes by 5', function(assert) {
  assert.expect(2);

  this.render(hbs`{{minute-counter}}`);

  this.$('.btn-more-minutes').click();

  assert.equal(this.$('.large-minutes-display').text(), '10', 'minutes plus counter adds 5 minutes');

  this.$('.btn-less-minutes').click();

  assert.equal(this.$('.large-minutes-display').text(), '5', 'minutes minus counter subtracts 5 minutes');
});

test('the counter disables and changes message once it hits 0 minutes', function(assert) {
  assert.expect(2);

  this.render(hbs`{{minute-counter}}`);

  this.$('.btn-less-minutes').click();
  this.$('.btn-less-minutes').click();

  assert.equal(this.$('.large-minutes-display').text(), '0', 'minutes minus counter will not go below 0 minutes');
  assert.equal(this.$('.message-row').text().trim(), 'Set minutes using the +/- buttons.', 'The directions message changes once the user hits 0 minutes');
});
