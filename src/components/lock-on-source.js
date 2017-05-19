/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('lock-on-source', {
  schema: { type: 'int', default: 1 },

  init: function () { 
    this.selectedTargets = [];
    this.maxTargets = 5;
    this.engaged = false;

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)

    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  },

  onKeyDown: function(event) {
    if (event.key === ' ') {
      this.engaged = true;
    }
  },

  onKeyUp: function(event) {
    if (event.key === ' ') {
      this.engaged = false;
      this.destroyTargets();
    }
  },

  rayCheck: function() {
    let cursor = document.querySelector('[raycaster]').components.raycaster
    if (
      cursor.intersectedEls[0] 
      && cursor.intersectedEls[0].lockOnTarget 
      && this.selectedTargets.length < this.maxTargets
    ) {
      this.selectedTargets = this.selectedTargets.concat(cursor.intersectedEls[0])
      cursor.intersectedEls[0].targeted = true;
    }
  },

  destroyTargets() {
    let target, position
    for (let i = this.selectedTargets.length; i > 0; i--) {
      target = this.selectedTargets[i-1];
      position = target.object3D.position;
      target.emit('destruction', {
        position,
        idx: target.idx,
        points: target.points,
      }, true)
    }
    this.selectedTargets = [];
  },

  tick() {
    if (this.engaged) {
      this.rayCheck();
    }
  },

  remove() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('mouseenter',this.onMouseEnter)
  }
});