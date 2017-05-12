/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('missile', {
  schema: { },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    this.target = document.querySelector('[lock-on-source]');

    this.speed = 5;
    this.maxSpeed = 20;
    this.acceleration = 1.05;
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  tick: function (time, deltaTime) {
    let target = this.target.object3D.position.clone();
    if (this.el.object3D.position.distanceTo(target) > 1.5){
      let distance = this.speed * deltaTime / 1000;
      if (this.speed < this.maxSpeed) this.speed *= this.acceleration;
      let vector = target.sub(this.el.object3D.position).normalize();
      this.el.object3D.translateOnAxis(vector, distance);
    } else {
      this.el.emit('missile-hit',{
        idx:this.el.idx,
        position: this.el.object3D.position,
      })
    }

  },


  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },
  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },
});