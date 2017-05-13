const showScoreUpdate = (points, position) => {
  const scale = 100 / Math.abs(position.z)    
  const message = document.createElement('a-text')
  if (points >= 0) points = `+`+points;
  message.setAttribute(`value`,`${points}`)
  message.setAttribute(`position`,position)
  message.setAttribute(`color`,`black`)
  message.setAttribute(`scale`, `${scale} ${scale} ${scale}`)
  document.querySelector('a-scene').appendChild(message)
  setTimeout(()=>{
    document.querySelector('a-scene').removeChild(message)
  }, 500)
}

export default showScoreUpdate;