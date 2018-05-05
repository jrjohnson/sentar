import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  store: service(),
  session: service(),
  async beforeModel() {
    const store = this.store;
    const session = this.session;
    await store.unloadAll();
    await session.close();
    this.replaceWith('index');
  },
});
