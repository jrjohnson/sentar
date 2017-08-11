import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('seating-chart-list', 'Integration | Component | seating chart list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{seating-chart-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#seating-chart-list}}
      template block text
    {{/seating-chart-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
