import React, { Component } from 'react';
import 'aframe';

export default props => (
  <a-box
    {...props}
    height='0.15'
    width='0.15'
    depth='0.15'
    color='black'
  />
)