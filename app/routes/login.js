import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  session: inject.service(),
  authenticatedUser: inject.service(),
  beforeModel(){
    const session = this.get('session');
    if (session.get('isAuthenticated')) {
      this.replaceWith('classrooms');
    }
  },
  actions: {
    async signIn(provider) {
      const session = this.get('session');
      const authenticatedUser = this.get('authenticatedUser');
      const data = await session.open('firebase', { provider: provider});
      const uid = data.currentUser.uid;
      await authenticatedUser.build(uid);
      this.replaceWith('classrooms');
    }
  }
});
