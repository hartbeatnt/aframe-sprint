import React, { Component } from 'react';
import 'aframe';

class Player extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return <a-sphere position="0 0 -5" color="blue" lock-on-source></a-sphere>
  }
}

export default Player