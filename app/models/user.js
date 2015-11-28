import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  resources: DS.hasMany('resource', { async: true })
});
