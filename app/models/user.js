import DS from 'ember-data';

/**
 * ATTENTION: User is NOT secure. Nothing sensitive should be stored here
 * User is ONLY usefull as a way to keep track of relationships
**/
export default DS.Model.extend({
  uid: DS.attr(),
  classrooms: DS.hasMany('classroom', { async: true, inverse: null }),
});
