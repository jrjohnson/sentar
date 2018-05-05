import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  store: service(),
  async model({seating_chart_id:seatingChartId}){
    const store = this.store;
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
