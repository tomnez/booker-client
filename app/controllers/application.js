import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),
  torii: service(),

  promptConsentScreen: Ember.on('init', function() {
    if (!this.get('session.isAuthenticated')) {
      this.send('createSession');
    }
  }),

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
        }, (error) => {
          console.error(error);
        });
      }, (error) => {
        console.error(error);
      });
    },

    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
