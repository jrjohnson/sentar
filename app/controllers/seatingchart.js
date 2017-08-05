import Ember from 'ember';

const { Controller, inject } = Ember;

export default Controller.extend({
  store: inject.service(),
  newPersonName: null,

  actions: {
    async createNewPerson(){
      const store = this.get('store');
      const name = this.get('newPersonName');
      const seatingChart = this.get('model');
      if (name) {
        const newPerson = store.createRecord('person', {
          seatingChart,
          name
        });
        seatingChart.get('people').addObject(newPerson);
        await newPerson.save();
        await seatingChart.save();
        this.set('newPersonName', null);
      }
    },
    async deletePerson(person){
      const seatingChart = this.get('model');
      seatingChart.get('people').removeObject(person);
      person.deleteRecord();
      await person.save();
      await seatingChart.save();
    },
  }
});
