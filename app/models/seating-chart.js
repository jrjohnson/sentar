import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({
  name: DS.attr(),
  classroom: DS.belongsTo('classroom', { async: true, inverse: null }),
  people: DS.hasMany('person', { async: true, inverse: null }),
  unpositionedPeople: computed('people.@each.positioned', 'people.[]', async function(){
    const people = await this.get('people');
    const unpositionedPeople = people.filter(person => !person.get('positioned'));

    return unpositionedPeople;
  }),
  positionedPeople: computed('people.@each.positioned', 'people.[]', async function(){
    const people = await this.get('people');
    const positionedPeople = people.filter(person => person.get('positioned'));

    return positionedPeople;
  }),
});
