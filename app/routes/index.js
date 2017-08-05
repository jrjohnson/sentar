import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  session: inject.service(),
  authenticatedUser: inject.service(),
  beforeModel(){
    const session = this.get('session');
    if (session.get('isAuthenticated')) {
      this.replaceWith('dashboard');
    }
  },
});
