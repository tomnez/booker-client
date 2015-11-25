import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from '../config/environment';
import raw from 'ic-ajax';

const { RSVP } = Ember;
const { service } = Ember.inject;

export default Torii.extend({
  torii: service('torii'),

  serverTokenEndpoint: `${ENV.apiHost}token`,

  authenticate() {
    return new RSVP.Promise((resolve, reject) => {
      this._super(...arguments).then((data) => {
        raw({
          url: this.get('serverTokenEndpoint'),
          type: 'POST',
          dataType: 'json',
          data: { 'token': data.authorizationCode }
        }).then((response) => {
          resolve({
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            access_token: response.access_token,
            // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
            provider: data.provider
          });
        }, reject);
      }, reject);
    });
  }
});
