import React from 'react';
import 'aframe';

export default props => (
  <a-entity 
    position="0 0 -1"
    geometry="primitive: ring; radiusInner: 0.015; radiusOuter: 0.02"
    material="color: black; shader: flat"
    raycaster="objects:[lock-on-target]"
  />
)