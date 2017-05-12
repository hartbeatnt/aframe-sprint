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
      startingLives.push(<LifeCube 
        key={i}
        position={`${0.5 * i - 0.5} -1 0`}
      />)
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
      let {points, position, idx} = e.detail;
      this.removeTarget(idx);
      this.createExplosion(position);
      this.updateScore(points, position);
    })
    window.addEventListener('fly-away', e => {
      this.removeTarget(e.detail.idx);
    })
    window.addEventListener('missile-launch', e => {
      this.missileLaunch(e.detail.position);
    })
    window.addEventListener('missile-hit', e => {
      this.missileHit(e.detail.idx, e.detail.position);
    })
    this.spawnEntities();
  }

  spawnEntities() {
    let newEntities = spawnEntities(this.state.idx);
    this.addTargets(newEntities);
    if (this.state.lives.length > 0) {
      window.setTimeout(this.spawnEntities.bind(this), 500);
    }
  }

  addTargets(newTargets) {
    this.setState(prevState => {
      return {
        targets: prevState.targets.concat(newTargets),
        idx: prevState.idx + (newTargets.length || 1),
      }
    })
  }

  missileLaunch(position) {
    const missile = <Missile 
      position={position}
      key={this.state.idx} 
      idx={this.state.idx}
    />
    this.addTargets(missile);
  }

  missileHit(idx, position) {
    this.removeTarget(idx);
    this.createExplosion(position);
    this.state.lives.length > 1 
      ? this.loseLife()
      : setTimeout(()=>this.loseLife(), 300)
  }

  removeTarget(idx) {
    this.setState(prevState => {
      return {
        targets: prevState.targets.filter(target=>target.props.idx !== idx)
      }
    })
  }

  createExplosion(position) {
    let explosion = createExplosion(position, this.state.idx);
    this.addTargets(explosion)
  }

  loseLife() {
    this.setState(prevState => {
      return {lives: prevState.lives.slice(0,-1)};
    })
  }

  updateScore(points, position) {
    showScoreUpdate(points, position);
    this.setState(prevState => {
      return {
        score: prevState.score + points
      }
    })
  }

  reset() {
    this.setState(this.initialState,()=>{
      this.spawnEntities()
    });
  }

  render() {
    return this.state.lives.length > 0 ? (
      <div>
        <a-scene ref='scene'>
          <a-assets></a-assets>
          <a-camera>
            <a-cursor fuse="true" fuseTImeout="0"/>
          </a-camera>
          <Player position="0 0 -5" id="player">
            {this.state.lives}
          </Player>
          {this.state.targets}   
        </a-scene>
      </div>
    ) : (
      <div id="gameOver">
        <h3>Game Over!</h3>
        <p>Score: {this.state.score}</p>
        <button onClick={()=>this.reset()}>
          Play again!
        </button>
      </div>
    );
  }
}

export default App;
