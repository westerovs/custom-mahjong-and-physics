// danger! Очень грязный код !

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const render = (container, template, place = 'beforeend') => {
  if (container instanceof Element) {
    container.insertAdjacentHTML(place, template)
  }
}

const game = document.querySelector('.wrapper')

const createChip = () => {
  const random = getRandom(1, 5)
  
  const chip = document.createElement('div')
  chip.classList.add('chip')
  chip.style.top = `${ getRandom(50, 350) }px`
  chip.style.left = `${ getRandom(-50, 350) }px`
  chip.style.backgroundColor = `rgb(${ getRandom(0, 255) }, ${ getRandom(0, 255) }, ${ getRandom(0, 255) })`
  chip.innerHTML = random
  chip.setAttribute('data-value', random)
  game.append(chip)
}

for (let i = 0; i < 6; i++) {
  createChip()
}

let tempChips = new Set()
const matchBlocks = (event) => {
  if (!event.target.dataset.value) return
  
  // получить 1ю фишку
  tempChips.add(event.target)
  
  const box1 = [...tempChips][0]
  box1.classList.add('active')
  
  if (event.target === [...tempChips][0]) return
  
  if (box1.dataset.value === event.target.dataset.value) {
    const box2 = event.target;
    [...tempChips][0].remove();
    [...tempChips][1].remove()
    tempChips.clear()
    fallingDown()
    return
  }
  
  if ([...tempChips][0].dataset.value !== event.target.dataset.value) {
    [...tempChips][0].classList.add('error');
    [...tempChips][1].classList.add('error');
    
    setTimeout(() => {
      [...tempChips][0].classList.remove('error', 'active');
      [...tempChips][1].classList.remove('error', 'active');
      tempChips.clear()
      return
    }, 500)
  }
  
}

game.addEventListener('click', matchBlocks)

// ------------------------
const cat = document.querySelector('.cat')


let y = 0
let posBox = 0
let boxY = 0

function fallingDown(currentY = 0) {
  boxY = 0
  const boxes = document.querySelectorAll('.chip')
  const xxx = setInterval(() => {
    cat.style.transform = `translateY(${ currentY + y }px)`
    y++
  
    for (let i = 0; i < boxes.length; i++) {
      if (
        cat.getBoundingClientRect().top < boxes[i].getBoundingClientRect().bottom &&
        cat.getBoundingClientRect().right > boxes[i].getBoundingClientRect().left &&
        cat.getBoundingClientRect().bottom > boxes[i].getBoundingClientRect().top &&
        cat.getBoundingClientRect().left < boxes[i].getBoundingClientRect().right
      ) {
        y = boxes[i].getBoundingClientRect().top - 50
        clearInterval(xxx)
        break
      }
      
      if (cat.getBoundingClientRect().bottom >= game.getBoundingClientRect().bottom) {
        console.log(111111111)
        y = boxes[i].getBoundingClientRect().bottom
        posBox = boxes[i].getBoundingClientRect().bottom
        cat.classList.add('win')
        boxes[i].classList.add('hide')
        document.querySelector('h1').classList.remove('visually-hidden')
        clearInterval(xxx)
        break
      }
    }
  }, 10)
}

fallingDown()

const btn = document.querySelector('.shuffle')

btn.addEventListener('click', () => {
  
  const boxes = document.querySelectorAll('.chip')
  boxes.forEach(box => {
    box.style.top = `${ getRandom(50, 350) + boxY}px`
    box.style.left = `${ getRandom(-50, 350)}px`
  })
  
  setInterval(() => {
    fallingDown(posBox)
  }, 100)
})