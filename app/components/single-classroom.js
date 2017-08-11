import Ember from 'ember';

const { Component, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  classNames: ['single-classroom'],
  isManagingLayout: false,
  actions: {
    async createNewDesk(){
      const store = this.get('store');
      const classroom = this.get('classroom');
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
