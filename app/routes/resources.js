import Ember from 'ember';
import ENV from '../config/environment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;
const { Promise } = Ember.RSVP;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model(params) {
    let user = this.store.peekAll('user').get('firstObject');

    if (!user) {
      return this.getUser().then((id) => {
        let user = this.store.peekRecord('user', id);
        return user.get('resources');
      });
    } else {
      return user.get('resources');
    }
  },

  getUser() {
    return new Promise((resolve, reject) => {
      Ember.$.ajax({
        url: `${ENV.apiHost}/me`,
        type: 'GET',
        dataType: 'json',
        headers: {
          'Authorization': `Bearer ${this.get('session').get('data.authenticated.access_token')}`
        }
      }).then((response) => {
        this.get('store').push(response.user);
        resolve(response.user.id);
      }, reject);
    });
  }
});
