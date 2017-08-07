import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  store: inject.service(),
  async model({seating_chart_id:seatingChartId}){
    const store = this.get('store');
    return store.find('seating-chart', seatingChartId);
  },
  serialize(seatingChart){
    const classroomId = seatingChart.belongsTo('classroom').id();
    return {
      'classroom_id': classroomId,
      'seating_chart_id': seatingChart.get('id'),
    };
  }
});
