/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

// for some reason webpack won't compile unless we include this line.
const THREE = window.THREE

AFRAME.registerComponent('fly-away', {
  multiple: true,
  schema: { 
    vector: { type: 'vec3'},
    delay: { type: 'int', default: 1000 },
    speed: { type: 'int', default: 20 },
    acceleration: { type: 'number', default: 1.05 }
  },
  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { 
    let { x, y, z } = this.data.vector;
    this.vector = x || y || z
      ? new THREE.Vector3(x,y,z)
      : new THREE.Vector3(
          -1 + 2*Math.random(),
          -1 + 2*Math.random(), 
          -1 * Math.random()          
      );
    this.vector.normalize();

    this.delay = this.data.delay;
    this.speed = this.data.speed;
    this.acceleration = this.data.acceleration;
    this.createdAt;
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
  remove: function () {
   },

  /**
   * Called on each scene tick.
   */
  tick: function (time, deltaTime) {
    if (!this.createdAt) this.createdAt = time;
    let lifeTime = time - this.createdAt;
    if (lifeTime > this.delay) this.flyAway(deltaTime);
    if (lifeTime > this.delay + 1500 && !this.flown){
      this.flown = true;
      this.el.emit('fly-away', {idx: this.el.idx})
      // this.el.parentEl.removeChild(this.el);
    }
  },

  flyAway: function(deltaTime) {
    let distance = this.speed * deltaTime / 1000;
    this.speed *= this.acceleration;
    this.el.object3D.translateOnAxis(this.vector, distance);
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
  play: function () { }
});