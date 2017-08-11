import Ember from 'ember';

const { Controller, inject } = Ember;

export default Controller.extend({
  store: inject.service(),
  queryParams: ['isManagingLayout'],
  newSeatingChartName: null,
  isManagingLayout: false,
});
