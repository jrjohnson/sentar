import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  place: DS.attr(),
  seatingChart: DS.belongsTo('seating-chart', { async: true, inverse: null }),
});