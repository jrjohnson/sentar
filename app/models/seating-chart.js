import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  classroom: DS.belongsTo('classroom', { async: true, inverse: null }),
  people: DS.hasMany('person', { async: true, inverse: null }),
});
