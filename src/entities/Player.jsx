import React, { Component } from 'react';
import 'aframe';

const Player = props => (
  <a-sphere 
    {...props} 
    color="blue" 
    opacity="0.5"
    lock-on-source 
  />
)

export default Player