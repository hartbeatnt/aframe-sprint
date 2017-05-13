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
      this.rayCheck();
      // implement me 
    }
  },

  onKeyUp: function(event) {
    event.preventDefault()
    if (event.key === 'Shift') {
      this.el.setAttribute('visible', 'true')
    } else if (event.key === ' ') {
      // implement me -- should destroy any
      // selected targets when space bar is
      // released
    }
  },

  onMouseEnter: function(event) {
    console.log(event.target)
    if (this.el.engaged 
    ) {
      // implement me -- should add any targetable entities
      // to this.targets 
    }
  },

  rayCheck: function() {
    let intersect = document.querySelector('a-cursor').components.cursor.intersectedEl
    if (intersect && intersect.lockOnTarget) {
      this.el.selectedTargets = this.el.selectedTargets.concat(intersect)
      intersect.targeted = true;
    }
  },

  remove() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
    window.removeEventListener('mouseenter',this.onMouseEnter)
  }
});