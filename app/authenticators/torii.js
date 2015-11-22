import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from '../config/environment';

const { RSVP } = Ember;
const { service } = Ember.inject;

export default Torii.extend({
  torii: service(),

  serverTokenEndpoint: `${ENV.apiHost}token`,

  authenticate() {
    return new RSVP.Promise((resolve, reject) => {
      this._super(...arguments).then((data) => {
        Ember.$.ajax({
          type: 'POST',
          url: this.get('serverTokenEndpoint'),
          data: { token: data.authorizationCode },
        }).then((response) => {
          resolve(response);
        }).fail((error) => {
          console.log(error.message);
        });
      }, reject);
    });
  }
});
