import { getRandom, setPosition } from './utils.js';

export default class Chip {
  constructor(container) {
    this.container = container
    this.create()
  }
  
  create() {
    const random = getRandom(1, 5)
    
    const chip = document.createElement('div')
    chip.classList.add('chip')
    
    setPosition(this.container, chip)
    
    chip.style.backgroundColor = `rgb(${ getRandom(0, 255) }, ${ getRandom(0, 255) }, ${ getRandom(0, 255) })`
    chip.innerHTML = random
    chip.setAttribute('data-value', random)
  
    this.container.append(chip)
  }
  
}
