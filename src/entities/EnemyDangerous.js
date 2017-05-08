import React, { Component } from 'react';
import 'aframe';

export default props => (
  <a-sphere lock-on-target='points:1' {...props} />
)