import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service(),
  torii: service(),
  flashMessages: service(),

  beforeModel() {
    this.transitionTo('login');
  },

  authenticationSucceeded() {
    this.transitionTo('resources');
  },

  invalidationSucceeded() {
    this.transitionTo('login');
  },

  actions: {
    createSession() {
      this.get('session').authenticate('authenticator:torii', 'google-oauth2').then(() => {
        this.authenticationSucceeded();
      }, (error) => {
        this.get('flashMessages').danger(error.jqXHR.responseText);
      });
    },

    invalidateSession() {
      this.get('session').invalidate().then(() => {
        this.invalidationSucceeded();
      });
    }
  }
});
