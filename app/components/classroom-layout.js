import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['classroom-layout'],
  init(){
    this._super(...arguments);
    this.set('desks', []);
  },
  desks: null,
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
  places: computed(function(){
    let places = [];
    for (let column = 1; column <= 18; column++) {
      for (let row = 1; row <= 18; row++) {
        const className = `place-${column}-${row}`;
        places.push({
          row,
          column,
          className
        });
      }
    }

    return places;
  }),
  actions: {
    moveDesk(desk, options){
      const row = options.target.row;
      const column = options.target.column;
      desk.set('row', row);
      desk.set('column', column);
      desk.set('positioned', true);
      desk.save();
    },
    unpositionDesk(desk){
      desk.set('row', null);
      desk.set('column', null);
      desk.set('positioned', false);
      desk.save();
    }
  }
});
