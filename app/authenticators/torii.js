import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import ENV from '../config/environment';
import raw from 'ic-ajax';

const { RSVP } = Ember;
const { service } = Ember.inject;

export default Torii.extend({
  torii: service('torii'),
  session: service(),

  serverTokenEndpoint: `${ENV.apiHost}token`,
  serverRevokeTokenEndpoint: `${ENV.apiHost}revoke`,

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
  },

  invalidate() {
    let tokenToClear = this.get('session.data.authenticated.access_token');

    return new RSVP.Promise((resolve, reject) => {
      this._super(...arguments).then(() => {
        raw({
          url: this.get('serverRevokeTokenEndpoint'),
          type: 'POST',
          dataType: 'json',
          data: { 'token': tokenToClear }
        }).then(() => {
          resolve();
        }, reject);
      }, reject);
    });
  },

  restore(data) {
    let resolveData = data || {};
    // https://github.com/simplabs/ember-simple-auth/issues/345#issuecomment-69460044
    this._provider = resolveData.provider;
    return new RSVP.Promise(function(resolve) {
      resolve(resolveData);
    });
  }
});
