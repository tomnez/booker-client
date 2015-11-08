export default function() {
  this.transition(
    this.hasClass('resource-details-transition'),
    this.toValue(true),
    this.use('toDown', { duration: 200 }),
    this.reverse('toUp')
  );
}
