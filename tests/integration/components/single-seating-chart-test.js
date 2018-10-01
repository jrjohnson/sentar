import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | single seating chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{single-seating-chart}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#single-seating-chart}}
        template block text
      {{/single-seating-chart}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
