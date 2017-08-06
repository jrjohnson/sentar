import Ember from 'ember';

const { Controller, inject } = Ember;

export default Controller.extend({
  store: inject.service(),
  queryParams: ['isManagingLayout'],
  newSeatingChartName: null,
  isManagingLayout: false,

  actions: {
    async createNewSeatingChart(){
      const store = this.get('store');
      const name = this.get('newSeatingChartName');
      const classroom = this.get('model');
      if (name) {
        const newSeatingChart = store.createRecord('seating-chart', {
          classroom,
          name
        });
        classroom.get('seatingCharts').addObject(newSeatingChart);
        await newSeatingChart.save();
        await classroom.save();
        this.set('newSeatingChartName', null);
      }
    },
    async deleteSeatingChart(seatingChart){
      const classroom = this.get('model');
      classroom.get('seatingCharts').removeObject(seatingChart);
      seatingChart.deleteRecord();
      await seatingChart.save();
      await classroom.save();
    },
    async createNewDesk(){
      const store = this.get('store');
      const classroom = this.get('model');
      const positioned = false;
      const name = '';
      const newDesk = store.createRecord('desk', {
        name,
        positioned,
        classroom
      });
      classroom.get('desks').addObject(newDesk);
      await newDesk.save();
      await classroom.save();
    },
  }
});
