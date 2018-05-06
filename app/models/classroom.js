import { computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  user: DS.belongsTo('user', { async: true, inverse: null }),
  seatingCharts: DS.hasMany('seating-chart', { async: true, inverse: null }),
  desks: DS.hasMany('desk', { async: true, inverse: null }),
  canDelete: computed('desks.[]', 'seatingCharts.[]', async function(){
    const seatingChartIds = this.hasMany('seatingCharts').ids();
    const positionedDesks = await this.positionedDesks;

    return !seatingChartIds.length && !positionedDesks.length;
  }),
  unpositionedDesks: computed('desks.{@each.positioned,[]}', async function(){
    const desks = await this.desks;
    const unpositionedDesks = desks.filter(desk => !desk.get('positioned'));

    return unpositionedDesks;
  }),
  positionedDesks: computed('desks.{@each.positioned,[]}', async function(){
    const desks = await this.desks;
    const positionedDesks = desks.filter(desk => desk.get('positioned'));

    return positionedDesks;
  }),
  seatingChartsCount: computed('seatingCharts.[]', function(){
    const ids = this.hasMany('seatingCharts').ids();

    return ids.length;
  }),
  peopleCount: computed('seatingCharts.[]', async function(){
    const seatingCharts = await this.seatingCharts;
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
