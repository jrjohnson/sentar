import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.authenticatedRoute('classrooms');
  this.route('login');
  this.authenticatedRoute('logout');
});

export default Router;
