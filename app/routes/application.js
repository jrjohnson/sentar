import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  session: service(),
  store: service(),
  async beforeModel() {
    const session = this.session;
    await session.fetch().catch(function() {});
  },
  actions: {
    accessDenied(){
      this.replaceWith('index');
    }
  }
});
