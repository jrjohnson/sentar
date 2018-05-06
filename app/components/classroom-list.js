import { inject as service } from '@ember/service';
import Component from '@ember/component';
import RSVP from 'rsvp';
import { task, timeout } from 'ember-concurrency';

const { all } = RSVP;

export default Component.extend({
  store: service(),
  authenticatedUser: service(),
  classNames: ['classroom-list'],
  newClassroomName: null,
  addNewClassroom: false,

  toggleAddNewClassroom: task(function * (){
    const addNewClassroom = this.addNewClassroom;
    if (addNewClassroom) {
      this.set('addNewClassroom', false);
    } else {
      this.set('addNewClassroom', true);
      yield timeout(100);
      this.$('.add-new-classroom-input').focus();
    }
  }),

  createNewClassroom: task(function * (){
    const store = this.store;
    const authenticatedUser = this.authenticatedUser;
    const name = this.newClassroomName;
    const user = yield authenticatedUser.fetch();
    if (name) {
      const newClassroom = store.createRecord('classroom', {
        user,
        name
      });
      const classroom = yield newClassroom.save();
      let newDesks = [];
      for (let i = 1; i <= 35; i++) {
        const newDesk = store.createRecord('desk', {
          name: i,
          positioned: false,
          classroom
        });
        newDesks.addObject(newDesk);
      }
      yield all(newDesks.invoke('save'));
      classroom.get('desks').pushObjects(newDesks);
      yield classroom.save();

      user.get('classrooms').addObject(classroom);
      yield user.save();
      this.set('addNewClassroom', false);
      this.set('newClassroomName', null);
    }
  }),

  actions: {
    async deleteClassroom(classroom){
      const authenticatedUser = this.authenticatedUser;
      const user = await authenticatedUser.fetch();
      const desks = await classroom.get('desks');
      await all(desks.invoke('deleteRecord'));
      await all(desks.invoke('save'));
      user.get('classrooms').removeObject(classroom);
      classroom.deleteRecord();
      await classroom.save();
      await user.save();
    },
  }
});
