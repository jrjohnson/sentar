import Ember from 'ember';

const { Component, inject } = Ember;

export default Component.extend({
  store: inject.service(),
  authenticatedUser: inject.service(),
  newClassroomName: null,

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
