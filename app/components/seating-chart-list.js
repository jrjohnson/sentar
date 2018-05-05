import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  store: service(),
  authenticatedUser: service(),
  classNames: ['seating-chart-list'],
  newSeatingChartName: null,
  addNewSeatingChart: false,

  toggleAddNewSeatingChart: task(function * (){
    const addNewSeatingChart = this.addNewSeatingChart;
    if (addNewSeatingChart) {
      this.set('addNewSeatingChart', false);
    } else {
      this.set('addNewSeatingChart', true);
      yield timeout(100);
      this.$('.add-new-seating-chart-input').focus();
    }
  }),

  actions: {
    async createNewSeatingChart(){
      const store = this.store;
      const name = this.newSeatingChartName;
      const classroom = this.classroom;
      if (name) {
        const newSeatingChart = store.createRecord('seating-chart', {
          classroom,
          name
        });
        classroom.get('seatingCharts').addObject(newSeatingChart);
        this.set('addNewSeatingChart', false);
        await newSeatingChart.save();
        await classroom.save();
        this.set('newSeatingChartName', null);
      }
    },
    async deleteSeatingChart(seatingChart){
      const classroom = this.classroom;
      classroom.get('seatingCharts').removeObject(seatingChart);
      seatingChart.deleteRecord();
      await seatingChart.save();
      await classroom.save();
    },
  }
});
