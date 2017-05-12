import React, { Component } from 'react';
import 'aframe';
import './components';
import { 
  Player,
  Missile,
} from './entities'
import {
   showScoreUpdate,
   spawnEntities,
   createExplosion,
} from './utils'

class App extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      targets: [],
      lives: 1,
      score: 0,
      idx: 0,
    }
    this.state = this.initialState
  }

  componentDidMount(){
    window.addEventListener('destruction', e => {
      let {points, position, idx} = e.detail;
      this.removeEntity(idx);
      this.updateScore(points, position);
    })
    window.addEventListener('fly-away', e => {
      this.removeEntity(e.detail.idx)
    })
    window.addEventListener('missile-launch', e => {
      this.launchMissile(e.detail.position)
    })
    window.addEventListener('missile-hit', e => {
      this.missileHit(e.detail.idx, e.detail.position)
    })
    this.spawnEntities()
  }

  spawnEntities(){
    let newEntities = spawnEntities(this.state.idx)
    this.setState(prevState=>{
      return { 
        targets: prevState.targets.concat(newEntities.targets),
        idx: newEntities.idx
      }
    })
    window.setTimeout(this.spawnEntities.bind(this), 2000)
  }

  launchMissile(position) {
    const missile = <Missile 
      position={position}
      key={this.state.idx} 
      idx={this.state.idx}
    />
    this.setState(prevState => {
      return {
        targets: prevState.targets.concat(missile),
        idx: prevState.idx + 1,
      }
    })
  }

  missileHit(idx, position) {
    this.removeEntity(idx);
    let explosion = createExplosion(position, this.state.idx);
    this.setState(prevState=>{
      return {
        targets: prevState.targets.concat(explosion.particles),
        idx: explosion.idx
      }
    })
    setTimeout(()=>{
      this.setState(prevState => {
        return {lives: prevState.lives - 1};
      })
    }, 750)
  }

  removeEntity(idx) {
    this.setState(prevState => {
      return {
        targets: prevState.targets.filter(target=>target.props.idx !== idx)
      }
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

  render() {
    return this.state.lives > 0 ? (
      <div>
        <a-scene ref='scene'>
          <a-assets></a-assets>
          <a-camera>
            <a-cursor></a-cursor>
          </a-camera>
          <Player position="0 0 -5"/>
          {this.state.targets}   
        </a-scene>
      </div>
    ) : (
      <div id="gameOver">
        <h3>Game Over!</h3>
        <p>Score: {this.state.score}</p>
        <button onClick={()=>this.setState(this.initialState)}>
          Play again!
        </button>
      </div>
    );
  }
}

export default App;
