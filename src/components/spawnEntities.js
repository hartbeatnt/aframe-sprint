/* global AFRAME */
import React from 'react'
import {
  EnemyDangerous
} from '../entities';

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('spawn-entities', {
  schema: {
    entities: { type: 'array' },
    interval: { type: 'int', default: 1000 }
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () { 
    this.spawnedEntities = 0;
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  tick: function (time) {
    if (time > this.data.interval * (this.spawnedEntities + 1)) {
      this.spawnedEntities++
    }
  },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { }
});