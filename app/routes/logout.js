import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  store: inject.service(),
  session: inject.service(),
  async beforeModel() {
    const store = this.get('store');
    const session = this.get('session');
    await store.unloadAll();
    await session.close();
    this.replaceWith('index');
  },
});
