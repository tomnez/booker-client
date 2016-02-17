import Ember from 'ember';
import DS from 'ember-data';

// the 'freeBusy' times returned by the API are meant
// to be readonly at the time of rendering the resources
// template. It doesn't make sense to give each block
// an ID and make a hasMany / belongsTo relationship
// between resources and busyBlocks with embedded records,
// so instead we use an array attribute type.

export default DS.Transform.extend({
  deserialize(value) {
    if (Ember.isArray(value)) {
      return Ember.A(value);
    } else {
      return Ember.A();
    }
  },

  serialize(value) {
    if (Ember.isArray(value)) {
      return Ember.A(value);
    } else {
      return Ember.A();
    }
  }
});
