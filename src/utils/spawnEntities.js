import React from 'react';
import random from './random';
import {
  EnemyDangerous,
  EnemyHarmless,
  Friendly
} from '../entities'

const spawnEntities = (idx) => {
  let position = random('position');
  let flyAway = random('flyAway');
  let targets = [];
  let rand = Math.random();
  if (rand < 0.25) {
    targets.push(
      <EnemyDangerous
        fly-away={flyAway} 
        position={position}
        idx={idx}
        key={idx}
      />)
    idx++;
  } else if (rand < 0.75) {
    targets.push(
      <EnemyHarmless
        fly-away={flyAway} 
        position={position}
        idx={idx}
        key={idx}
      />)
    idx++;
  } else {
    targets.push(
      <Friendly
        fly-away={flyAway} 
        position={position}
        idx={idx}
        key={idx}
      />)
    idx++;
  }
  return {
    targets,
    idx,
  }
}  

export default spawnEntities