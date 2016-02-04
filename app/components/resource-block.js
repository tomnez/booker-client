import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['resource-block-item'],
  classNameBindings: ['isBooked:is-booked'],

  showDetails: false,
  panel: 'info', // "info" or "counter"

  didInsertElement() {
    let swipeNode = this.$().get(0);
    let hammertime = new Hammer(swipeNode);

    hammertime.on('panend panleft panright', (e) => {
      this.resourceSwiping(e);
    });

    this.setFreeBusyMessage();
  },

  isBooked: Ember.computed('model.busyNow', function() {
    return this.get('model.busyNow');
  }),

  setFreeBusyMessage () {
    var isBookedNow = this.get('isBooked');
    var schedule = this.get('model.schedule');
    var untilTime;
    var difference;
    var time;
    var message;

    if (isBookedNow) {

      time = moment(schedule[0].end);
      untilTime = time.format('h:mma');
      message = `Booked until ${untilTime}`;

    } else if (!isBookedNow && schedule.length) {

      time = moment(schedule[0].start);
      untilTime = time.format('h:mma');
      message = `Free until ${untilTime}`;

    } else {
      message = `Free all day`;
    }

    difference = time ? time.from(moment()) : null;

    this.set('timeNote', difference);
    this.set('freeBusyMessage', message);
  },

  resourceSwiping(e) {
    let dx = e.deltaX;
    let swipeNode = this.$();
    let roomWidth = swipeNode.width();
    let panel = this.get('panel');
    let percentOriginal = panel === 'info' ? '-50' : '0';
    let percent;

    switch (e.type) {
      case 'panleft':
        if (panel === 'info') {
          return;
        }

        percent = (100 / roomWidth) * dx;
        this.translateNode(swipeNode, percent);
        break;
      case 'panright':
        if (panel === 'counter') {
          return;
        }

        percent = (-50 + ((100 / roomWidth) * dx));
        this.translateNode(swipeNode, percent);
        break;
      default: // on 'panend'
        percent = (100 / roomWidth) * dx;

        // if swiped more than halfway in either direction
        if (Math.abs(dx) > (roomWidth / 4)) {
          if (dx > 0) {
            // left to right, show counter
            this.translateNode(swipeNode);
            this.set('panel', 'counter');
          } else {
            // right to left, show room
            this.translateNode(swipeNode, -50);
            this.set('panel', 'info');
          }
        } else {
          // otherwise, back to original position
          this.translateNode(swipeNode, percentOriginal);
        }
    }
  },

  translateNode(swipeNode, n = 0) {
    swipeNode.css('transform', `translateX(${Math.floor(n)}%)`);
  },

  actions: {
    toggleDetails() {
      this.toggleProperty('showDetails');
    },

    bookRoom() {
      // send request to book room
    },

    cancelRoom() {
      // send request to cancel room
    }
  }
});
