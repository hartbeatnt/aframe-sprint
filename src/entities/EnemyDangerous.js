import React, { Component } from 'react';
import 'aframe';



export default props => (
  <a-entity>
    <a-sphere {...props}/>
  </a-entity>
)