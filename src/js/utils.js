const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const render = (container, template, place = 'beforeend') => {
  if (container instanceof Element) {
    container.insertAdjacentHTML(place, template)
  }
}

const setPosition = (container, box) => {
  const containerBounding = container.getBoundingClientRect()
  
  // const chipBounding      = chip.getBoundingClientRect()
  const chipWidth = 100
  const chipHeight = 50
  
  const maxPositionX = containerBounding.right - chipWidth - containerBounding.left
  const maxPositionY = containerBounding.bottom - chipHeight - containerBounding.top
  
  box.style.left = `${ getRandom(0, maxPositionX) }px`
  box.style.top  = `${ getRandom(0, maxPositionY) }px`
}

export {
  getRandom,
  render,
  setPosition,
}
