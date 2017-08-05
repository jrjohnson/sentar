import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', { async: true, inverse: null }),
  name: DS.attr()
});
