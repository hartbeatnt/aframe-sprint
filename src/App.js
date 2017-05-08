import React, { Component } from 'react';
import 'aframe';
import './components';
import {
  Player, EnemyDangerous
} from './entities';
import {
   random,
   showScoreUpdate
} from './utils'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targets: [],
      score: 0,
      idx: 0,
    }
  }

  componentDidMount(){
    this.spawnEntity()
    window.addEventListener('destruction', (e)=>{
      let {points, position, idx} = e.detail;
      this.removeEntity(idx);
      this.updateScore(points, position);
    })
    window.addEventListener('fly-away', (e)=>{
      this.removeEntity(e.detail.idx)
    })
  }

  spawnEntity(){
    let position = random('position');
    let flyAway = random('flyAway');
    this.setState(prevState=>{
      return { 
        targets: prevState.targets.concat(
          <EnemyDangerous
            fly-away={flyAway} 
            position={position}
            idx={prevState.idx}
            key={prevState.idx}
          />),
        idx: prevState.idx + 1
      }
    })
    window.setTimeout(this.spawnEntity.bind(this), 2000)
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
    return (
      <div>
        <a-scene ref='scene'>
          <a-camera>
            <a-cursor></a-cursor>
          </a-camera>
          <Player />
          {this.state.targets}   
        </a-scene>
      </div>
    );
  }
}

export default App;
