/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('idx', {
  schema: { type: 'int'},
  init: function () { 
    this.el.idx = this.data
  }
});