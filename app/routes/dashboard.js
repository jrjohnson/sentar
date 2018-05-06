import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
export default Route.extend({
  authenticatedUser: service(),
  async model(){
    const authenticatedUser = this.authenticatedUser;
    const user = await authenticatedUser.fetch();

    return user;
  }
});
