import React, { Component } from 'react';
import 'aframe';
import './components';
import {
  Player, EnemyDangerous
} from './entities';

class App extends Component {
  constructor(props) {
    super(props);
    this.idx = 0;
    this.state = {
      targets: []
    }
  }

  componentDidMount(){
    this.spawnEntity()
    // don't forget to delete the following:
    window.addEventListener('click',()=>{
      console.log('click listener')
      this.spawnEntity()
    })
    window.addEventListener('destruction', (e)=>{
      this.removeEntity(e.detail.idx)
    })
    window.addEventListener('fly-away', (e)=>{
      console.log('flying away:', e.detail.idx)
      console.log(this.state.targets.filter(el=>el.props.idx===e.detail.idx)[0].props)
      this.removeEntity(e.detail.idx)
    })
  }

  spawnEntity(){
    let position = this.random('position');
    let flyAway = this.random('flyAway');
    console.log('creating element idx',this.idx)
    this.setState({
      targets: this.state.targets.concat(
        <EnemyDangerous
          fly-away={flyAway} 
          position={position}
          idx={this.idx}
        />
      )
    })
    this.idx++
    console.log('idx incremented to', this.idx)
    // window.setTimeout(this.spawnEntity.bind(this), 2000)
  }

  removeEntity(idx){
    console.log('trying to remove idx ',idx,'from', this.state.targets)
    this.setState({ 
      targets: this.state.targets.filter(target=>target.props.idx !== idx)
    })
    console.log('state after removeEntity setState:', this.state.targets)
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
        {this.state.targets}   
      </a-scene>
    );
  }
}

export default App;
