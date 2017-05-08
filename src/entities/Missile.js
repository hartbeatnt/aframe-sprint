import React, { Component } from 'react';
import 'aframe';

export default props => (
  <a-cylinder
    {...props}
    lock-on-target='points:1'
    color='red'
  />
)