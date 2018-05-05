import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service(),
  authenticatedUser: service(),
  router: service(),
  tagName: 'ul',
  classNames: ['firebase-auth', 'fa-ul'],
  actions: {
    async signIn(provider) {
      const session = this.session;
      const authenticatedUser = this.authenticatedUser;
      const router = this.router;
      const data = await session.open('firebase', { provider: provider});
      const uid = data.currentUser.uid;
      await authenticatedUser.build(uid);
      router.transitionTo('dashboard');
    }
  }
});
