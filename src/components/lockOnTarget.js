/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('lock-on-target', {
  schema: {
    points: {type: 'int', default: 1}
  },

  init: function () {
    if (!document.querySelector('[lock-on-source]')) 
      console.warn("lock-on-target requires an entity with lock-on-source component")
    this.el.points = this.data.points;
    this.el.lockOnTarget = true;
    this.el.targeted = false;
  },

  tick: function (t) { 
    if (this.el.targeted) {
      this.el.setAttribute('material', 'color', 'red')
    }
  }
});