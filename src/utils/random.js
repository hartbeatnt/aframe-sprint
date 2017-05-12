const random = param => {
  if (param === 'position') {
    let x = 30 * Math.random() - 15;
    let y = 20 * Math.random() - 10;
    let z = 15 * Math.random() - 35;
    if (x > -10 && x < 10 && y > -10 && y < 10) {
      x += 5 * Math.round(2*Math.random()-1) + 5
      y += 5 * Math.round(2*Math.random()-1) + 5
    }
    return `${x} ${y} ${z}`
  }
  if (param === 'flyAway') {
    let delay = 1500 * Math.random() + 500;
    let speed = 10 * Math.random() + 5;
    return `delay: ${delay}; speed: ${speed}`
  }
  if (param === 'fireColor') {
    let colors = [
      'red', 
      'yellow', 
      'orange'
    ]
    return colors[Math.floor(Math.random()*3)]
  }
}

export default random