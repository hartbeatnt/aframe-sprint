import React, { Component } from 'react';
import 'aframe';
import './components';
import { 
  Player,
  Missile,
  LifeCube
} from './entities';
import {
   showScoreUpdate,
   spawnEntities,
   createExplosion,
} from './utils';

const STARTING_LIVES = 3;

class App extends Component {
  constructor(props) {
    super(props);
    let startingLives = [];
    for (let i = 0; i < STARTING_LIVES; i++) {
      startingLives.push(i)
    }

    this.initialState = {
      score: 0,
      idx: 0,
      targets: [],
      lives: startingLives,
    };
    this.state = this.initialState;
  }

  componentDidMount(){
    window.addEventListener('destruction', e => {
      console.log('destruction', e.detail)
    })
    window.addEventListener('fly-away', e => {
      console.log('fly-away', e.detail)
    })
    window.addEventListener('missile-launch', e => {
      console.log('missile-launch', e.detail)
    })
    window.addEventListener('missile-hit', e => {
      console.log('missile-hit', e.detail)
    })
    this.spawnEntities();
  }

  spawnEntities() {
    let newEntities = spawnEntities(this.state.idx);
    // implement me
  }

  addTargets(newTargets) {
    this.setState(prevState => {
      return {
        targets: prevState.targets.concat(newTargets),
        idx: prevState.idx + (newTargets.length || 1),
      }
    })
  }

  removeTarget(idx) {
    this.setState(prevState => {
      return {
        targets: prevState.targets.filter(target=>target.props.idx !== idx)
      }
    })
  }


  render() {
    return (
      <a-scene ref='scene'>
        <a-assets></a-assets>
        <a-camera>
          <a-cursor/>
        </a-camera>
        <Player position="0 0 -5" id="player">
          {this.state.lives}
        </Player>
        {this.state.targets}   
      </a-scene>
    );
  }
}

export default App;
