import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  positioned: DS.attr('boolean'),
  row: DS.attr('number'),
  column: DS.attr('number'),
  classroom: DS.belongsTo('classroom', { async: true, inverse: null }),
});
