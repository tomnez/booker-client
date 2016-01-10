import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  access: DS.attr('string'),
  belongsTo: DS.hasMany('user')
});
