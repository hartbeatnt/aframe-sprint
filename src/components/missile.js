/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

const THREE = window.THREE

AFRAME.registerComponent('missile', {
  schema: { type: 'int', default: 1 },

  init: function () {
    this.target = document.querySelector('#player');

    this.speed = 5;
    this.maxSpeed = 20;
    this.acceleration = 1.05;
  },

  tick: function (time, deltaTime) {
    let target = this.target.object3D.position.clone();
    if (this.el.object3D.position.distanceTo(target) > 1.5){
      let distance = this.speed * deltaTime / 1000;
      if (this.speed < this.maxSpeed) this.speed *= this.acceleration;
      let vector = target.sub(this.el.object3D.position).normalize();
      this.el.object3D.translateOnAxis(vector, distance);
      let scale = this.el.object3D.scale.clone();
      scale.addScalar(Math.sin(Math.floor(time/75))/100)
      this.el.setAttribute("scale", `${scale.x} ${scale.y} ${scale.z}`)
    } else {
      this.el.emit('missile-hit',{
        idx:this.el.idx,
        position: this.el.object3D.position,
      })
    }

  },

});