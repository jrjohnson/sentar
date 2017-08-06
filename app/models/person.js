import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default DS.Model.extend({
  name: DS.attr(),
  desk: DS.belongsTo('desk', { async: true, inverse: null }),
  seatingChart: DS.belongsTo('seating-chart', { async: true, inverse: null }),
  positioned: computed('desk', function(){
    const deskId = this.belongsTo('desk').id();
    if (deskId) {
      return true;
    }

    return false;
  }),
});
