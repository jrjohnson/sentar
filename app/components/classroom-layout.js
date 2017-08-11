import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNameBindings: [':classroom-layout', 'tiny'],
  init(){
    this._super(...arguments);
    this.set('desks', []);
  },
  desks: null,
  tiny: false,
  unpositionedDesks: computed('desks.@each.positioned', function(){
    const desks = this.get('desks');
    const unpositionedDesks = desks.filter(desk => !desk.get('positioned'));

    return unpositionedDesks;
  }),
  positionedDesks: computed('desks.@each.positioned', function(){
    const desks = this.get('desks');
    const positionedDesks = desks.filter(desk => desk.get('positioned'));

    return positionedDesks;
  }),
});
