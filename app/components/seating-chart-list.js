import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Component, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  authenticatedUser: inject.service(),
  classNames: ['seating-chart-list'],
  newSeatingChartName: null,
  addNewSeatingChart: false,

  toggleAddNewSeatingChart: task(function * (){
    const addNewSeatingChart = this.get('addNewSeatingChart');
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
      const store = this.get('store');
      const name = this.get('newSeatingChartName');
      const classroom = this.get('classroom');
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
      const classroom = this.get('classroom');
      classroom.get('seatingCharts').removeObject(seatingChart);
      seatingChart.deleteRecord();
      await seatingChart.save();
      await classroom.save();
    },
  }
});
