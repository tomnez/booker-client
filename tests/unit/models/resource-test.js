import { moduleForModel, test } from 'ember-qunit';

moduleForModel('resource', 'Unit | Model | resource', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
