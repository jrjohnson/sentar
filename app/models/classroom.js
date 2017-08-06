import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({
  name: DS.attr(),
  user: DS.belongsTo('user', { async: true, inverse: null }),
  seatingCharts: DS.hasMany('seating-chart', { async: true, inverse: null }),
  desks: DS.hasMany('desk', { async: true, inverse: null }),
  unpositionedDesks: computed('desks.@each.positioned', 'desks.[]', async function(){
    const desks = await this.get('desks');
    const unpositionedDesks = desks.filter(desk => !desk.get('positioned'));

    return unpositionedDesks;
  }),
  positionedDesks: computed('desks.@each.positioned', 'desks.[]', async function(){
    const desks = await this.get('desks');
    const positionedDesks = desks.filter(desk => desk.get('positioned'));

    return positionedDesks;
  }),
});
