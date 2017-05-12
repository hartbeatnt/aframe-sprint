/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('lock-on-source', {
  schema: { type: 'int', default: 1 },

  init: function () { 
    this.el.selectedTargets = [];
    this.el.maxTargets = 5;
    this.el.engaged = false;

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)

    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    window.addEventListener('mouseenter',this.onMouseEnter)
  },

  onKeyDown: function(event) {
    if (event.key === 'Shift') {
      this.el.setAttribute('visible', 'false')
    } else if (event.key === ' ') {
      this.el.engaged = true;
      this.rayCheck();
    }
  },

  onKeyUp: function(event) {
    event.preventDefault()
    if (event.key === 'Shift') {
      this.el.setAttribute('visible', 'true')
    } else if (event.key === ' ') {
      this.el.engaged = false;
      this.destroyTargets();
    }
  },

  onMouseEnter: function(event) {
    if (this.el.engaged 
      && this.el.selectedTargets.length < this.el.maxTargets
      && event.target.lockOnSource
      && !event.target.targeted
    ) {
      this.el.selectedTargets = this.el.selectedTargets.concat(event.target);
      event.target.targeted = true;
    }
  },

  rayCheck: function() {
    let intersect = document.querySelector('a-cursor').components.cursor.intersectedEl
    if (intersect && intersect.lockOnTarget) {
      this.el.selectedTargets = this.el.selectedTargets.concat(intersect)
      intersect.targeted = true;
    }
  },

  destroyTargets() {
    let target, position
    for (let i = this.el.selectedTargets.length; i > 0; i--) {
      target = this.el.selectedTargets[i-1];
      position = target.object3D.position;
      target.emit('destruction', {
        position,
        idx: target.idx,
        points: target.points,
      }, true)
    }
    this.el.selectedTargets = [];
  },

  remove() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('mouseenter',this.onMouseEnter)
  }
});