import React, { Component } from 'react';
import 'aframe';
import './components';
import {
  Player, EnemyDangerous
} from './entities';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targets: {},
      idx: 0
    }
  }

  componentDidMount(){
    this.spawnEntity()
    // don't forget to delete the following:
    window.addEventListener('click',()=>{
      console.log(this.state.targets)
      this.spawnEntity()
    })
    window.addEventListener('destruction', (e)=>{
      this.removeEntity(e.detail.idx)
    })
    window.addEventListener('flyAway', (e)=>{
      console.log('flying away:', e.detail.idx)
      this.removeEntity(e.detail.idx)
    })
  }

  spawnEntity(){
    let position = this.random('position');
    let flyAway = this.random('flyAway');
    let temp = {...this.state.targets}
    temp[this.state.idx] = (
      <EnemyDangerous
        fly-away={flyAway} 
        position={position}
        idx={this.state.idx}
      />
    )
    this.setState({ targets: temp, idx: this.state.idx+1})
    // window.setTimeout(this.spawnEntity.bind(this), 2000)
  }

  removeEntity(idx){
    console.log('trying to remove idx ',idx, this.state.targets[idx])
    let targets = {...this.state.targets}
    delete targets[idx]
    this.setState({ targets }, ()=>{console.log('state:',this.state)})
  }

  random(param) {
    if (param === 'position') {
      let x = 30 * Math.random() - 15;
      let y = 20 * Math.random() - 10;
      let z = 15 * Math.random() - 20;
      return `${x} ${y} ${z}`
    }
    if (param === 'flyAway') {
      let delay = 1500 * Math.random() + 500;
      let speed = 10 * Math.random() + 5;
      return `delay: ${delay}; speed: ${speed}`
    }
  }

  render() {
    return (
      <a-scene>
        <a-camera>
          <a-cursor></a-cursor>
        </a-camera>
        <Player />
        {Object.values(this.state.targets)}   
      </a-scene>
    );
  }
}

export default App;
