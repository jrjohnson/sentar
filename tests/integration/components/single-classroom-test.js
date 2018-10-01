import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | single classroom', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('nothing', () => { });
    await render(hbs`{{single-classroom setIsManagingLayout=(action nothing)}}`);

    assert.dom('*').hasText('Seating Charts Classroom Layout Front');
  });
});
