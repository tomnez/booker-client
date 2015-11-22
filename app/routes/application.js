import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),

  actions: {
    createSession() {
      let session = this.get('session');
      let providerName = 'google-oauth2';

      this.get('torii').open(providerName).then((googleAuth) => {

        let googleToken = googleAuth.authorizationCode;

        session.authenticate('authenticator:torii', providerName, {
          password: googleToken
        }).then(() => {
          console.log('good!');
        }, (error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      });
    },

    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
