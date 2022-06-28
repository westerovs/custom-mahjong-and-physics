import { getRandom, render, setPosition } from './utils.js';
import Chip from './Chip.js';

class Game {
  constructor() {
    this.wrapper = document.querySelector('.wrapper')
    this.btn     = this.wrapper.querySelector('.shuffle')
    this.tempChips = new Set()
  
    this.isActiveFlag = false
    this.MAX_CHIPS = 6
  }
  
  start() {
    this.createChips()
    this.initEvents()
  }
  
  createChips = () => {
    for (let i = 0; i < this.MAX_CHIPS; i++) {
      new Chip(this.wrapper)
    }
  }
  
  initEvents = () => {
    this.wrapper.addEventListener('click', this.touchStart)
    this.btn.addEventListener('click', this.shuffle)
  }
  
  touchStart = (event) => {
    this.matchBlocks(event)
  }
  
  matchBlocks = (event) => {
    const target = event.target
    if (!target.dataset.value) return
  
    this.isActiveFlag = !this.isActiveFlag
    
    // добавляем в массив текущий элемент
    this.tempChips.add(target)
    
    const box1 = [...this.tempChips][0]
    box1.style.zIndex = '1'
    box1.classList.add('active')
  
    if (!this.isActiveFlag && target === box1) {
      box1.classList.remove('active')
      this.tempChips.clear()
      return;
    }
    
    if (target === [...this.tempChips][0]) return
    
    // если найдены 2 одинаковых
    if (box1.dataset.value === target.dataset.value) {
      [...this.tempChips][0].remove();
      [...this.tempChips][1].remove()
      this.tempChips.clear()
      return
    }
    
    // если они не равны
    if ([...this.tempChips][0].dataset.value !== target.dataset.value) {
      console.log(111);
    
      [...this.tempChips][0].classList.add('error');
      [...this.tempChips][1].classList.add('error');
      
      setTimeout(() => {
        box1.style.zIndex = '0';
        [...this.tempChips].forEach(it => it.classList.remove('error', 'active'));
        this.tempChips.clear()
      }, 500)
    }
  }
  
  shuffle = () => {
    const chips = document.querySelectorAll('.chip')

    chips.forEach(box => setPosition(this.wrapper, box))
  }
}



new Game().start()
