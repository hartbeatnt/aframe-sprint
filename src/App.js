import React, { Component } from 'react';
import 'aframe';
import {
  Player
} from './entities';
import {
  
} from './components';

class App extends Component {
  render() {
    return (
      <a-scene>
        <a-camera>
          <a-cursor></a-cursor>
        </a-camera>
        <Player />
      </a-scene>
    );
  }
}

export default App;
