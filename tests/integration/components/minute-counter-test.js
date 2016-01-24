import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('minute-counter', 'Integration | Component | minute counter', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{minute-counter}}`);

  assert.equal(this.$('.counter-btn-container').length, 3, 'All plus, minus, and minute buttons all render.');
});
