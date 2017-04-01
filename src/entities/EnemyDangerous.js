import React, { Component } from 'react';
import 'aframe';



export default props => (
  <a-entity>
    <a-sphere fly-away lock-on-target idx {...props}/>
  </a-entity>
)