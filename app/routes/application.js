import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),
  torii: service(),

  beforeModel() {
    this.transitionTo('login');
  },

  actions: {
    createSession() {
      this.get('session').authenticate('authenticator:torii', 'google-oauth2').then(() => {}, (error) => {
        // TODO: handle error
        console.log(error);
      });
    },

    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
