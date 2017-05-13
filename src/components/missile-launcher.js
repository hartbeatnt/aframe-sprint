/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('missile-launcher', {
  schema: { type: 'int', default: 1 },

  init: function () {
    this.rateOfFire = 1500;
  },

  tick: function (time, deltaTime) {
    // should emit a "missile-launch" event
    // every this.rateOfFire miliseconds
  }
});