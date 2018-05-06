import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  classroom: DS.belongsTo('classroom', { async: true, inverse: null }),
  people: DS.hasMany('person', { async: true, inverse: null }),
  unpositionedPeople: computed('people.{@each.positioned,[]}', async function(){
    const people = await this.people;
    const unpositionedPeople = people.filter(person => !person.get('positioned'));

    return unpositionedPeople;
  }),
  positionedPeople: computed('people.{@each.positioned,[]}', async function(){
    const people = await this.people;
    const positionedPeople = people.filter(person => person.get('positioned'));

    return positionedPeople;
  }),
  canDelete: computed('people.[]', function(){
    const ids = this.hasMany('people').ids();

    return !ids.length;
  }),
  peopleCount: computed('people.[]', function(){
    const ids = this.hasMany('people').ids();

    return ids.length;
  }),
});
