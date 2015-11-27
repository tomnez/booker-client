import { moduleFor, test } from 'ember-qunit';

moduleFor('route:application', 'Unit | Route | application', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:session'] // bugfix for https://github.com/simplabs/ember-simple-auth/issues/635
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
