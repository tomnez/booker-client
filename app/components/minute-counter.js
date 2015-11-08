import Ember from 'ember';

export default Ember.Component.extend({
  minutes: 5,
  minutesIncDecBy: 5,
  decButtonDisabled: false,

  classNames: ['resource-minute-counter'],

  disableOrEnableDecButton() {
    let minutes = this.get('minutes');

    this.set('decButtonDisabled', (minutes <= 0));
  },

  actions: {
    incMinutes() {
      let minutes = this.get('minutes');

      this.set('minutes', minutes + this.get('minutesIncDecBy'));
      this.disableOrEnableDecButton();
    },

    decMinutes() {
      let minutes = this.get('minutes');
      let newMinutes = minutes - this.get('minutesIncDecBy');

      if (minutes > 0) {
        this.set('minutes', (newMinutes >= 0 ? newMinutes : 0));
      }

      this.disableOrEnableDecButton();
    },

    bookRoom(minutes) {
      if (minutes > 0) {
        this.attrs.bookRoom(minutes);
      }
    },

    cancelRoom() {
      this.attrs.cancelRoom();
    }
  }
});
