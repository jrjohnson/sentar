import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  positioned: DS.attr('boolean'),
  row: DS.attr('number'),
  column: DS.attr('number'),
  classroom: DS.belongsTo('classroom', { async: true, inverse: null }),
  people: DS.hasMany('person', { async: true, inverse: null }),
  placeClassName: computed('positioned', 'row', 'column', function(){
    const positioned = this.get('positioned');
    const column = this.get('column');
    const row = this.get('row');

    if (!positioned) {
      return '';
    }

    return `place-${column}-${row}`;
  }),
});
