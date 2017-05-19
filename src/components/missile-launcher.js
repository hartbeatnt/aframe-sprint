/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('missile-launcher', {
  schema: { type: 'int', default: 1 },

  init: function () {
    this.rateOfFire = 1500;
    this.createdAt = performance.now();
  },

  tick: function (time) {
    if (time - this.createdAt > this.rateOfFire) {
      let {x,y,z} = this.el.object3D.position
      this.createdAt = time;
      this.el.emit('missile-launch', {
        position: `${x} ${y} ${z}`
      })
    }
  },

  pause: function() {
    this.pauseTime = performance.now();
  },

  play: function() {
    this.createdAt += (performance.now() - this.pauseTime || 0)
  }
});