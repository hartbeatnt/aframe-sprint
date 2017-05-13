/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('idx', {
  schema: { type: 'int'},
  init: function () { 
    // attach an 'idx' property to the element to which this component is attached
  }
});