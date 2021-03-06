import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | seating chart list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{seating-chart-list}}`);

    assert.equal(find('*').textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#seating-chart-list}}
        template block text
      {{/seating-chart-list}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });
});
