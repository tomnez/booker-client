import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let user = this.store.peekAll('user').get('firstObject');
    // LEFT OFF HERE: if no user, make a user route to get the /me profile and THEN get resources.
    // move /me request into own method to be shared by /token and /user.
    return user.get('resources');
  }
});
