import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  session: service(),
  async fetch(){
    const session = this.session;
    const uid = session.get('currentUser.uid');
    if (!uid) {
      throw new Error("User is not currently logged in");
    }
    const user = await this._find(uid);
    if (user) {
      return user;
    }
    return await this.build(uid);
  },
  async _find(uid){
    const store = this.store;
    const users = await store.query('user', {
      orderBy: 'uid',
      equalTo: uid
    });
    if (users.get('length') > 0) {
      return users.get('firstObject');
    }

    return null;
  },
  async build(uid){
    const existingUser = await this._find(uid);
    if (existingUser) {
      return existingUser;
    }
    const store = this.store;
    const newUser = store.createRecord('user', {
      uid
    });
    await newUser.save();
    return newUser;
  }
});
