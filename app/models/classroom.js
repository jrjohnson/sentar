import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({
  name: DS.attr(),
  user: DS.belongsTo('user', { async: true, inverse: null }),
  seatingCharts: DS.hasMany('seating-chart', { async: true, inverse: null }),
  desks: DS.hasMany('desk', { async: true, inverse: null }),
  canDelete: computed('desks.[]', 'seatingCharts.[]', function(){
    const seatingChartIds = this.hasMany('seatingCharts').ids();
    const deskIds = this.hasMany('desks').ids();

    return !seatingChartIds.length && !deskIds.length;
  }),
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
  seatingChartsCount: computed('seatingCharts.[]', function(){
    const ids = this.hasMany('seatingCharts').ids();

    return ids.length;
  }),
  peopleCount: computed('seatingCharts.[]', async function(){
    const seatingCharts = await this.get('seatingCharts');
    const people = seatingCharts.map(seatingChart => {
      const ids = seatingChart.hasMany('people').ids();

      return ids.length;
    });

    const count = people.reduce((total, thisOne) => {
      return total + thisOne;
    }, 0);

    return count;
  }),
});
