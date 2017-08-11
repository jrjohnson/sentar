import Ember from 'ember';

const { Component, inject } = Ember;

export default Component.extend({
  session: inject.service(),
  authenticatedUser: inject.service(),
  router: inject.service(),
  tagName: 'ul',
  classNames: ['firebase-auth', 'fa-ul'],
  actions: {
    async signIn(provider) {
      const session = this.get('session');
      const authenticatedUser = this.get('authenticatedUser');
      const router = this.get('router');
      const data = await session.open('firebase', { provider: provider});
      const uid = data.currentUser.uid;
      await authenticatedUser.build(uid);
      router.transitionTo('dashboard');
    }
  }
});
