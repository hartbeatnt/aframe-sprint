import React, { Component } from 'react';
import 'aframe';

export default props => (
  <a-collada-model
    {...props}
    scale="0.05 0.05 0.05"
    src='#heart'
  />
)