import Ember from 'ember';

const { Route, inject } = Ember;
export default Route.extend({
  authenticatedUser: inject.service(),
  async model(){
    const authenticatedUser = this.get('authenticatedUser');
    const user = await authenticatedUser.fetch();

    return user.get('classrooms');
  }
});
