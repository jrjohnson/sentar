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
  this.authenticatedRoute('dashboard');
  this.authenticatedRoute('classroom', { path: 'classrooms/:classroom_id'});
  this.authenticatedRoute('seatingchart', { path: 'classrooms/:classroom_id/seatingchart/:seating_chart_id'});
});

export default Router;
