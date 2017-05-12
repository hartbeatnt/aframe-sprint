import React, { Component } from 'react';
import 'aframe';

export default props => (
  <a-sphere
    {...props}
    className='target'
    lock-on-target='points:1'
    color='black'
    scale="0.5 0.5 0.5"
    missile
  />
)