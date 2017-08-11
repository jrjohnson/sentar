import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Component, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  authenticatedUser: inject.service(),
  classNames: ['classroom-list'],
  newClassroomName: null,
  addNewClassroom: false,

  toggleAddNewClassroom: task(function * (){
    const addNewClassroom = this.get('addNewClassroom');
    if (addNewClassroom) {
      this.set('addNewClassroom', false);
    } else {
      this.set('addNewClassroom', true);
      yield timeout(100);
      this.$('.add-new-classroom-input').focus();
    }
  }),

  actions: {
    async createNewClassroom(){
      const store = this.get('store');
      const authenticatedUser = this.get('authenticatedUser');
      const name = this.get('newClassroomName');
      const user = await authenticatedUser.fetch();
      if (name) {
        const newClassroom = store.createRecord('classroom', {
          user,
          name
        });
        user.get('classrooms').addObject(newClassroom);
        await newClassroom.save();
        await user.save();
        this.set('newClassroomName', null);
        this.set('addNewClassroom', false);
      }
    },
    async deleteClassroom(classroom){
      const authenticatedUser = this.get('authenticatedUser');
      const user = await authenticatedUser.fetch();
      user.get('classrooms').removeObject(classroom);
      classroom.deleteRecord();
      await classroom.save();
      await user.save();
    },
  }
});
