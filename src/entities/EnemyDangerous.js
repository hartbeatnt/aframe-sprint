import React, { Component } from 'react';
import 'aframe';

class EnemyDangerous extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return <a-sphere position={this.props.position} fly-away lock-on-target></a-sphere>
  }
}

export default EnemyDangerous