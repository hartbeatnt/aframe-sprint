/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

// for some reason webpack won't compile unless we include this line.
const THREE = window.THREE;

AFRAME.registerComponent('fly-away', {
  schema: { 
    delay: { type: 'int', default: 1000 },
    speed: { type: 'int', default: 20 },
    acceleration: { type: 'number', default: 1.05 }
  },
  
  init: function () { 
    let { x, y, z } = this.data.vector;
    this.vector = new THREE.Vector3(
        -1 + 2*Math.random(),
        -1 + 2*Math.random(), 
        -1 * Math.random()          
    );
    this.vector.normalize();

  },

  tick: function (time, deltaTime) {
    // after the component has existed for the number of
    // milliseconds specified by the 'delay' property,
    // it should fly off along this.vector at the speed
    // specified in the 'speed' property

    // after it has flown offscreen:
    this.el.emit('fly-away', {idx: this.el.idx})

  }
});