import React from 'react'
import random from './random';
import { Particle } from '../entities'

const createExplosion = (position,idx) => {
  let {x,y,z} = position;
  let particles = [];
  let numParticles = 27;
  for (let i = 0; i < numParticles; i++) {
    let particle = <a-box
      idx={idx+i}
      key={idx+i}
      height="0.25"
      width="0.25"
      depth="0.25"
      fly-away='speed: 10; delay: 0'
      color={random('fireColor')}
      position={`${x} ${y} ${z}`}
    />
    particles.push(particle)
  }
  return {
    particles,
    idx: idx+numParticles,
  }
}

export default createExplosion