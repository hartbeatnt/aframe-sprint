const random = param => {
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

