import Component from '@ember/component';

export default Component.extend({
  classNames: ['seating-chart'],

  actions: {
    async putPersonInDesk(person, { target }){
      const desk = target.desk;
      const positionedPeople = this.positionedPeople;
      const originalDesk = await person.get('desk');
      const deskPeopleIds = desk.hasMany('people').ids();
      const personAlreadyInDesk = positionedPeople.find(positionedPerson => deskPeopleIds.includes(positionedPerson.get('id')));

      if (originalDesk) {
        originalDesk.get('people').removeObject(person);
        if (personAlreadyInDesk) {
          desk.get('people').removeObject(personAlreadyInDesk);
          originalDesk.get('people').pushObject(personAlreadyInDesk);
          personAlreadyInDesk.set('desk', originalDesk);
          await personAlreadyInDesk.save();
        }
        await originalDesk.save();
      } else if (personAlreadyInDesk) {
        personAlreadyInDesk.set('desk', null);
        desk.get('people').removeObject(personAlreadyInDesk);
        await personAlreadyInDesk.save();
      }

      person.set('desk', desk);
      desk.get('people').pushObject(person);
      await person.save();
      await desk.save();
    },
    async removePersonFromDesk(person){
      const desk = await person.get('desk');
      person.set('desk', null);
      desk.get('people').removeObject(person);
      await person.save();
      await desk.save();
    },
  }
});
