/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('missile-launcher', {
  schema: { type: 'int', default: 1 },

  init: function () {
    this.rateOfFire = 1500;
    this.timestamp = performance.now();
  },

  tick: function (time) { 
    if (time - this.timestamp > this.rateOfFire) {
      let {x,y,z} = this.el.object3D.position
      this.timestamp = time;
      this.el.emit('missile-launch', {
        position: `${x} ${y} ${z}`
      })
    }
  },

  pause: function () {
    this.timestamp = performance.now()
  },
  
  play: function () {
    this.timestamp = performance.now()
  },
});