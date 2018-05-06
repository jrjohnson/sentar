import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  positioned: DS.attr('boolean'),
  row: DS.attr('number'),
  column: DS.attr('number'),
  classroom: DS.belongsTo('classroom', { async: true, inverse: null }),
  people: DS.hasMany('person', { async: true, inverse: null }),
  placeClassName: computed('positioned', 'row', 'column', function(){
    const positioned = this.positioned;
    const column = this.column;
    const row = this.row;

    if (!positioned) {
      return '';
    }

    return `place-${column}-${row}`;
  }),
});
