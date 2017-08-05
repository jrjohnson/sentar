import Ember from 'ember';

const { Controller, inject, RSVP } = Ember;
const { all } = RSVP;

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
    async randomizePlaces(){
      const seatingChart = this.get('model');
      const people = await seatingChart.get('people');
      let places = [];
      for (var i = 1; i <= people.get('length'); i++) {
          places.push(i);
      }
      people.forEach(person => {
        const place = places[Math.floor(Math.random() * places.length)];
        person.set('place', place);
      });
      await all(people.invoke('save'));
    }
  }
});
