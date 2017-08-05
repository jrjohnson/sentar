import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  session: inject.service(),
  store: inject.service(),
  async beforeModel() {
    const session = this.get('session');
    await session.fetch().catch(function() {});
  },
  actions: {
    accessDenied(){
      this.replaceWith('index');
    }
  }
});
