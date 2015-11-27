import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),
  torii: service(),

  actions: {
    createSession() {
      let session = this.get('session');
      let providerName = 'google-oauth2';

      this.get('torii').open(providerName).then((googleAuth) => {

        let googleToken = googleAuth.authorizationCode;

        session.authenticate('authenticator:torii', providerName, {
          password: googleToken
        }).then(() => {
          console.log('token stored in session.data.authenticated');
          this.replaceWith('resources');
        }, (error) => {
          console.error(error);
        });
      }, (error) => {
        console.error(error);
      });
    },

    invalidateSession() {
      this.get('session').invalidate();
    },
  }
});
