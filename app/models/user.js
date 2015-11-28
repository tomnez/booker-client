import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr('string'),
  avatar: DS.attr('string'),
  resources: DS.hasMany('resource', { async: true })
});
