import React, { Component } from 'react';
import 'aframe';
import './components';
import { Player } from './entities'
import {
   showScoreUpdate,
   spawnEntities,
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
    window.addEventListener('destruction', (e)=>{
      let {points, position, idx} = e.detail;
      this.removeEntity(idx);
      this.updateScore(points, position);
    })
    window.addEventListener('fly-away', (e)=>{
      this.removeEntity(e.detail.idx)
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
          <Player position="0 0 -5"/>
          {this.state.targets}   
        </a-scene>
      </div>
    );
  }
}

export default App;
