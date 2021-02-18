const track = document.querySelector('.blog-slider__track')
let initialPosition = null
let moving = false
let transform = 0

const gestureStart = (e) => {
  initialPosition = e.pageX
  moving = true
  const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform')
  if(transformMatrix !== 'none'){
    transform = parseInt(transformMatrix.split(',')[4].trim())
  }
}

const gestureMove = (e) => {
  if(moving){
    const currentPosition = e.pageX
    const diff = currentPosition - initialPosition
    track.style.transform = `translateX(${transform + diff}px)`
    console.log(track.style.transform)
    // console.log("transform", diff)
    // console.log("Current", currentPosition)
    if(transform + diff < -660){
      track.style.transform = `translateX(${-659}px)`
    }else if(transform + diff > 130){
      track.style.transform = `translateX(${129}px)`
    }
  }
}

const gestureEnd = (e) => {
  moving = false
}

function getWindowWidth() {
  return window.innerWidth || document.body.clientWidth;
}

if (getWindowWidth() <= 1024) {
  if(window.PointerEvent){
    window.addEventListener('pointerdown', gestureStart)
    
    window.addEventListener('pointermove', gestureMove)
    
    window.addEventListener('pointerup', gestureEnd)
  }else{
    window.addEventListener('touchdown', gestureStart)
  
    window.addEventListener('touchmove', gestureMove)
    
    window.addEventListener('touchup', gestureEnd)
  }
}else{
  track.style.transform = `translateX(${0}px)`
  if(window.PointerEvent){
    window.removeEventListener('pointerdown', gestureStart)
    
    window.removeEventListener('pointermove', gestureMove)
    
    window.removeEventListener('pointerup', gestureEnd)
  }else{
    window.removeEventListener('touchdown', gestureStart)
  
    window.removeEventListener('touchmove', gestureMove)
    
    window.removeEventListener('touchup', gestureEnd)
  }
}



// function getWindowWidth() {
//   return window.innerWidth || document.body.clientWidth;
// }

