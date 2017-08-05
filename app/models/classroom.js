import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  user: DS.belongsTo('user', { async: true, inverse: null }),
  seatingCharts: DS.hasMany('seating-chart', { async: true, inverse: null }),
});
