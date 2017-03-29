/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

// for some reason webpack won't compile unless we include this line.
const THREE = window.THREE

AFRAME.registerComponent('time-to-live', {
  schema: { type: 'int' },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { 
    this.ttl = this.data;
    
    this.escapeVector = new THREE.Vector3(Math.random(), Math.random(), Math.random());
    this.escapeVector.normalize;
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
  tick: function (t) {
    this.ttl--
    this.ttl < 1 && this.el.object3D.translateOnAxis(this.escapeVector, 1)
    this.ttl < -50 && this.el.sceneEl.removeChild(this.el)
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