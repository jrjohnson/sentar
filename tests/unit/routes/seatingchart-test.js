import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | seatingchart', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:seatingchart');
    assert.ok(route);
  });
});
