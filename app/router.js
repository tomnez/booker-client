import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('resources');
  this.route('protected');
  this.route('login');
});

export default Router;
