import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['classroom-layout-manager'],
  init(){
    this._super(...arguments);
    this.set('desks', []);
  },
  desks: null,
  places: computed(function(){
    let places = [];
    for (let column = 1; column <= 19; column++) {
      for (let row = 1; row <= 19; row++) {
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
