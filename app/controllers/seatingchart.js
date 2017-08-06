import Ember from 'ember';

const { Controller, inject, RSVP } = Ember;
const { all } = RSVP;

export default Controller.extend({
  store: inject.service(),
  newPersonName: null,
  async removeAllAssignments(){
    const seatingChart = this.get('model');
    const classroom = await seatingChart.get('classroom');
    const desks = await classroom.get('desks');
    const people = await seatingChart.get('people');
    desks.forEach(desk => {
      desk.get('people').removeObjects(people.toArray());
    });
    people.forEach(person => {
      person.set('desk', null);
    });
    await all(people.invoke('save'));
    await all(desks.invoke('save'));
  },
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
    async removeAllAssignments(){
      await this.removeAllAssignments();
    },
    async randomizeAssignments(){
      await this.removeAllAssignments();
      const seatingChart = this.get('model');
      const classroom = await seatingChart.get('classroom');
      const desks = await classroom.get('desks');
      const deskIds = desks.mapBy('id');
      const people = await seatingChart.get('people');
      people.forEach(async person => {
        const newDeskId = deskIds[Math.floor(Math.random() * deskIds.length)];
        const desk = desks.findBy('id', newDeskId);
        person.set('desk', desk);
        desk.get('people').pushObject(person);
        deskIds.removeObject(newDeskId);
      });
      await all(people.invoke('save'));
      await all(desks.invoke('save'));
    }
  }
});
