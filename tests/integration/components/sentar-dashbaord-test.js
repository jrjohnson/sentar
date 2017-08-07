import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sentar-dashbaord', 'Integration | Component | sentar dashbaord', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sentar-dashbaord}}`);

  assert.equal(this.$().text().trim(), '');
});
