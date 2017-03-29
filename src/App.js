import React, { Component } from 'react';
import 'aframe';
import './components';
import {
  Player, EnemyDangerous
} from './entities';

class App extends Component {
  render() {
    return (
      <a-scene>
        <a-camera>
          <a-cursor></a-cursor>
        </a-camera>
        <Player />
        <EnemyDangerous position="-4 3 -7"/>
        <EnemyDangerous position="-2 5 -6"/>
        <EnemyDangerous position="-7 -1 -7"/>
        <EnemyDangerous position="-3 -2 -20"/>
        <EnemyDangerous position="-8 7 -5"/>
        <EnemyDangerous position="-1 4 -8"/>
        <EnemyDangerous position="8 2 -12"/>
        <EnemyDangerous position="3 -2 -4"/>
        <EnemyDangerous position="6 6 -7"/>
        <EnemyDangerous position="1 -1 -12"/>        
      </a-scene>
    );
  }
}

export default App;
