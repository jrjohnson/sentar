import Ember from 'ember';

const { Component, inject, RSVP } = Ember;
const { all } = RSVP;

export default Component.extend({
  store: inject.service(),
  newPersonName: null,
  newPeopleList: null,
  classNames: ['single-seating-chart'],
  async removeAllAssignments(){
    const seatingChart = this.get('seatingChart');
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
  async addPerson(name) {
    const store = this.get('store');
    const seatingChart = this.get('seatingChart');
    const newPerson = store.createRecord('person', {
      seatingChart,
      name
    });
    seatingChart.get('people').addObject(newPerson);
    await newPerson.save();
    await seatingChart.save();
  },
  actions: {
    async createNewPerson(){
      const name = this.get('newPersonName');
      if (name) {
        await this.addPerson(name);
      }
      this.set('newPersonName', null);
    },
    async createNewPeople(){
      const text = this.get('newPeopleList');
      const names = text.split(/\r?\n/);
      await names.forEach(async name => {
        const cleanName = name.trim();
        if (cleanName.length) {
          await this.addPerson(cleanName);
        }
      });
      this.set('newPeopleList', null);
    },
    async deletePerson(person){
      const seatingChart = this.get('seatingChart');
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
      const seatingChart = this.get('seatingChart');
      const classroom = await seatingChart.get('classroom');
      const desks = await classroom.get('positionedDesks');
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
