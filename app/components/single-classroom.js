import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  classNames: ['single-classroom'],
  isManagingLayout: false,
  actions: {
    async createNewDesk(){
      const store = this.store;
      const classroom = this.classroom;
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
