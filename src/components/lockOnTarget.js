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
   // fill me in
  },

  tick: function (t) { 
    if (this.el.targeted) {
      // create some sort of visual indication 
      // that the entity has been targeted
    }
  }
});