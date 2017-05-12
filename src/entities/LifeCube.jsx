import React, { Component } from 'react';
import 'aframe';

export default props => (
  <a-box
    {...props}
    height='0.25'
    width='0.25'
    depth='0.25'
    color='black'
  />
)