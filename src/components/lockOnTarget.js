/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('lock-on-target', {
  schema: { },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    this.source = document.querySelector('[lock-on-source]')
    this.targeted = false;
    if (!this.source) 
      console.warn("lock-on-target requires an entity with lock-on-source component")
    
    this.el.addEventListener('mouseenter', this.onMouseEnter.bind(this))
  },

  onMouseEnter: function() {
    console.log('over')
    if (this.source.engaged && this.source.selectedTargets.length < this.source.maxTargets) {
      this.source.selectedTargets.push(this.el);
      this.el.targeted = true;
    }
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
  tick: function (t) { 
    if (this.el.targeted) {
      this.el.setAttribute('material', 'color', 'red')
    }
  },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () {
  },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () {
  }
});