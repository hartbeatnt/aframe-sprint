import React, { Component } from 'react';
import 'aframe';

export default props => (
  <a-sphere
    {...props}
    lock-on-target='points:2'
    color='orange'
    missile-launcher
  />
)